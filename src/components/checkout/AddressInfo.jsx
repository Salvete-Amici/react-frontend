import { useState } from "react";
import toast from "react-hot-toast";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddress } from "../../store/actions";
import SK from "../shared/Skeleton";
import AddAddressForm from "./AddAddressForm";
import AddressInfoModal from "./AddressInfoModal";
import AddressList from "./AddressList";
import { DeleteModal } from "./DeleteModal";

const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const dispatch = useDispatch();

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal),
    );
  };

  const noAddressExist = !address || address.length === 0; // if address exists
  const { isLoading, btnLoader } = useSelector((state) => state.errors); // if loading or not
  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-400 mb-4" />

          <h1 className="mb-2 text-gray-500 text-center">No Address Added</h1>

          <p className="mb-6 text-slate-800 text-center font-bold text-2xl">
            Please Add Your Address to Complete Purchase
          </p>

          <button
            onClick={addNewAddressHandler}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-all"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>

          {isLoading ? (
            <div className="py-4 px-8">
              <SK />
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={address}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>

              {address.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={addNewAddressHandler}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-sm hover:bg-blue-700 transition-all"
                  >
                    Add More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
