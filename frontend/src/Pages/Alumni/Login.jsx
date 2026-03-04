import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email);
    navigate("/alumni/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
    
        

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="text-gray-400">📧</div>
                </div>
                <input
                  type="email"
                  placeholder="Enter your alumni email"
                  className="w-full pl-10 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white p-4 rounded-xl font-medium hover:from-emerald-500 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Continue to Dashboard
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Signup Link */}
          <Link 
            to="/signup" 
            className="block w-full text-center border-2 border-emerald-400 text-emerald-600 p-4 rounded-xl font-medium hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Create Alumni Account
          </Link>

          {/* Help Text */}
          <p className="mt-6 text-sm text-gray-500 text-center">
            Using your institution-verified alumni email address
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <Link to="#" className="text-emerald-500 hover:text-emerald-700 font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;