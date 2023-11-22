import React from "react";

const TopUp = () => {
  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl  p-4 md:p-6 lg:p-8">
        <div className="bg-gradient-to-r from-yellow-600  to-pink-600 rounded-t-lg p-8">
          <h2 className=" text-center text-white text-2xl font-bold mb-2">
            Top-Up{" "}
          </h2>
        </div>
        <div className="bg-gradient-to-r from-blue-900 via-black to-purple-900 p-6 rounded-b-lg shadow-md">
          <div className="mb-4">
            <label
              htmlFor="totalfund"
              className="block text-sm text-white mb-2"
            >
              Total Fund
            </label>
            <input
              type="text"
              id="totalfund"
              name="totalfund"
              className="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm text-white mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full p-2 border text-black rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-yellow-600  to-pink-600 w-full text-white py-2 px-4 rounded-lg transition duration-300 hover:shadow-lg transform hover:translate-y-[-5px] hover:shadow-pink-900 focus:outline-none" 
          >
            Top-Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
