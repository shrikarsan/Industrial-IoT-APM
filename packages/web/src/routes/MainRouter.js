import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useLogin } from "context/Login";

import Sample from "views/Sample";
import Login from "views/Login";
import Dashboard from "views/Dashboard";
import Machines from "views/Machines";
import AddMachine from "views/AddMachine";
import Users from "views/Users";
import AddUser from "views/AddUser";
import Sensors from "views/Sensors";
import AddSensor from "views/AddSensor";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin();
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Sample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/machines" element={<Machines />} />
        <Route path="/machines/add" element={<AddMachine />} />
        <Route path="/machine/:id" element={<Machines />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/:id" element={<Users />} />

        <Route path="/sensors" element={<Sensors />} />
        <Route path="/sensors/add" element={<AddSensor />} />
        <Route path="/sensor/:id" element={<Sensors />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
