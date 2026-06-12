import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import SK from "../shared/Skeleton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const continuePayment = (order) => {
    navigate("/checkout", {
      state: {
        resumeOrder: order,
      },
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/order/users/orders");

        setOrders(data || []);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.message || "Unable to load orders",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="lg:w-[80%] mx-auto py-10">
        <SK />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {errorMessage && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {!errorMessage && orders.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-slate-600">
          You do not have any orders yet.
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="rounded-lg border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl font-semibold">
                  Order #{order.orderId}
                </h2>

                <p className="text-sm text-slate-500">
                  Date: {order.orderDate || "Not available"}
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {order.orderStatus}
              </span>
            </div>

            <div className="mt-4 grid gap-2 text-slate-700">
              <p>
                <strong>Total:</strong> ${order.totalAmount}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.payment?.pgStatus || "Not available"}
              </p>

              <p>
                <strong>Items:</strong> {order.orderItems?.length || 0}
              </p>
            </div>

            {order.orderStatus === "PENDING_PAYMENT" && (
              <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                <p>
                  This order is pending payment. The book is reserved until the
                  payment window expires.
                </p>

                <button
                  type="button"
                  onClick={() => continuePayment(order)}
                  className="mt-3 px-4 py-2 rounded-md bg-custom-blue text-white font-semibold"
                >
                  Continue Payment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
