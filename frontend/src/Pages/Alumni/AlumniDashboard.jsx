import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function AlumniDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    connections: 0,
    pendingRequests: 0,
    events: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentRequests();
  }, []);

  const fetchStats = async () => {
    try {
      const [connectionsRes, requestsRes, eventsRes] = await Promise.all([
        api.get('/connections'),
        api.get('/connections/pending'),
        api.get('/events')
      ]);
      
      // Filter events created by this alumni
      const myEvents = eventsRes.data.events?.filter(event => event.createdBy?._id === user?._id) || [];
      
      setStats({
        connections: connectionsRes.data.connections?.length || 0,
        pendingRequests: requestsRes.data.requests?.length || 0,
        events: myEvents.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const fetchRecentRequests = async () => {
    try {
      const response = await api.get('/connections/pending');
      setRecentRequests(response.data.requests?.slice(0, 3) || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Alumni Portal</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}</p>
        </div>
        <nav className="p-4">
          <Link to="/alumni/dashboard" className="block p-2 mb-2 bg-blue-100 rounded">Dashboard</Link>
          <Link to="/alumni/profile" className="block p-2 mb-2 hover:bg-gray-100 rounded">Profile</Link>
          <Link to="/alumni/requests" className="block p-2 mb-2 hover:bg-gray-100 rounded">Requests</Link>
          <Link to="/alumni/events" className="block p-2 mb-2 hover:bg-gray-100 rounded">Events</Link>
          <Link to="/alumni/chat" className="block p-2 mb-2 hover:bg-gray-100 rounded">Chat</Link>
          <button 
            onClick={handleLogout}
            className="block w-full text-left p-2 mt-20 hover:bg-gray-100 rounded text-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Connections</p>
            <p className="text-3xl font-bold">{stats.connections}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Pending Requests</p>
            <p className="text-3xl font-bold">{stats.pendingRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Your Events</p>
            <p className="text-3xl font-bold">{stats.events}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <Link to="/alumni/events" className="block w-full bg-green-600 text-white text-center py-2 rounded mb-3 hover:bg-green-700">
              Create Event
            </Link>
            <Link to="/alumni/requests" className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">
              View Requests ({stats.pendingRequests})
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Connection Requests</h2>
            {recentRequests.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No pending requests</p>
            ) : (
              <div className="space-y-3">
                {recentRequests.map(req => (
                  <div key={req._id} className="p-3 border rounded">
                    <p className="font-medium">{req.requester?.name}</p>
                    <p className="text-sm text-gray-600">{req.requester?.role}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}