import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContexts';
import BASE_URL from '../../api/BaseUrl';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return null;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Check if data contains jwt and message
      if (data.jwt) {
        // Store token and message in localStorage
        localStorage.setItem('token', data.jwt || '');
        localStorage.setItem('message', data.message || '');

        // Logic based on success or subscription issues
        if (data.message === "Signin Success" || data.message === "Signin Success (Admin)") {
          setMessage({ type: 'success', content: data.message });
          login(data.jwt, data.role);
          setTimeout(() =>  navigate(`/${data.role}/dashboard`), 1500);
        } else if (
          data.message === "Login successful, but your subscription is inactive. Please renew your subscription to access premium features." ||
          data.message === "Login successful, but your subscription has expired. Please renew your subscription." ||
          data.message === "Payment not completed. Access denied." ||
          data.message === "Login successful, but payment is pending. Please complete your payment to access premium features."
        ) {
          setMessage({ type: 'warning', content: data.message });
          login(data.jwt, data.role);
          setTimeout(() => navigate(`/${data.role}/${data.role}-plans`), 1500);
        } else {
          setMessage({ type: 'error', content: data.message || 'Login failed' });
        }
      } else {
        setMessage({ type: 'error', content: data.message });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ type: 'error', content: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-[url('src/assets/Searcch.jpg')] bg-cover bg-center opacity-50"
          style={{ top: '0', height: '100vh' }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-center mb-4">Login to Your Account</h1>
          <div className="flex items-center justify-center gap-2 text-sm mb-8">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Login</span>
          </div>
          
          {/* Form Section */}
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
            {message.content && (
              <div
                className={`mb-6 p-4 ${
                  message.type === 'error'
                    ? 'bg-red-50 border border-red-200 text-red-600'
                    : message.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-200 text-yellow-600'
                    : 'bg-green-50 border border-green-200 text-green-600'
                } rounded-lg`}
              >
                {message.content}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border  text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-black text-white py-3 rounded-lg transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

