import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
            <BiUser className="text-4xl text-amber-700" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {user?.username || "User"}
            </h2>

            <p className="text-slate-500">
              {user?.email || "Signed in account"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/profile/orders"
            className="rounded-lg border p-5 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-2xl text-amber-600" />

              <div>
                <h3 className="font-semibold text-lg">Orders</h3>
                <p className="text-sm text-slate-500">
                  View your order history and pending payments.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/cart"
            className="rounded-lg border p-5 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-2xl text-amber-600" />

              <div>
                <h3 className="font-semibold text-lg">Cart</h3>
                <p className="text-sm text-slate-500">
                  Return to your shopping cart.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
