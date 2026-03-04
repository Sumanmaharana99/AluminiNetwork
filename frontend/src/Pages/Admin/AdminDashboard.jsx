import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Admin Portal</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block p-3 bg-purple-100 rounded">Dashboard</Link>
                    <Link to="/admin/users" className="block p-3 hover:bg-gray-100 rounded">Manage Users</Link>

                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold">152</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Active Events</p>
                        <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-600">Active Connections</p>
                        <p className="text-2xl font-bold">89</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/admin/users" className="block p-4 bg-purple-100 rounded">
                                Manage Users
                            </Link>
                            <Link to="/admin/jobs" className="block p-4 bg-green-100 rounded">
                                View All events
                            </Link>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            <div className="p-3 border rounded">
                                <p>New user registered: John Doe (Student)</p>
                                <p className="text-sm text-gray-500">2 hours ago</p>
                            </div>
                            <div className="p-3 border rounded">
                                <p>New Event posted by Amit Patel</p>
                                <p className="text-sm text-gray-500">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard