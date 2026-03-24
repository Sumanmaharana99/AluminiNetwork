import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function AlumniRequests() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/connections/pending');
      setRequests(response.data.requests);
    } catch (error) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (connectionId) => {
    setProcessingId(connectionId);
    try {
      await api.put(`/connections/accept/${connectionId}`);
      toast.success('Request accepted! You are now connected.');
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (connectionId) => {
    setProcessingId(connectionId);
    try {
      await api.put(`/connections/reject/${connectionId}`);
      toast.success('Request rejected');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to reject request');
    } finally {
      setProcessingId(null);
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
        <div className="text-center">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Alumni Portal</h2>
        </div>
        <nav className="p-4">
          <Link to="/alumni/dashboard" className="block p-2 mb-2 hover:bg-gray-100 rounded">Dashboard</Link>
          <Link to="/alumni/profile" className="block p-2 mb-2 hover:bg-gray-100 rounded">Profile</Link>
          <Link to="/alumni/requests" className="block p-2 mb-2 bg-blue-100 rounded">Requests</Link>
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
        <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>
        
        {requests.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No pending requests</p>
            <p className="text-sm text-gray-500 mt-2">When students connect with you, requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {req.requester?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{req.requester?.name}</h3>
                        <p className="text-gray-600 capitalize">{req.requester?.role}</p>
                        {req.requester?.major && (
                          <p className="text-sm text-gray-500">Major: {req.requester.major}</p>
                        )}
                      </div>
                    </div>
                    {req.message && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-gray-700 italic">"{req.message}"</p>
                      </div>
                    )}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleAccept(req._id)}
                      disabled={processingId === req._id}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {processingId === req._id ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      disabled={processingId === req._id}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}