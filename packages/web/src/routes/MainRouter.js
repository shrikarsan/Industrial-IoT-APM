import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sample from "views/Sample";
import Login from "views/Login";
import Dashboard from "views/Dashboard";
import Machines from "views/Machines";
import AddMachine from "views/AddMachine";

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
      </Routes>
    </Router>
  );
};

export default MainRouter;
