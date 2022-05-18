import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sample from "views/Sample";
import Login from "views/Login";
import Dashboard from "views/Dashboard";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Sample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
