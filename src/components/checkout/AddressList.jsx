import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";

const AddressList = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenDeleteModal(true);
  };

  const handleAddressSelection = (addresses) => {
    dispatch(selectUserCheckoutAddress(addresses));
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.addressId}
          onClick={() => handleAddressSelection(address)}
          className={`p-4 border rounded-md cursor-pointer relative ${
            selectedUserCheckoutAddress?.addressId === address.addressId
              ? "bg-blue-50 border-custom-blue"
              : "bg-white"
          }`}
        >
          <div className="flex items-start">
            <div className="space-y-1">
              <div className="flex items-center ">
                <FaBuilding size={14} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.buildingName}</p>
                {selectedUserCheckoutAddress?.addressId ===
                  address.addressId && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>

              <div className="flex items-center ">
                <FaStreetView size={17} className="mr-2 text-gray-600" />
                <p>{address.street}</p>
              </div>

              <div className="flex items-center ">
                <MdLocationCity size={17} className="mr-2 text-gray-600" />
                <p>
                  {address.city}, {address.state}
                </p>
              </div>

              <div className="flex items-center ">
                <MdPinDrop size={17} className="mr-2 text-gray-600" />
                <p>{address.postalCode}</p>
              </div>

              <div className="flex items-center ">
                <MdPublic size={17} className="mr-2 text-gray-600" />
                <p>{address.country}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 absolute top-4 right-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditButtonHandler(address);
              }}
              className="p-2 rounded-full text-slate-500 hover:text-custom-blue hover:bg-blue-50 transition-colors"
              aria-label="Edit address"
            >
              <FaEdit size={16} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteButtonHandler(address);
              }}
              className="p-2 rounded-full text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              aria-label="Delete address"
            >
              <FaTrash size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
