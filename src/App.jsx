import { Routes, Route, Navigate } from "react-router";
import { useRef } from "react";
import { useAuth } from "./components/Auth";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Sidebars from "./components/Sidebar";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import MyDirectTeam from "./pages/MyDirectTeam";
import MyLevelTeam from "./pages/MyLevelTeam";
import DirectIncome from "./pages/DirectIncome";
import LevelIncome from "./pages/LevelIncome";
import AutoPoolIncome from "./pages/AutoPoolIncome";
import NonWorkingInocme from "./pages/NonWorkingInocme";
import WorkingIncome from "./pages/WorkingIncome";
import FlushOutIncome from "./pages/FlushOutIncome";
import FlushoutTransfer from "./pages/FlushoutTransfer";
import FlushoutTransferHistory from "./pages/FlushoutTransferHistory";
import TopUp from "./pages/TopUp";
import TopUpHistory from "./pages/TopUpHistory";
import AddFunds from "./pages/AddFunds";
import FundHistory from "./pages/FundHistory";
import Withdraw from "./pages/Withdraw";
import WithdrawHistory from "./pages/WithdrawHistory";
import Support from "./pages/Support";
import AllSupport from "./pages/AllSupport";

import Login from "./pages/Login";

function App() {
  const referralLinkRef = useRef(null);

  const copyToClipboard = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select();
      document.execCommand("copy");
    }
  };
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-slate-600">
      <Sidebars />

      <div className="flex-grow">
        <div className="text-center flex justify-center items-center  text-black  text-xl p-2 rounded-t-lg">
          <label className="pr-5 text-white font-semibold">
            Referral Link:
          </label>
          <input
            type="text"
            value="https://metabitclub.com/register?refid=586939"
            className="input input-bordered w-full md:max-w-xl max-w-sm rounded-l-lg p-4 "
            disabled
            ref={referralLinkRef}
          />
          <button
            className=" p-4 bg-gradient-to-r from-yellow-600 to-pink-600 rounded-r-lg text-white transform hover:translate-y-[-5px] hover:text-black hover:shadow-lg hover:shadow-pink-900"
            onClick={copyToClipboard}
          >
            <span className="flex"> Copy </span>
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <DashBoard /> : <Navigate to="/login" />}
          />
          {/* protected routes */}
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/changepassword"
            element={user ? <ChangePassword /> : <Navigate to="/login" />}
          />
          <Route
            path="/mydirectteam"
            element={user ? <MyDirectTeam /> : <Navigate to="/login" />}
          />
          <Route
            path="/mylevelteam"
            element={user ? <MyLevelTeam /> : <Navigate to="/login" />}
          />
          <Route
            path="/directincome"
            element={user ? <DirectIncome /> : <Navigate to="/login" />}
          />
          <Route
            path="/levelincome"
            element={user ? <LevelIncome /> : <Navigate to="/login" />}
          />
          <Route
            path="/autopoolincome"
            element={user ? <AutoPoolIncome /> : <Navigate to="/login" />}
          />
          <Route
            path="/nonworkingincome"
            element={user ? <NonWorkingInocme /> : <Navigate to="/login" />}
          />
          <Route
            path="/workingincome"
            element={user ? <WorkingIncome /> : <Navigate to="/login" />}
          />
          <Route
            path="/flushoutincome"
            element={user ? <FlushOutIncome /> : <Navigate to="/login" />}
          />
          <Route
            path="/flushouttransfer"
            element={user ? <FlushoutTransfer /> : <Navigate to="/login" />}
          />
          <Route
            path="/flushouttransferhistory"
            element={
              user ? <FlushoutTransferHistory /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/topup"
            element={user ? <TopUp /> : <Navigate to="/login" />}
          />
          <Route
            path="/topuphistory"
            element={user ? <TopUpHistory /> : <Navigate to="/login" />}
          />
          <Route
            path="/addfunds"
            element={user ? <AddFunds /> : <Navigate to="/login" />}
          />
          <Route
            path="/fundhistory"
            element={user ? <FundHistory /> : <Navigate to="/login" />}
          />
          <Route
            path="/withdraw"
            element={user ? <Withdraw /> : <Navigate to="/login" />}
          />
          <Route
            path="/withdrawhistory"
            element={user ? <WithdrawHistory /> : <Navigate to="/login" />}
          />
          <Route
            path="/support"
            element={user ? <Support /> : <Navigate to="/login" />}
          />
          <Route
            path="/allsupport"
            element={user ? <AllSupport /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={
              <h1 className="text-8xl text-center text-white font-bold">
                Page not found
              </h1>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
