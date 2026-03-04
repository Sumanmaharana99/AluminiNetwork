import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [branch, setBranch] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        navigate("/alumni/dashboard");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
                    
                    <form onSubmit={handleSignup}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="text-gray-400">👤</div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full pl-10 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="text-gray-400">📧</div>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your institution email"
                                    className="w-full pl-10 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Branch / Department
                                </label>
                                <select
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select Branch</option>
                                    <option value="CSE">Computer Science</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="ECE">Electronics & Communication</option>
                                    <option value="EEE">Electrical & Electronics</option>
                                    <option value="MECH">Mechanical</option>
                                    <option value="CIVIL">Civil</option>
                                    <option value="MBA">MBA</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Graduation Year
                                </label>
                                <select
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    value={gradYear}
                                    onChange={(e) => setGradYear(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select Year</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white p-4 rounded-xl font-medium hover:from-emerald-500 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <div>✓</div>
                                    <span className="text-lg">Create Alumni Account</span>
                                </>
                            )}
                        </button>
                        <p className="mt-6 text-xs text-gray-500 text-center">
                            By signing up, you agree to our{' '}
                            <Link to="/terms" className="text-emerald-500 hover:text-emerald-700">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-emerald-500 hover:text-emerald-700">
                                Privacy Policy
                            </Link>
                        </p>
                    </form>
                    <div className="mt-6 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                            </div>
                        </div>
                    </div>

                    <Link 
                        to="/alumni/login" 
                        className="block w-full text-center border-2 border-emerald-400 text-emerald-600 p-4 rounded-xl font-medium hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Sign In to Existing Account
                    </Link>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Need help with registration?{' '}
                        <Link to="/contact" className="text-emerald-500 hover:text-emerald-700 font-medium">
                            Contact Alumni Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup