import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const StudentMessages = () => {
    const [selectedAlumni, setSelectedAlumni] = useState(null);
    const [message, setMessage] = useState("");
    
    // Dummy data - alumni who are connected with this student
    const [alumni] = useState([
        { 
            id: 1, 
            name: "Amit Patel", 
            company: "Amazon", 
            role: "Senior SDE", 
            branch: "CSE", 
            year: "2018", 
            lastMessage: "Focus on DSA and system design", 
            time: "10:30 AM", 
            unread: 2 
        },
        { 
            id: 2, 
            name: "Priya Sharma", 
            company: "Microsoft", 
            role: "Product Manager", 
            branch: "IT", 
            year: "2019", 
            lastMessage: "When is your interview?", 
            time: "Yesterday", 
            unread: 0 
        },
        { 
            id: 3, 
            name: "Rahul Verma", 
            company: "Google", 
            role: "Software Engineer", 
            branch: "ECE", 
            year: "2017", 
            lastMessage: "I've reviewed your resume", 
            time: "Yesterday", 
            unread: 1 
        },
        { 
            id: 4, 
            name: "Neha Gupta", 
            company: "Adobe", 
            role: "Frontend Lead", 
            branch: "CSE", 
            year: "2016", 
            lastMessage: "Thanks for connecting!", 
            time: "2 days ago", 
            unread: 0 
        },
    ]);

    // Dummy messages for selected alumni
    const [messages, setMessages] = useState([
        { id: 1, sender: "student", text: "Hello sir, thank you for accepting my connection request!", time: "10:00 AM" },
        { id: 2, sender: "alumni", text: "Hi John, happy to help! How can I assist you?", time: "10:15 AM" },
        { id: 3, sender: "student", text: "I have an interview at Google next week. Any tips?", time: "10:20 AM" },
        { id: 4, sender: "alumni", text: "Sure! Focus on DSA and system design. I can share some resources.", time: "10:25 AM" },
        { id: 5, sender: "student", text: "That would be great! Thank you so much.", time: "10:30 AM" },
    ]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && selectedAlumni) {
            const newMsg = {
                id: messages.length + 1,
                sender: "student",
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMsg]);
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Student Portal</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/student/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/student/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/student/alumni-directory" className="block p-3 hover:bg-gray-100 rounded">Alumni</Link>
                     <Link to="/student/events" className="block p-3 hover:bg-gray-100 rounded">Events</Link>
                    <Link to="/student/messages" className="block p-3 bg-blue-100 rounded">Messages</Link>
                    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
                </nav>
            </div>

            {/* Chat Container */}
            <div className="flex-1 flex">
                {/* Alumni List */}
                <div className="w-80 bg-white border-r">
                    <div className="p-4 border-b">
                        <h2 className="font-bold">Connected Alumni</h2>
                        <p className="text-sm text-gray-500 mt-1">{alumni.length} connections</p>
                    </div>
                    
                    <div className="overflow-y-auto h-[calc(100vh-120px)]">
                        {alumni.map(alum => (
                            <div 
                                key={alum.id}
                                onClick={() => setSelectedAlumni(alum)}
                                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedAlumni?.id === alum.id ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="font-bold text-blue-600">{alum.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{alum.name}</h3>
                                            <p className="text-xs text-gray-500">{alum.role} at {alum.company}</p>
                                            <p className="text-sm text-gray-600 mt-1 truncate w-40">{alum.lastMessage}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{alum.time}</p>
                                        {alum.unread > 0 && (
                                            <span className="inline-block mt-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                {alum.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedAlumni ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold">{selectedAlumni.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h2 className="font-bold">{selectedAlumni.name}</h2>
                                    <p className="text-xs text-gray-500">{selectedAlumni.role} • {selectedAlumni.company}</p>
                                    <p className="text-xs text-gray-400">{selectedAlumni.branch} • Batch of {selectedAlumni.year}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map(msg => (
                                    <div 
                                        key={msg.id} 
                                        className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div 
                                            className={`max-w-md p-3 rounded-lg ${
                                                msg.sender === 'student' 
                                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                            }`}
                                        >
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'student' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={sendMessage} className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-lg">Select an alumni to start chatting</p>
                                <p className="text-sm mt-2">You have {alumni.length} connected alumni</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentMessages