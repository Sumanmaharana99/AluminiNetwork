import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const StudentEvents = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    
    // Dummy data - events created by alumni
    const [events] = useState([
        { 
            id: 1, 
            eventName: "Alumni Networking Night", 
            date: "2024-12-15", 
            time: "6:00 PM",
            mode: "Offline",
            location: "Bangalore",
            organizer: "Amit Patel"
        },
        { 
            id: 2, 
            eventName: "Resume Building Workshop", 
            date: "2024-12-20", 
            time: "3:00 PM",
            mode: "Online",
            location: "Virtual",
            organizer: "Priya Sharma"
        },
        { 
            id: 3, 
            eventName: "Tech Talk: AI in 2025", 
            date: "2024-12-25", 
            time: "11:00 AM",
            mode: "Online",
            location: "Virtual",
            organizer: "Rahul Verma"
        },
    ]);

    const handleRegister = (eventId) => {
        if (!registeredEvents.includes(eventId)) {
            setRegisteredEvents([...registeredEvents, eventId]);
            alert("Registered successfully!");
        }
    };

    const handleUnregister = (eventId) => {
        setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
        alert("Unregistered successfully!");
    };

    const isRegistered = (eventId) => {
        return registeredEvents.includes(eventId);
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Student Portal</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/student/alumni-directory" className="block p-3 hover:bg-gray-100 rounded">Alumni</Link>
                    <Link to="/student/events" className="block p-3 bg-blue-100 rounded">Events</Link>
                 
                    <Link to="/student/messages" className="block p-3 hover:bg-gray-100 rounded">Messages</Link>
                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Events</h1>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {registeredEvents.length} Registered
                    </span>
                </div>
                
                {/* Events List */}
                <div className="space-y-4">
                    {events.map(event => {
                        const registered = isRegistered(event.id);
                        
                        return (
                            <div key={event.id} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">{event.eventName}</h2>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                                            <p>📅 {event.date}</p>
                                            <p>⏰ {event.time}</p>
                                            <p>📍 {event.location}</p>
                                            <p>🎤 {event.organizer}</p>
                                            <p>🖥️ {event.mode}</p>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {registered ? (
                                            <button
                                                onClick={() => handleUnregister(event.id)}
                                                className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm hover:bg-red-200"
                                            >
                                                Unregister
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRegister(event.id)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                                            >
                                                Register
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* My Registered Events */}
                {registeredEvents.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">My Events</h2>
                        <div className="bg-white rounded-lg shadow divide-y">
                            {events
                                .filter(event => registeredEvents.includes(event.id))
                                .map(event => (
                                    <div key={event.id} className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{event.eventName}</p>
                                            <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                                        </div>
                                        <button
                                            onClick={() => handleUnregister(event.id)}
                                            className="text-red-600 text-sm hover:text-red-800"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentEvents