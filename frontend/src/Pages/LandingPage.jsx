import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
              <div className="text-white font-bold">A</div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AlumConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/alumni/login" 
              className="bg-emerald-400 text-white px-6 py-2 rounded-xl hover:bg-emerald-500 font-medium"
            >
              Alumni Login
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-emerald-500">AlumConnect</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-5">
          Connect, mentor, and grow together. A bridge between alumni, students, and opportunities.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Portal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Student Portal */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all">
           
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Portal</h3>
            <p className="text-gray-600 mb-6">
              Connect with alumni mentors and explore career opportunities.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-700">
                <div className="text-blue-500 mr-3">✓</div>
                Connect with mentors
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-blue-500 mr-3">✓</div>
                Job opportunities
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-blue-500 mr-3">✓</div>
                Career guidance
              </div>
            </div>
            <Link 
              to="/student/login" 
              className="block w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-xl font-medium text-center hover:from-blue-500 hover:to-blue-600 transition-all"
            >
              Student Login
            </Link>
          </div>

          {/* Alumni Portal */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all">
          
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni Portal</h3>
            <p className="text-gray-600 mb-6">
              Reconnect, mentor students, and expand your network.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-700">
                <div className="text-emerald-500 mr-3">✓</div>
                Mentor students
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-emerald-500 mr-3">✓</div>
                Post jobs
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-emerald-500 mr-3">✓</div>
                Network with alumni
              </div>
            </div>
            <Link 
              to="/alumni/login" 
              className="block w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white p-4 rounded-xl font-medium text-center hover:from-emerald-500 hover:to-green-600 transition-all"
            >
              Alumni Login
            </Link>
          </div>

          {/* Admin Portal*/}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100 hover:shadow-xl transition-all">
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Portal</h3>
            <p className="text-gray-600 mb-6">
              Manage users, monitor activities, and generate reports.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-700">
                <div className="text-pink-500 mr-3">✓</div>
                User management
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-pink-500 mr-3">✓</div>
                Platform analytics
              </div>
              <div className="flex items-center text-gray-700">
                <div className="text-pink-500 mr-3">✓</div>
                Content moderation
              </div>
            </div>
            <Link 
              to="/admin/login" 
              className="block w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 rounded-xl font-medium text-center hover:from-pink-500 hover:to-rose-600 transition-all"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
              <div className="text-white font-bold">A</div>
            </div>
            <h3 className="text-xl font-bold">AlumConnect!!</h3>
          </div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Connecting generations of learners and achievers through mentorship and opportunities.
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/alumni/signup" className="text-gray-400 hover:text-white">
              Join as Alumni
            </Link>
            <Link to="/student/login" className="text-gray-400 hover:text-white">
              Student Login
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 AlumConnect!!. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage