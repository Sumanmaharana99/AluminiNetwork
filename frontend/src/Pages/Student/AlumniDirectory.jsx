import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AlumniDirectory = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sendingRequest, setSendingRequest] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlumni();
    }, []);

    const fetchAlumni = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users/alumni');
            setAlumni(response.data.alumni || []);
        } catch (error) {
            console.error('Error fetching alumni:', error);
            toast.error('Failed to load alumni');
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (alumniId) => {
        setSendingRequest(alumniId);
        try {
            await api.post(`/connections/request/${alumniId}`);
            toast.success('Connection request sent!');
        } catch (error) {
            console.error('Error sending request:', error);
            toast.error(error.response?.data?.message || 'Failed to send request');
        } finally {
            setSendingRequest(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    // Filter alumni based on search
    const filteredAlumni = alumni.filter(alum => 
        alum.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">Loading alumni...</div>
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
                    <Link to="/student/alumni" className="block p-3 bg-blue-100 rounded">Alumni</Link>
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
                <h1 className="text-3xl font-bold mb-6">Alumni Directory</h1>
                
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search alumni by name, company, or role..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                {filteredAlumni.length === 0 ? (
                    <div className="bg-white p-8 rounded shadow text-center">
                        <p className="text-gray-600">No alumni found</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAlumni.map(alum => (
                            <div key={alum._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                                <div className="flex items-start space-x-4">
                                    {alum.profilePicture ? (
                                        <img 
                                            src={alum.profilePicture} 
                                            alt={alum.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-xl">
                                                {alum.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{alum.name}</h3>
                                        <p className="text-gray-600 text-sm">{alum.jobTitle || 'Professional'}</p>
                                        {alum.company && (
                                            <p className="text-gray-500 text-sm">at {alum.company}</p>
                                        )}
                                        {alum.graduationYear && (
                                            <p className="text-gray-400 text-xs mt-1">Batch of {alum.graduationYear}</p>
                                        )}
                                        {alum.bio && (
                                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{alum.bio}</p>
                                        )}
                                        <button 
                                            onClick={() => handleConnect(alum._id)}
                                            disabled={sendingRequest === alum._id}
                                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50 w-full"
                                        >
                                            {sendingRequest === alum._id ? 'Sending...' : 'Connect'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumniDirectory;