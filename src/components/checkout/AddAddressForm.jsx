import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateUserAddress } from "../../store/actions";
import InputField from "../shared/InputField";
import Spinner from "../shared/Spinner";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdateUserAddress(
        data,
        toast,
        address?.addressId,
        setOpenAddressModal,
      ),
    );
  };
  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("postalCode", address?.postalCode);
      setValue("country", address?.country);
    }
  }, [address]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          {!address?.addressId ? "Add Address" : "Update Address"}
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Address Line 1"
            required
            id="street"
            type="text"
            message="Address Line 1 is required"
            placeholder="Street Address"
            register={register}
            errors={errors}
            className="focus:ring-2 focus:ring-amber-500"
          />

          <InputField
            label="Address Line 2"
            id="buildingName"
            type="text"
            placeholder="Apt, suite, unit, etc."
            register={register}
            errors={errors}
            className="focus:ring-2 focus:ring-amber-500"
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="City is required"
            placeholder="City"
            register={register}
            errors={errors}
            className="focus:ring-2 focus:ring-amber-500"
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="State is required"
            placeholder="State"
            register={register}
            errors={errors}
            className="focus:ring-2 focus:ring-amber-500"
          />

          <InputField
            label="Postal Code"
            required
            id="postalCode"
            type="text"
            message="Postal Code is required"
            placeholder="Postal Code"
            register={register}
            errors={errors}
          />
          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="Country is required"
            placeholder="Country"
            register={register}
            errors={errors}
            className="focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          disabled={btnLoader}
          className="bg-amber-300 flex gap-2 items-cnter justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-2"
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
