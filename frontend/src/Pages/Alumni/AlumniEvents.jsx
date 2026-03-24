import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AlumniEvents = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        mode: "online",
        targetAudience: "all",
        maxAttendees: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const eventData = {
                title: formData.title,
                description: formData.description,
                date: formData.date,
                location: formData.location,
                targetAudience: formData.targetAudience,
                maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined
            };
            
            await api.post('/events', eventData);
            toast.success('Event created successfully!');
            
            // Reset form
            setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                mode: "online",
                targetAudience: "all",
                maxAttendees: ""
            });
            
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error(error.response?.data?.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Alumni Portal</h2>
                    <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/alumni/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/alumni/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/alumni/requests" className="block p-3 hover:bg-gray-100 rounded">Requests</Link>
                    <Link to="/alumni/events" className="block p-3 bg-blue-100 rounded">Create Event</Link>
                    <Link to="/alumni/chat" className="block p-3 hover:bg-gray-100 rounded">Chat</Link>
                    <button 
                        onClick={handleLogout}
                        className="block w-full text-left p-3 hover:bg-gray-100 rounded mt-20 text-red-600"
                    >
                        Logout
                    </button>
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
                                {/* Event Title */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Event Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g., Alumni Networking Night 2024"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description *</label>
                                    <textarea
                                        name="description"
                                        placeholder="Describe the event, agenda, speakers, etc."
                                        rows="4"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date & Time *</label>
                                    <input
                                        type="datetime-local"
                                        name="date"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Location & Mode */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="e.g., Bangalore, Mumbai, or Online"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Mode</label>
                                        <select
                                            name="mode"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.mode}
                                            onChange={handleChange}
                                        >
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Target Audience & Max Attendees */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Target Audience</label>
                                        <select
                                            name="targetAudience"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.targetAudience}
                                            onChange={handleChange}
                                        >
                                            <option value="all">All Users</option>
                                            <option value="alumni">Alumni Only</option>
                                            <option value="student">Students Only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Max Attendees (Optional)</label>
                                        <input
                                            type="number"
                                            name="maxAttendees"
                                            placeholder="Leave blank for unlimited"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.maxAttendees}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 mt-2 disabled:opacity-50"
                                >
                                    {loading ? 'Creating Event...' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniEvents;