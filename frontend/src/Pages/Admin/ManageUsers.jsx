import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ManageUsers = () => {
    const [users] = useState([
        { id: 1, name: "John Doe", email: "john@student.com", type: "student", status: "active" },
        { id: 2, name: "Amit Patel", email: "amit@alumni.com", type: "alumni", status: "active" },
        { id: 3, name: "Sarah Smith", email: "sarah@student.com", type: "student", status: "inactive" }
    ])

    const deleteUser = (id) => {
        if (window.confirm("Delete this user?")) {
            alert(`Deleted user ID: ${id}`)
        }
    }

    const toggleStatus = (id) => {
        alert(`Toggled status for user ID: ${id}`)
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b"><h2 className="text-xl font-bold">Admin Portal</h2></div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/admin/users" className="block p-3 bg-purple-100 rounded">Manage Users</Link>
                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
                
                <div className="bg-white rounded shadow">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded ${user.type === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.type}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button onClick={() => toggleStatus(user.id)} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded mr-2">
                                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button onClick={() => deleteUser(user.id)} className="bg-red-100 text-red-800 px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers