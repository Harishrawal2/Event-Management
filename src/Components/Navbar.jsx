import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-20 p-4 py-5">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          Event Management
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Event Listing
          </Link>
          <Link to="/create-event" className="text-blue-500 hover:underline">
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
