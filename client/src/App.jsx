import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestList from "./components/RequestList.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import History from "./components/RequestHistory.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<RequestList />} />
        <Route path='/about' element={<About />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
