import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sample from "views/Sample";
import Login from "views/Login";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Sample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Sample />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
