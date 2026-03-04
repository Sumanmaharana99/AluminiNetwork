import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const AlumniDirectory = () => {
    const [alumni] = useState([
        { id: 1, name: "Amit Patel", company: "Amazon", role: "SDE" },
        { id: 2, name: "Priya Sharma", company: "Microsoft", role: "PM" },
        { id: 3, name: "Rahul Verma", company: "Google", role: "SWE" }
    ])

    const connectAlumni = (id) => {
        alert(`Connection request sent to alumni ID: ${id}`)
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b"><h2 className="text-xl font-bold">Student Portal</h2></div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/student/alumni-directory" className="block p-3 bg-blue-100 rounded">Alumni</Link>
                    <Link to="/student/events" className="block p-3 hover:bg-gray-100 rounded">Events</Link>
                    <Link to="/student/messages" className="block p-3 hover:bg-gray-100 rounded">Messages</Link>
                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Alumni Directory</h1>
                
                <div className="space-y-4">
                    {alumni.map(alum => (
                        <div key={alum.id} className="bg-white p-4 rounded shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{alum.name}</h3>
                                    <p className="text-gray-600">{alum.role} at {alum.company}</p>
                                </div>
                                <button onClick={() => connectAlumni(alum.id)} className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Connect
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AlumniDirectory