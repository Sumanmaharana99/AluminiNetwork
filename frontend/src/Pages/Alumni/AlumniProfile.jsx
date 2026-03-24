import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AlumniProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        company: "",
        jobTitle: "",
        branch: "",
        graduationYear: "",
        bio: "",
        profilePicture: "",
        phone: "",
        linkedIn: ""
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || "",
                email: user.email || "",
                company: user.company || "",
                jobTitle: user.jobTitle || "",
                branch: user.major || "",
                graduationYear: user.graduationYear || "",
                bio: user.bio || "",
                profilePicture: user.profilePicture || "",
                phone: user.phone || "",
                linkedIn: user.linkedIn || ""
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
                company: profile.company,
                jobTitle: profile.jobTitle,
                major: profile.branch,
                graduationYear: parseInt(profile.graduationYear),
                bio: profile.bio,
                profilePicture: profile.profilePicture,
                phone: profile.phone,
                linkedIn: profile.linkedIn
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
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Alumni Portal</h2>
                    <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/alumni/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/alumni/profile" className="block p-3 bg-blue-100 rounded">Profile</Link>
                    <Link to="/alumni/requests" className="block p-3 hover:bg-gray-100 rounded">Requests</Link>
                    <Link to="/alumni/events" className="block p-3 hover:bg-gray-100 rounded">Events</Link>
                    <Link to="/alumni/chat" className="block p-3 hover:bg-gray-100 rounded">Chat</Link>
                    <button 
                        onClick={handleLogout}
                        className="block w-full text-left p-3 hover:bg-gray-100 rounded mt-20 text-red-600"
                    >
                        Logout
                    </button>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Alumni Profile</h1>
                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
                
                <div className="max-w-3xl bg-white p-6 rounded shadow">
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
                                    className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full p-2 border rounded-lg bg-gray-100"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={profile.company}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={profile.jobTitle}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                                    <select
                                        name="branch"
                                        value={profile.branch}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="MECH">MECH</option>
                                        <option value="CIVIL">CIVIL</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                                    <input
                                        type="number"
                                        name="graduationYear"
                                        value={profile.graduationYear}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                                <input
                                    type="url"
                                    name="profilePicture"
                                    value={profile.profilePicture}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    name="linkedIn"
                                    value={profile.linkedIn}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    rows="4"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                />
                            </div>
                            
                            {editing && (
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

export default AlumniProfile;