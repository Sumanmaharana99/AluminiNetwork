import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const StudentRegister = () => {
    const [name, setName] = useState("")
    const [studentId, setStudentId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [branch, setBranch] = useState("")
    const [year, setYear] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/student/dashboard")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Student Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg mb-3" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="text" placeholder="Student ID" className="w-full p-3 border rounded-lg mb-3" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <select className="p-3 border rounded-lg" value={branch} onChange={(e) => setBranch(e.target.value)} required>
                            <option value="">Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                        </select>
                        <select className="p-3 border rounded-lg" value={year} onChange={(e) => setYear(e.target.value)} required>
                            <option value="">Year</option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                        </select>
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium">Register</button>
                </form>
                <p className="text-center mt-4">
                    <Link to="/student/login" className="text-blue-600">Already have account? Login</Link>
                </p>
            </div>
        </div>
    )
}

export default StudentRegister