import React from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
           
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Student Portal</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 bg-blue-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/student/alumni-directory" className="block p-3 hover:bg-gray-100 rounded">Alumni</Link>
 <Link to="/student/events" className="block p-3 hover:bg-gray-100 rounded">Events</Link>
                    <Link to="/student/messages" className="block p-3 hover:bg-gray-100 rounded">Messages</Link>
                   
                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

        
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
               
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded shadow"><p>Alumni: 2</p></div>
                    <div className="bg-white p-4 rounded shadow"><p>Requests: 1</p></div>
                    <div className="bg-white p-4 rounded shadow"><p>Events: 5</p></div>
                    <div className="bg-white p-4 rounded shadow"><p>Messages: 3</p></div>
                </div>

             
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/student/alumni-directory" className="block p-4 bg-blue-100 rounded">Find Alumni</Link>
                            <Link to="/student/events" className="block p-4 bg-green-100 rounded">Browse Events</Link>
                            <Link to="/student/messages" className="block p-4 bg-purple-100 rounded">Messages</Link>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-bold mb-4">Notifications</h2>
                        <div className="space-y-3">
                            <div className="p-3 border rounded">Amit accepted request</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard