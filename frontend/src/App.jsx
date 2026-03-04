import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContext'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Alumni/Login'
import Dashboard from './Pages/Alumni/Dashboard'
import Profile from './Pages/Alumni/Profile'
import Requests from './Pages/Alumni/Requests'
import Signup from './Pages/Alumni/Signup'
import StudentLogin from './Pages/Student/StudentLogin'
import StudentDashboard from './Pages/Student/StudentDashboard'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import StudentRegister from './Pages/Student/StudentRegister'
import StudentProfile from './Pages/Student/StudentProfile'
import StudentMessages from './Pages/Student/StudentMessages'
import AluminiDirectory from './Pages/Student/AluminiDirectory'
import ManageUsers from './Pages/Admin/ManageUsers'
import Chat from './Pages/Alumni/Chat';
import Events from './Pages/Alumni/Events';
import StudentEvents from './Pages/Student/StudentEvents';
const App = () => {
  const { user } = useAuth();

  return (
    <div>
      <Routes>
        {/* Landing Page - Home */}
        <Route path='/' element={<LandingPage />} />    
        {/* Alumni Routes */}
        <Route path='/alumni/login' element={<Login />} />
        <Route path='/alumni/signup' element={<Signup />} />
       <Route path='/alumni/dashboard' element={user ? <Dashboard /> : <Navigate to='/alumni/login' />} />
        <Route path='/alumni/profile' element={user ? <Profile /> : <Navigate to='/alumni/login' />} />
        <Route path='/alumni/requests' element={user ? <Requests /> : <Navigate to='/alumni/login' />} />
        <Route path='/alumni/events' element={user ? <Events /> : <Navigate to='/alumni/login' />} />
        <Route path='/alumni/chat' element={<Chat />} />

        {/* Student Routes */}
        <Route path='/student/login' element={<StudentLogin />} />
        <Route path='/student/dashboard' element={<StudentDashboard />} />
        <Route path='/student/register' element={<StudentRegister />} />
        <Route path='/student/profile' element={<StudentProfile />} />
        <Route path='/student/messages' element={<StudentMessages />} />
        <Route path = '/student/alumni-directory' element={<AluminiDirectory />} />
        <Route path='/student/events' element={<StudentEvents />} />

        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/users' element={<ManageUsers />} />
        {/* Redirect any unknown routes to home */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App