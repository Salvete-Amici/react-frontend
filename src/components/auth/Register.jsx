import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/inputField';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinner from '../shared/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}, 
  } = useForm({
    mode: "onTouched"
  })

  const registerHandler = async (data) => {
    console.log("Register Click");
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-2xl shadow-amber-300 py-8 sm:px-8 px-4 rounded-md">
          <div className="flex flex-col items-center justify-center space-y-4">
            <FaUserPlus className="text-amber-500 text-5xl"/>
            <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
              Register Here 
            </h1>
          </div>
          <hr className="mt-2 mb-5 text-black" />
          <div className="flex flex-col gap-3">
            <InputField 
              label="Username"
              required
              id="username"
              type="text"
              message="Username is required"
              placeholder="Enter username here"
              register={register}
              errors={errors}
              className="focus:ring-2 focus:ring-amber-500"
            />

            <InputField 
              label="Email"
              required
              id="email"
              type="text"
              message="Email is required"
              placeholder="Enter your email here"
              register={register}
              errors={errors}
              className="focus:ring-2 focus:ring-amber-500"
            />

            <InputField 
              label="Password"
              required
              id="password"
              min={16}
              type="text"
              message="Password is required"
              placeholder="Enter password here"
              register={register}
              errors={errors}
              className="focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            disabled={loader}
            className="bg-amber-300 flex gap-2 items-cnter justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-2"
            type="submit">
              {loader ? (
                <>
                <Spinner /> Loading...
                </>
              ) : (
                <>Register</> 
              )}
          </button>
          <p className="text-center text-sm text-slate-700 mt-6">
            Already have an account? 
          <Link
            className="font-semibold underline hover:text-black"
            to="/login">
              <span>Login</span>
          </Link>
          </p>
      </form>
    </div>
  )
}

export default Register