import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        alumniCount: 0,
        connections: 0,
        pendingRequests: 0,
        events: 0,
        messages: 0
    });
    const [recentAlumni, setRecentAlumni] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            const [alumniRes, connectionsRes, eventsRes] = await Promise.all([
                api.get('/users/alumni'),
                api.get('/connections'),
                api.get('/events')
            ]);
            
            setStats({
                alumniCount: alumniRes.data.alumni?.length || 0,
                connections: connectionsRes.data.connections?.length || 0,
                pendingRequests: 0, // You might want to track this separately
                events: eventsRes.data.events?.length || 0,
                messages: 0
            });
            
            // Get first 3 alumni for quick connect
            setRecentAlumni(alumniRes.data.alumni?.slice(0, 3) || []);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Student Portal</h2>
                    <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 bg-blue-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/student/alumni" className="block p-3 hover:bg-gray-100 rounded">Alumni</Link>
                    <Link to="/student/events" className="block p-3 hover:bg-gray-100 rounded">Events</Link>
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
                <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
               
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Alumni</p>
                        <p className="text-2xl font-bold">{stats.alumniCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Connections</p>
                        <p className="text-2xl font-bold">{stats.connections}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Events</p>
                        <p className="text-2xl font-bold">{stats.events}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Messages</p>
                        <p className="text-2xl font-bold">{stats.messages}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/student/alumni" className="block p-4 bg-blue-100 rounded hover:bg-blue-200 transition">
                                Find Alumni Mentors
                            </Link>
                            <Link to="/student/events" className="block p-4 bg-green-100 rounded hover:bg-green-200 transition">
                                Browse Events
                            </Link>
                            <Link to="/student/messages" className="block p-4 bg-purple-100 rounded hover:bg-purple-200 transition">
                                View Messages
                            </Link>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-bold mb-4">Featured Alumni</h2>
                        <div className="space-y-3">
                            {recentAlumni.length === 0 ? (
                                <div className="p-3 border rounded text-center text-gray-500">
                                    No alumni found
                                </div>
                            ) : (
                                recentAlumni.map(alum => (
                                    <div key={alum._id} className="p-3 border rounded flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{alum.name}</p>
                                            <p className="text-sm text-gray-600">{alum.company || 'Alumni'}</p>
                                        </div>
                                        <Link 
                                            to={`/student/alumni`}
                                            className="text-blue-600 text-sm hover:underline"
                                        >
                                            Connect
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;