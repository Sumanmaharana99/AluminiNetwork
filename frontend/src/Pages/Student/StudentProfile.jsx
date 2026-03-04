import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: "John Doe",
        studentId: "CS2021001",
        email: "john@college.edu",
        branch: "CSE",
        year: "3"
    })

    const handleChange = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value})
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b"><h2 className="text-xl font-bold">Student Portal</h2></div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 bg-blue-100 rounded">Profile</Link>
                    <Link to="/student/alumni-directory" className="block p-3 hover:bg-gray-100 rounded">Alumni</Link>
                     <Link to="/student/events" className="block p-3 hover:bg-gray-100 rounded">Events</Link>
                    <Link to="/student/messages" className="block p-3 hover:bg-gray-100 rounded">Messages</Link>
                <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">My Profile</h1>
                
                <div className="max-w-2xl bg-white p-6 rounded shadow">
                    <div className="space-y-4">
                        <div>
                            <label>Full Name</label>
                            <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label>Student ID</label>
                            <input type="text" value={profile.studentId} className="w-full p-2 border rounded bg-gray-100" disabled />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label>Branch</label>
                                <select name="branch" value={profile.branch} onChange={handleChange} className="w-full p-2 border rounded">
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="ECE">ECE</option>
                                </select>
                            </div>
                            <div>
                                <label>Year</label>
                                <select name="year" value={profile.year} onChange={handleChange} className="w-full p-2 border rounded">
                                    <option value="1">1st</option>
                                    <option value="2">2nd</option>
                                    <option value="3">3rd</option>
                                    <option value="4">4th</option>
                                </select>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile