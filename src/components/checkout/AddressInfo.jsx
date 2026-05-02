import { Skeleton } from '@mui/material';
import SK from '../shared/Skeleton';
import { FaAddressBook } from "react-icons/fa";
import React, { useState } from 'react'


const AddressInfo = () => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const noAddressExist = true; // if address exists
  const isLoading = false; // if loading or not 
  return (
    <div className='pt-4'>
      {noAddressExist ? (
        <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
          <FaAddressBook size={50} className='text-gray-400 mb-4'/>
          <h1 className='mb-2 text-gray-500 text-center'>
            No Address Added
          </h1>
          <p className='mb-6 text-slate-800 text-center font-bold text-2xl'>
            Please Add Your Address to Complete Purchase
          </p>
          <button 
            onClick={addNewAddressHandler}
            className='px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-all'>
            Add Address 
          </button>
        </div>
      ) : (
        <div className='relative p-6 rounded-lg max-w-md mx-auto'>
          <h1 className='text-slate-800 text-center font-bold text-2xl'>
            Select Address
          </h1>
          {isLoading ? (
            <div>
              <SK />
            </div>
          ) : (
            <div className='space-y-4 pt-6'>
              <p>Address List</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddressInfo