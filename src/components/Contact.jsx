import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
    style={{backgroundImage:"url('https://placehold.co/600x400')"}}>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6">
          Contact Us 
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Please fill out the form below!
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input 
              type="text"
              required
              placeholder="John Doe"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input 
              type="text"
              required
              placeholder="johndoe@email.com"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea 
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
          </div>
          <button className="w-full bg-amber-300 text-white py-2 rounded-lg hover:bg-amber-500 transition duration-300">
            Submit 
          </button>
        </form>
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="flex flex-col items-center space-y-2 mt-4">
            <div className="flex items-center">
              <FaPhone className="text-amber-500 mr-2" />
              <span className="text-gray-800">+1 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-amber-500 mr-2" />
              <span className="text-gray-800">kbooks@info.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkedAlt className="text-amber-500 mr-2" />
              <span className="text-gray-800">Bedford Falls, NY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;