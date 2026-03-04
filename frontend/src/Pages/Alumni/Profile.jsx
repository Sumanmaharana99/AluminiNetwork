import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "Amit Patel",
        email: "amit@alumni.com",
        company: "Amazon",
        role: "Senior SDE",
        branch: "CSE",
        year: "2018"
    })

    const handleChange = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value})
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b"><h2 className="text-xl font-bold">Alumni Portal</h2></div>
       <nav className="p-4 space-y-2">
    <Link to="/alumni/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
    <Link to="/alumni/profile" className="block p-3 bg-blue-100 rounded">Profile</Link>
    <Link to="/alumni/requests" className="block p-3 hover:bg-gray-100 rounded">Requests</Link>
    <Link to="/alumni/events" className="block p-3 hover:bg-gray-100 rounded">Post Events</Link>
    <Link to="/alumni/chat" className="block p-3 hover:bg-gray-100 rounded">Chat</Link>
    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
</nav>
            </div>

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Alumni Profile</h1>
                
                <div className="max-w-2xl bg-white p-6 rounded shadow">
                    <div className="space-y-4">
                        <div><input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Name" /></div>
                        <div><input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="company" value={profile.company} onChange={handleChange} className="p-2 border rounded" placeholder="Company" />
                            <input type="text" name="role" value={profile.role} onChange={handleChange} className="p-2 border rounded" placeholder="Role" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <select name="branch" value={profile.branch} onChange={handleChange} className="p-2 border rounded">
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                            </select>
                            <input type="text" name="year" value={profile.year} onChange={handleChange} className="p-2 border rounded" placeholder="Graduation Year" />
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile