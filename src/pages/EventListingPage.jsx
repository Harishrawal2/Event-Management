import React, { useEffect, useState } from "react";
import { FaVideo, FaUserCircle } from "react-icons/fa";

const EventList = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    // Retrieve events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const now = new Date();

    // Separate events into upcoming and past based on current date
    const upcoming = storedEvents.filter(
      (event) => new Date(event.start) >= now
    );
    const past = storedEvents.filter((event) => new Date(event.start) < now);

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-semibold">Events</h1>
          <div className="space-x-4 bg-gray-200 rounded-md">
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-b from-blue-50 to-white text-gray-700"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "past"
                  ? "bg-gradient-to-b from-blue-50 to-white text-gray-700"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past
            </button>
          </div>
        </div>

        {/* Event Card */}
        {(activeTab === "upcoming" ? upcomingEvents : pastEvents).length > 0 ? (
          (activeTab === "upcoming" ? upcomingEvents : pastEvents).map(
            (event, index) => (
              <div key={index} className="flex items-start">
                {/* Date Section */}
                <div className="text-gray-600">
                  <div className="text-lg font-semibold">
                    {new Date(event.start).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-xl text-gray-400 font-normal">
                    {new Date(event.start).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                </div>
                <div className="px-5 flex flex-col mt-5">
                  <div className="w-2 h-2 rounded-full bg-gray-600 mx-auto"></div>
                  <div className="mt-5 h-36 border-l-4 border-dotted border-gray-300 mx-auto"></div>
                </div>

                {/* Event Details Card */}
                <div className="flex-1 bg-white p-5 rounded-lg shadow-md mt-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-medium text-gray-400 uppercase">
                        {new Date(event.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                      <div className="mt-2 text-xl font-bold capitalize text-gray-800">
                        {event.name}
                      </div>
                      <div className="mt-2 flex items-center space-x-2 text-lg font-medium text-gray-400">
                        <FaUserCircle className="text-blue-500" />
                        <span>By {event.creator || "Unknown"}</span>
                      </div>
                      <div className="mt-2 flex items-center space-x-2 text-lg font-medium text-gray-400">
                        <FaVideo />
                        <span>{event.location || "Virtual"}</span>
                      </div>

                      {/* Attendees Section */}
                      <div className="mt-4 flex items-center">
                        <div className="text-sm text-blue-500">
                          <button className="bg-blue-600 text-white px-2 py-1 rounded">
                            Invited
                          </button>
                        </div>
                        <div className="flex -space-x-2 items-center">
                          {/* Attendee Images */}
                          <img
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                          />
                          <img
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                            alt="Attendee"
                          />
                          <img
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                            alt="Attendee"
                          />
                          <img
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                            alt="Attendee"
                          />
                          <p className="text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-1">
                            +136
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Event Images Thumbnail */}
                    <div className="w-48 h-36 flex-shrink-0">
                      <img
                        className="w-full h-full object-cover bg-yellow-300/10 rounded-md"
                        src="https://media.istockphoto.com/id/530685719/photo/group-of-business-people-standing-in-hall-smiling-and-talking-together.jpg?s=1024x1024&w=is&k=20&c=nVZ3GlLfhB1PS_S5KeRqFVYC80GfDdQXENe2lCyafrs="
                        alt="Event Thumbnail"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="text-center text-gray-500">No events found.</div>
        )}
      </div>
    </div>
  );
};

export default EventList;
