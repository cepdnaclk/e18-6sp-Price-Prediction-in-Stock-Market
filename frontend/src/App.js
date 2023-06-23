import React, { Component } from "react";
import LineChart from "./views/Line Chart";
import AllStock from "./views/All Stock";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LineChart />} />;
          <Route path="/view" element={<LineChart />} />;
          <Route path="/all" element={<AllStock />} />;
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
