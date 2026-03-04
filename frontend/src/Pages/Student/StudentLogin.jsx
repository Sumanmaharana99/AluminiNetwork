import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const StudentLogin = () => {
    const [studentId, setStudentId] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        
        setTimeout(() => {
            navigate("/student/dashboard")
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Student Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Student ID" 
                        className="w-full p-4 border rounded-xl mb-4"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
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
                    <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-medium">
                        {loading ? "Logging in..." : "Login as Student"}
                    </button>
                </form>
                <p className="text-center mt-4">
                    <Link to="/student/register" className="text-blue-600">New Student? Register</Link>
                </p>
            </div>
        </div>
    )
}

export default StudentLogin