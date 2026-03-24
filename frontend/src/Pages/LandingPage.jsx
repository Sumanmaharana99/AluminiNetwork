import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Alumni Connect
          </h1>
          <p className="text-xl text-gray-600">
            Bridge between alumni, students, and opportunities
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Alumni Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">👨‍🎓</div>
            <h2 className="text-2xl font-bold mb-2">Alumni</h2>
            <p className="text-gray-600 mb-4">Connect with students and mentor the next generation</p>
            <Link to="/alumni/login" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login as Alumni
            </Link>
            <Link to="/alumni/signup" className="block mt-2 text-blue-600 hover:underline">
              Create Account
            </Link>
          </div>
          
          {/* Student Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">Student</h2>
            <p className="text-gray-600 mb-4">Connect with alumni for guidance and opportunities</p>
            <Link to="/student/login" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Login as Student
            </Link>
          </div>
          
          {/* Admin Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold mb-2">Admin</h2>
            <p className="text-gray-600 mb-4">Manage users and monitor platform activity</p>
            <Link to="/admin/login" className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}