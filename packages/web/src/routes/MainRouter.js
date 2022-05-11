import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sample from "../views/Sample";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Sample />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
