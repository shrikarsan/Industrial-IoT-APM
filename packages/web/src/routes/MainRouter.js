import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useLogin } from "context/Login";

// import Sample from "views/Sample";

import Dashboard from "views/Dashboard";

import Login from "views/Auth/Login";
import ForgotPassword from "views/Auth/ForgotPassword";
import ResetPassword from "views/Auth/ResetPassword";

import Users from "views/User/Users";
import AddUser from "views/User/AddUser";
import UpdateUser from "views/User/UpdateUser";
import User from "views/User/User";

import Machines from "views/Machine/Machines";
import AddMachine from "views/Machine/AddMachine";
import UpdateMachine from "views/Machine/UpdateMachine";
import Machine from "views/Machine/Machine";

import Sensors from "views/Sensor/Sensors";
import AddSensor from "views/Sensor/AddSensor";
import UpdateSensor from "views/Sensor/UpdateSensor";
import Sensor from "views/Sensor/Sensor";

import Alerts from "views/Alerts";
import SensorReadings from "views/SensorReadings";

// export const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn } = useLogin();
//   if (!isLoggedIn) {
//     // user is not authenticated
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  } else if (currentUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const MainRouter = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <AdminRoute>
              <AddUser />
            </AdminRoute>
          }
        />
        <Route
          path="/user/update/:userId"
          element={
            <AdminRoute>
              <UpdateUser />
            </AdminRoute>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <AdminRoute>
              <User />
            </AdminRoute>
          }
        />

        <Route path="/machines" element={<Machines />} />
        <Route path="/machines/add" element={<AddMachine />} />
        <Route path="/machine/update/:machineId" element={<UpdateMachine />} />
        <Route path="/machine/:machineId" element={<Machine />} />

        <Route path="/sensors" element={<Sensors />} />
        <Route path="/sensors/add" element={<AddSensor />} />
        <Route path="/sensor/update/:sensorId" element={<UpdateSensor />} />
        <Route path="/sensor/:sensorId" element={<Sensor />} />

        <Route path="/readings" element={<SensorReadings />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;

// const LoggedInRouter = () => {
//   return (
//     <>
//       <Route exact path="/" element={<Dashboard />} />
//       <Route path="/dashboard" element={<Dashboard />} />

//       <Route path="/users" element={<Users />} />
//       <Route path="/users/add" element={<AddUser />} />
//       <Route path="/user/update/:userId" element={<UpdateUser />} />
//       <Route path="/user/:userId" element={<User />} />

//       <Route path="/machines" element={<Machines />} />
//       <Route path="/machines/add" element={<AddMachine />} />
//       <Route path="/machine/update/:machineId" element={<UpdateMachine />} />
//       <Route path="/machine/:machineId" element={<Machine />} />

//       <Route path="/sensors" element={<Sensors />} />
//       <Route path="/sensors/add" element={<AddSensor />} />
//       <Route path="/sensor/update/:sensorId" element={<UpdateSensor />} />
//       <Route path="/sensor/:sensorId" element={<Sensor />} />

//       <Route path="/readings" element={<SensorReadings />} />
//       <Route path="/alerts" element={<Alerts />} />
//     </>
//   );
// };

// const NotLoggedInRouter = () => {
//   return (
//     <>
//       <Route exact path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgot" element={<ForgotPassword />} />
//       <Route path="/reset" element={<ResetPassword />} />
//     </>
//   );
// };

// const MainRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         {currentUser !== undefined ? <NotLoggedInRouter /> : <LoggedInRouter />}
//       </Routes>
//     </Router>
//   );
// };
