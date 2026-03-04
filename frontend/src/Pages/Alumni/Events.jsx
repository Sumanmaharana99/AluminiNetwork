import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Events = () => {
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [location, setLocation] = useState("");
    const [mode, setMode] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Event Created:", {
            eventName,
            eventType,
            location,
            mode,
            date,
            time,
            organizer,
            targetAudience,
            description
        });
        setSuccess(true);
        
        setTimeout(() => {
            setEventName("");
            setEventType("");
            setLocation("");
            setMode("");
            setDate("");
            setTime("");
            setOrganizer("");
            setTargetAudience("");
            setDescription("");
            setSuccess(false);
        }, 3000);
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Alumni Portal</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/alumni/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/alumni/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/alumni/requests" className="block p-3 hover:bg-gray-100 rounded">Requests</Link>
                    <Link to="/alumni/events" className="block p-3 bg-blue-100 rounded">Create Event</Link>
                    <Link to="/alumni/chat" className="block p-3 hover:bg-gray-100 rounded">Chat</Link>
                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create Alumni Event</h1>
                </div>
                
                <div className="max-w-4xl">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Event Name & Type */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Event Name *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Alumni Networking Night"
                                            className="w-full p-3 border rounded-lg"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Event Type *</label>
                                        <select
                                            className="w-full p-3 border rounded-lg"
                                            value={eventType}
                                            onChange={(e) => setEventType(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            <option value="networking">Networking</option>
                                            <option value="workshop">Workshop</option>
                                            <option value="seminar">Seminar</option>
                                            <option value="webinar">Webinar</option>
                                            <option value="meetup">Meetup</option>
                                            <option value="conference">Conference</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Location & Mode */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Location</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Bangalore, Mumbai"
                                            className="w-full p-3 border rounded-lg"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Mode *</label>
                                        <select
                                            className="w-full p-3 border rounded-lg"
                                            value={mode}
                                            onChange={(e) => setMode(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Mode</option>
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date *</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 border rounded-lg"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Time *</label>
                                        <input
                                            type="time"
                                            className="w-full p-3 border rounded-lg"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Organizer & Target Audience */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Organizer *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Alumni Association"
                                            className="w-full p-3 border rounded-lg"
                                            value={organizer}
                                            onChange={(e) => setOrganizer(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Target Audience</label>
                                        <select
                                            className="w-full p-3 border rounded-lg"
                                            value={targetAudience}
                                            onChange={(e) => setTargetAudience(e.target.value)}
                                        >
                                            <option value="">Select Audience</option>
                                            <option value="all">All Alumni</option>
                                            <option value="students">Students</option>
                                            <option value="alumni">Alumni Only</option>
                                            <option value="faculty">Faculty</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        placeholder="Add event description, agenda, speakers, etc."
                                        className="w-full p-3 border rounded-lg"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 mt-2"
                                >
                                    Create Event
                                </button>

                                {success && (
                                    <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                                        ✅ Event created! Alumni and students can now register.
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events