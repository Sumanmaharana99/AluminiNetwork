import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Alumni Portal</h2>
                </div>
              <nav className="p-4 space-y-2">
    <Link to="/alumni/dashboard" className="block p-3 bg-blue-100 rounded">Dashboard</Link>
    <Link to="/alumni/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
    <Link to="/alumni/requests" className="block p-3 hover:bg-gray-100 rounded">Requests</Link>
    <Link to="/alumni/events" className="block p-3 hover:bg-gray-100 rounded">Post Events</Link>
    <Link to="/alumni/chat" className="block p-3 hover:bg-gray-100 rounded">Chat</Link>
    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
</nav>
            </div>

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Alumni Dashboard</h1>
                
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded shadow"><p>Students: 12</p></div>
                    <div className="bg-white p-4 rounded shadow"><p>Requests: 3</p></div>
                    <div className="bg-white p-4 rounded shadow"><p>Events: 8</p></div>
                    <div className="bg-white p-4 rounded shadow"><p>Messages: 5</p></div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/alumni/requests" className="block p-4 bg-blue-100 rounded">Review Requests</Link>
                            <Link to="/alumni/events" className="block p-4 bg-green-100 rounded">Events</Link>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            <div className="p-3 border rounded"><p>John requested connection</p></div>
                            <div className="p-3 border rounded"><p>Sarah registered for the workshop</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard