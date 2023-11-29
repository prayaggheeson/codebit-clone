import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import { useWallet } from "../components/WalletContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [error, setError] = useState("");
  const [refid, setRefid] = useState("");

  const { walletAddress: contextWalletAddress, updateWalletAddress } =
    useWallet();

  useEffect(() => {
    // Redirect to dashboard if the user is already logged in
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request accounts from the user
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const userAddress = accounts[0];
        updateWalletAddress(userAddress);

        // Get the current chain ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        // Compare the chain ID with the expected chain ID for Ethereum mainnet (0x1)
        if (chainId !== "0x1") {
          setError("Please switch to the Ethereum Mainnet to login.");
        } else {
          setError("");
          // Perform login logic
          const loginResponse = await fetch(
            `https://forline.live/api/login.php?address=${userAddress}`
          );
          const responseData = await loginResponse.json();

          // Check if login was successful
          if (
            Array.isArray(responseData) &&
            responseData.includes("Message:Successfully Login") &&
            responseData.includes("Status:200")
          ) {
            // Display alert with the message from the backend
            alert(responseData[0]);
            // Proceed with further actions after successful login
            await login(userAddress);
            alert("User login successful!");
            await navigate("/dashboard");
          } else {
            // Display alert with the message from the backend for login failure
            alert(responseData[0]);
          }
        }
      } else {
        setError("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleRegister = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request accounts from the user
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const userAddress = accounts[0];
        updateWalletAddress(userAddress);

        // Get the current chain ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        // Compare the chain ID with the expected chain ID for Ethereum mainnet (0x1)
        if (chainId !== "0x1") {
          setError("Please switch to the Ethereum Mainnet to register.");
        } else {
          setError("");
          // Perform registration logic
          const registerResponse = await fetch(
            `https://forline.live/api/register.php?address=${userAddress}&refid=${refid}`
          );
          const responseData = await registerResponse.json();

          // Check if registration was successful
          if (
            Array.isArray(responseData) &&
            responseData.includes("Message:This Address Is Already Register") &&
            responseData.includes("Status:400")
          ) {
            // Display alert with the message from the backend
            alert(responseData[0]);
          } else {
            // Registration successful, proceed with login logic
            await login(userAddress);
            alert("User registered and logged in!");
            await navigate("/dashboard");
          }
        }
      } else {
        setError("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  
  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-6 lg:p-8">
        <div className="bg-gradient-to-r from-yellow-600 to-pink-600 rounded-t-lg p-8">
          <h2 className="text-center text-white text-2xl font-bold mb-2">
            User
          </h2>
        </div>
        <div className="bg-gradient-to-r from-blue-900 via-black to-purple-900 p-6 rounded-b-lg shadow-md">
          <div className="mb-4">
            <label
              htmlFor="walletAddress"
              className="block text-xl font-semibold text-center text-white mb-2"
            >
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              placeholder=""
              value={contextWalletAddress}
              disabled
              className="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-gradient-to-r from-yellow-600 to-pink-600 w-full text-white py-2 px-4 rounded-lg transition duration-300 hover:shadow-lg transform hover:translate-y-[-5px] hover:shadow-pink-900 focus:outline-none"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="bg-gradient-to-r from-yellow-600 to-pink-600 w-full text-white py-2 px-4 rounded-lg transition duration-300 hover:shadow-lg transform hover:translate-y-[-5px] hover:shadow-pink-900 focus:outline-none"
            >
              Register
            </button>
          </div>

          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
