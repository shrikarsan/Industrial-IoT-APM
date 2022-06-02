import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useLogin } from "context/Login";

import Sample from "views/Sample";
import Login from "views/Login";
import Dashboard from "views/Dashboard";
import Machines from "views/Machines";
import AddMachine from "views/AddMachine";
import Users from "views/Users";
import AddUser from "views/AddUser";

const LoggedInRouter = () => {
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
      </Routes>
    </Router>
  );
};

const NotLoggedInRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

const MainRouter = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <LoggedInRouter /> : <NotLoggedInRouter />;
};

export default MainRouter;
