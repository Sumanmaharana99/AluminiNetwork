import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const StudentEvents = () => {
    const [events, setEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/events');
            setEvents(response.data.events || []);
            
            // Get registered events (you might need to track this from user data)
            // For now, we'll use local state
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (eventId) => {
        setRegistering(eventId);
        try {
            // This would require an API endpoint to register for events
            // For now, we'll simulate registration
            setRegisteredEvents([...registeredEvents, eventId]);
            toast.success('Registered for event successfully!');
        } catch (error) {
            toast.error('Failed to register for event');
        } finally {
            setRegistering(null);
        }
    };

    const handleUnregister = async (eventId) => {
        try {
            setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
            toast.success('Unregistered from event');
        } catch (error) {
            toast.error('Failed to unregister');
        }
    };

    const isRegistered = (eventId) => {
        return registeredEvents.includes(eventId);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">Loading events...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Student Portal</h2>
                    <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/student/alumni" className="block p-3 hover:bg-gray-100 rounded">Alumni</Link>
                    <Link to="/student/events" className="block p-3 bg-blue-100 rounded">Events</Link>
                    <Link to="/student/messages" className="block p-3 hover:bg-gray-100 rounded">Messages</Link>
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
                    <h1 className="text-2xl font-bold">Events</h1>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {registeredEvents.length} Registered
                    </span>
                </div>
                
                {events.length === 0 ? (
                    <div className="bg-white p-8 rounded shadow text-center">
                        <p className="text-gray-600">No events available</p>
                    </div>
                ) : (
                    <>
                        {/* Events List */}
                        <div className="space-y-4">
                            {events.map(event => {
                                const registered = isRegistered(event._id);
                                
                                return (
                                    <div key={event._id} className="bg-white p-4 rounded-lg shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h2 className="text-lg font-semibold">{event.title}</h2>
                                                <p className="text-gray-600 mt-1">{event.description}</p>
                                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                                                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                                                    <p>⏰ {new Date(event.date).toLocaleTimeString()}</p>
                                                    <p>📍 {event.location || 'Online'}</p>
                                                    <p>🎤 {event.createdBy?.name || 'Alumni'}</p>
                                                </div>
                                                {event.maxAttendees && (
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Attendees: {event.attendees?.length || 0} / {event.maxAttendees}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                {registered ? (
                                                    <button
                                                        onClick={() => handleUnregister(event._id)}
                                                        className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm hover:bg-red-200"
                                                    >
                                                        Unregister
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleRegister(event._id)}
                                                        disabled={registering === event._id}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        {registering === event._id ? 'Registering...' : 'Register'}
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
                                <h2 className="text-xl font-bold mb-4">My Registered Events</h2>
                                <div className="bg-white rounded-lg shadow divide-y">
                                    {events
                                        .filter(event => registeredEvents.includes(event._id))
                                        .map(event => (
                                            <div key={event._id} className="p-4 flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">{event.title}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleUnregister(event._id)}
                                                    className="text-red-600 text-sm hover:text-red-800"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentEvents;