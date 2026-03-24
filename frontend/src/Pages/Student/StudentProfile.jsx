import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const StudentProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        major: "",
        enrollmentYear: "",
        bio: "",
        profilePicture: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || "",
                email: user.email || "",
                major: user.major || "",
                enrollmentYear: user.enrollmentYear || "",
                bio: user.bio || "",
                profilePicture: user.profilePicture || "",
                phone: user.phone || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const updateData = {
                name: profile.name,
                major: profile.major,
                enrollmentYear: parseInt(profile.enrollmentYear),
                bio: profile.bio,
                profilePicture: profile.profilePicture,
                phone: profile.phone
            };
            
            const response = await api.put('/users/profile', updateData);
            toast.success('Profile updated successfully!');
            setEditing(false);
            
            // Update local user data
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
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
                    <h2 className="text-xl font-bold">Student Portal</h2>
                    <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 bg-blue-100 rounded">Profile</Link>
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
                
                <div className="max-w-2xl bg-white p-6 rounded shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={profile.name} 
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full p-2 border rounded disabled:bg-gray-100"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={profile.email} 
                                    disabled
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                                <input 
                                    type="url" 
                                    name="profilePicture"
                                    value={profile.profilePicture} 
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full p-2 border rounded disabled:bg-gray-100"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={profile.phone} 
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full p-2 border rounded disabled:bg-gray-100"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                                    <select 
                                        name="major" 
                                        value={profile.major} 
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full p-2 border rounded disabled:bg-gray-100"
                                    >
                                        <option value="">Select Major</option>
                                        <option value="CSE">Computer Science</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="ECE">Electronics & Communication</option>
                                        <option value="EEE">Electrical & Electronics</option>
                                        <option value="MECH">Mechanical</option>
                                        <option value="CIVIL">Civil</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                    <select 
                                        name="enrollmentYear" 
                                        value={profile.enrollmentYear} 
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full p-2 border rounded disabled:bg-gray-100"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea 
                                    name="bio" 
                                    rows="4"
                                    value={profile.bio} 
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="Tell us about yourself, your interests, and what you're looking for in a mentor..."
                                    className="w-full p-2 border rounded disabled:bg-gray-100"
                                />
                            </div>
                            
                            {editing && (
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;