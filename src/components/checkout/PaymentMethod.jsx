import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const { paymentMethod } = useSelector((state) => state.payment);

  const { cart, cartId } = useSelector((state) => state.carts);

  const { errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    if (!paymentMethod) {
      dispatch(addPaymentMethod("MOCK"));
    }
  }, [dispatch, paymentMethod]);

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cart, cartId, errorMessage]);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>

      <FormControl>
        <RadioGroup
          aria-label="payment method"
          name="paymentMethod"
          value={paymentMethod || "MOCK"}
          onChange={(event) => paymentMethodHandler(event.target.value)}
        >
          <FormControlLabel
            value="MOCK"
            control={<Radio color="primary" />}
            label="Mock Payment"
            className="text-gray-700"
          />
        </RadioGroup>

        <p className="mt-3 text-sm text-slate-500">
          Test payment provider — no real payment will be processed.
        </p>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
