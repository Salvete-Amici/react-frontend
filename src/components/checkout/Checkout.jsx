import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import ErrorPage from "../shared/ErrorPage";
import SK from "../shared/Skeleton";
import AddressInfo from "./AddressInfo";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { cart, totalPrice } = useSelector((state) => state.carts);

  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );

  const { paymentMethod } = useSelector((state) => state.payment);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select your address first.");
      return;
    }

    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select your payment address first.");
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
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
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <button
          type="button"
          disabled={activeStep === 0}
          onClick={handleBack}
          className={`h-10 px-6 rounded-md border font-semibold transition-colors ${
            activeStep === 0
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-custom-blue text-custom-blue hover:bg-blue-50"
          }`}
        >
          Back
        </button>

        {activeStep !== steps.length - 1 && (
          <button
            type="button"
            disabled={
              Boolean(errorMessage) ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                  ? !paymentMethod
                  : false)
            }
            className={`h-10 px-6 rounded-md bg-custom-blue font-semibold text-white transition-colors ${
              Boolean(errorMessage) ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={handleNext}
          >
            Continue
          </button>
        )}
      </div>

      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
