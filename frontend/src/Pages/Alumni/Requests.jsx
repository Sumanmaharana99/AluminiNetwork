import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Requests = () => {
    const [requests, setRequests] = useState([
        { id: 1, name: "John Doe", branch: "CSE", year: "3rd", message: "Need guidance for placements", status: "pending" },
        { id: 2, name: "Sarah Smith", branch: "IT", year: "4th", message: "Interested in your company", status: "pending" }
    ])

    const handleAccept = (id) => {
        setRequests(requests.map(req => req.id === id ? {...req, status: "accepted"} : req))
    }

    const handleReject = (id) => {
        setRequests(requests.filter(req => req.id !== id))
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b"><h2 className="text-xl font-bold">Alumni Portal</h2></div>
      <nav className="p-4 space-y-2">
    <Link to="/alumni/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
    <Link to="/alumni/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
    <Link to="/alumni/requests" className="block p-3 bg-blue-100 rounded">Requests</Link>
    <Link to="/alumni/events" className="block p-3 hover:bg-gray-100 rounded">Post Events</Link>
    <Link to="/alumni/chat" className="block p-3 hover:bg-gray-100 rounded">Chat</Link>
    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
</nav>
            </div>

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Student Requests</h1>
                
                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req.id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold">{req.name}</h3>
                            <p className="text-gray-600">{req.branch} • {req.year}</p>
                            <p className="mt-2">{req.message}</p>
                            {req.status === "pending" ? (
                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => handleAccept(req.id)} className="bg-green-600 text-white px-4 py-2 rounded">Accept</button>
                                    <button onClick={() => handleReject(req.id)} className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
                                </div>
                            ) : (
                                <span className="text-green-600 mt-2 inline-block">✓ Accepted</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Requests