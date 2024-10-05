import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventListingPage from "./pages/EventListingPage";
import CreateEventPage from "./pages/CreateEventPage";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Navbar />
        {/* Page Content */}
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<EventListingPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
