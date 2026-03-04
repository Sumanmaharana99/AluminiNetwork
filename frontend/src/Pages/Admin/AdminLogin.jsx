import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const AdminLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        if (username === "admin" && password === "admin123") {
            navigate("/admin/dashboard")
        } else {
            alert("Invalid admin credentials")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Admin Username" 
                        className="w-full p-4 border rounded-xl mb-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-4 border rounded-xl mb-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-purple-600 text-white p-4 rounded-xl font-medium">
                        Login as Admin
                    </button>
                </form>
                <p className="text-center mt-4">
                    <Link to="/" className="text-purple-600">Back to Home</Link>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin