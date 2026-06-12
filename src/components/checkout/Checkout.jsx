import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserAddresses, placePendingOrder } from "../../store/actions";
import ErrorPage from "../shared/ErrorPage";
import SK from "../shared/Skeleton";
import AddressInfo from "./AddressInfo";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";
import PaymentMethod from "./PaymentMethod";

const createCheckoutKey = (userId, cart) => {
  const cartHash = (cart || [])
    .map((item) => `${item.productId}-${item.quantity}`)
    .join("|");

  const encodedCartHash = btoa(cartHash || "empty-cart");
  const timestamp = Date.now();

  return `checkout-${userId}-${encodedCartHash}-${timestamp}`;
};

const isActivePendingOrder = (order) => {
  return order?.orderId && order?.orderStatus === "PENDING_PAYMENT";
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [checkoutOrder, setCheckoutOrder] = useState(null);

  const idempotencyKeyRef = useRef(null);

  const dispatch = /** @type {any} */ (useDispatch());
  const location = useLocation();

  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);

  const { user, address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );

  const { paymentMethod } = useSelector((state) => state.payment);

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  const activePaymentOrder = isActivePendingOrder(checkoutOrder)
    ? checkoutOrder
    : null;

  const getIdempotencyKey = () => {
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = createCheckoutKey(user?.id || "guest", cart);
    }

    return idempotencyKeyRef.current;
  };

  const handleBack = () => {
    if (activeStep === 3) {
      return;
    }

    setActiveStep((previousStep) => Math.max(previousStep - 1, 0));
  };

  const handleNext = async () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select your address first.");
      return;
    }

    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select a payment method first.");
      return;
    }

    if (activeStep === 2) {
      if (!selectedUserCheckoutAddress?.addressId) {
        toast.error("Please select your address first.");
        return;
      }

      if (!paymentMethod) {
        toast.error("Please select a payment method first.");
        return;
      }

      if (!cart || cart.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }

      try {
        setIsCreatingOrder(true);

        const createdOrder = await dispatch(
          placePendingOrder({
            addressId: selectedUserCheckoutAddress.addressId,
            paymentMethod,
            idempotencyKey: getIdempotencyKey(),
          }),
        );

        setCheckoutOrder(createdOrder);

        toast.success(
          "The book has been reserved. Complete the test payment within 15 minutes.",
        );

        setActiveStep(3);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Unable to create the pending order.",
        );
      } finally {
        setIsCreatingOrder(false);
      }

      return;
    }

    setActiveStep((previousStep) => previousStep + 1);
  };

  const backDisabled = activeStep === 0 || activeStep === 3;

  const continueDisabled =
    Boolean(errorMessage) ||
    isCreatingOrder ||
    (activeStep === 0 && !selectedUserCheckoutAddress) ||
    (activeStep === 1 && !paymentMethod) ||
    (activeStep === 2 && (!cart || cart.length === 0));

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    const resumeOrder = location.state?.resumeOrder;

    if (isActivePendingOrder(resumeOrder)) {
      setCheckoutOrder(resumeOrder);
      setActiveStep(3);
    }
  }, [location.state]);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading && !isCreatingOrder ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <SK />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}

          {activeStep === 1 && <PaymentMethod />}

          {activeStep === 2 && (
            <OrderSummary
              totalPrice={totalPrice}
              cart={cart}
              address={selectedUserCheckoutAddress}
              paymentMethod={paymentMethod}
            />
          )}

          {activeStep === 3 && activePaymentOrder && (
            <Payment order={activePaymentOrder} />
          )}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
        style={{
          boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)",
        }}
      >
        <button
          type="button"
          disabled={backDisabled}
          onClick={handleBack}
          className={`h-10 px-6 rounded-md border font-semibold transition-colors ${
            backDisabled
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-custom-blue text-custom-blue hover:bg-blue-50"
          }`}
        >
          Back
        </button>

        {activeStep !== steps.length - 1 && (
          <button
            type="button"
            disabled={continueDisabled}
            className={`h-10 px-6 rounded-md bg-custom-blue font-semibold text-white transition-colors ${
              continueDisabled
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={handleNext}
          >
            {activeStep === 2
              ? isCreatingOrder
                ? "Creating Order..."
                : "Place Order"
              : "Continue"}
          </button>
        )}
      </div>

      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
