import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  approveMockPayment,
  cancelPendingPaymentOrder,
  declineMockPayment,
} from "../../store/actions";

const Payment = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePaymentAction = async (action, successMessage) => {
    if (!order?.orderId) {
      toast.error("No pending order found.");
      navigate("/products");
      return;
    }

    try {
      setProcessing(true);
      await dispatch(action(order.orderId));
      toast.success(successMessage);
      navigate("/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment action failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border rounded-xl shadow-sm mt-10">
      <h1 className="text-4xl font-bold mb-8">Test Payment</h1>

      <div className="space-y-4 text-2xl text-slate-700">
        <p>
          <strong>Order:</strong> #{order?.orderId}
        </p>

        <p>
          <strong>Status:</strong> {order?.orderStatus || "PENDING_PAYMENT"}
        </p>

        <p>
          <strong>Amount:</strong> ${order?.totalAmount}
        </p>
      </div>

      <div className="mt-8 p-5 rounded-lg bg-amber-50 text-amber-800 text-xl">
        This book is reserved for this order for up to 15 minutes.
      </div>

      <p className="mt-8 text-xl text-slate-500">
        Test payment provider — no real payment will be processed.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          disabled={processing}
          onClick={() =>
            handlePaymentAction(approveMockPayment, "Payment approved")
          }
          className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold disabled:opacity-50"
        >
          Approve Test Payment
        </button>

        <button
          type="button"
          disabled={processing}
          onClick={() =>
            handlePaymentAction(declineMockPayment, "Payment declined")
          }
          className="px-6 py-3 rounded-md bg-red-600 text-white font-semibold disabled:opacity-50"
        >
          Decline Test Payment
        </button>

        <button
          type="button"
          disabled={processing}
          onClick={() =>
            handlePaymentAction(
              cancelPendingPaymentOrder,
              "Reservation released",
            )
          }
          className="px-6 py-3 rounded-md border border-slate-400 text-slate-700 font-semibold disabled:opacity-50"
        >
          Cancel / Release Reservation
        </button>
      </div>
    </div>
  );
};

export default Payment;
