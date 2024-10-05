import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaUserShield,
  FaUsers,
  FaEye,
  FaPalette,
  FaFont,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventCreator = () => {
  const [isMultiSession, setIsMultiSession] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    start: "",
    end: "",
    location: "",
    tickets: false,
    capacity: "",
    visibility: "Public",
    color: "#ffffff",
    typeface: "Default",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate if all required fields are filled
    if (
      !eventData.name ||
      !eventData.start ||
      !eventData.end ||
      !eventData.location
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Add the new event to the list
    existingEvents.push(eventData);

    // Save updated events back to localStorage
    localStorage.setItem("events", JSON.stringify(existingEvents));

    // Log to console for demonstration purposes
    // console.log("Event Created:", eventData);
    toast.success("Event added successfully!");
    setEventData({
      name: "",
      start: "",
      end: "",
      location: "",
      tickets: false,
      capacity: "",
      visibility: "Public",
      color: "#3533cd",
      typeface: "Default",
    }); // Clear form after submission
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <header className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt />
          Create under Personal Calendar
        </header>
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="flex-1 pr-6 space-y-4">
            {/* Event Name Input */}
            <div>
              <label className="block font-medium mb-1" htmlFor="event-name">
                Event Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Event Name"
                value={eventData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Start and End Date-Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium mb-1 flex items-center gap-1">
                  <FaCalendarAlt /> Start
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={eventData.start}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="font-medium mb-1 flex items-center gap-1">
                  <FaCalendarAlt /> End
                </label>
                <input
                  type="datetime-local"
                  value={eventData.end}
                  name="end"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Timezone Text */}
            <div className="text-sm text-gray-500">GMT+05:30 Calcutta</div>

            {/* Multi-Session Checkbox */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="multi-session"
                checked={isMultiSession}
                onChange={() => setIsMultiSession(!isMultiSession)}
                className="mr-2"
              />
              <label htmlFor="multi-session" className="font-medium">
                Create Multi-Session Event
              </label>
            </div>

            {/* Add Event Location */}
            <div>
              <label className="font-medium mb-1 flex items-center gap-1">
                <FaMapMarkerAlt /> Add Event Location
              </label>
              <input
                type="text"
                placeholder="Offline location or virtual link"
                value={eventData.location}
                name="location"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Event Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="tickets"
                  name="tickets"
                  checked={eventData.tickets}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label
                  htmlFor="tickets"
                  className="font-medium flex items-center gap-1"
                >
                  <FaTicketAlt /> Tickets (Free)
                </label>
              </div>

              {/* Require Approval Switch */}
              <div className="flex items-center">
                <label
                  htmlFor="require-approval"
                  className="font-medium flex items-center gap-1"
                >
                  <FaUserShield /> Require Approval
                </label>
                <div className="ml-auto relative">
                  <input
                    type="checkbox"
                    id="require-approval"
                    checked={requireApproval}
                    onChange={() => setRequireApproval(!requireApproval)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                      requireApproval ? "bg-blue-600" : ""
                    }`}
                    onClick={() => setRequireApproval(!requireApproval)}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                        requireApproval ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-medium mb-1 flex items-center gap-1">
                  <FaUsers /> Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Unlimited"
                  value={eventData.capacity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <label className="font-medium mb-1 flex items-center gap-1">
                  <FaEye /> Visibility
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={eventData.visibility}
                  name="visibility"
                  onChange={handleChange}
                >
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              {/* Create Event Button */}
              <div className="mt-6">
                <button
                  className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 flex items-center justify-center gap-2"
                  onClick={handleSubmit}
                >
                  <FaCalendarAlt /> Create Event
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 pl-6">
            {/* Event Image */}
            <div className="mb-4">
              <div className="h-64 w-full bg-gradient-to-r from-yellow-400 via-orange-300 to-red-300 rounded-lg flex items-center justify-center text-white font-bold text-7xl text-center">
                YOU ARE INVITED
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="block font-medium mb-2">Theme</label>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <h1 className="border rounded-md px-5 py-10 focus:outline-none font-semibold bg-gray-100">
                    Title
                  </h1>
                  <button className="">Minimal</button>
                </div>
                <div className="text-center">
                  <h1 className="border rounded-md px-5 py-10 focus:outline-none font-semibold bg-gray-100">
                    Title
                  </h1>
                  <button className="">Holiday</button>
                </div>
                <div className="text-center">
                  <h1 className="border rounded-md px-5 py-10 focus:outline-none font-semibold bg-gray-100">
                    Title
                  </h1>
                  <button className="">Abstract</button>
                </div>
                <div className="text-center">
                  <h1 className="border rounded-md px-5 py-10 focus:outline-none font-semibold bg-gray-100">
                    Title
                  </h1>
                  <button className="">Quantum</button>
                </div>
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <div className="mt-4">
                <label className="font-medium mb-1 flex items-center gap-1">
                  <FaPalette /> Color
                </label>
                <input
                  type="color"
                  name="color"
                  value={eventData.color}
                  onChange={handleChange}
                  className="w-full h-10 rounded-lg"
                />
              </div>

              {/* Font Type Picker */}
              <div className="mt-4">
                <label className="font-medium mb-1 flex items-center gap-1">
                  <FaFont /> Typeface
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={eventData.typeface}
                  name="typeface"
                  onChange={handleChange}
                >
                  <option>Default</option>
                  <option>Serif</option>
                  <option>Sans-serif</option>
                  <option>Roboto</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreator;
