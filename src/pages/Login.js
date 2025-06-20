import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';

const Login = () => {
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimated, setIsAnimated] = useState(false);
  const { setIsLoggedIn, setUsername } = useAuth();

  useEffect(() => {
    setIsAnimated(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `/api/auth/login`,
        {
          username: formData.username,
          password: formData.password
        }
      );

      // Store token and user info in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ username: res.data.username }));

      toast.success('Logged in successfully!');
      setFormData({ username: '', password: '' })

      setIsLoggedIn(true);
      setUsername(res.data.name || res.data.username);

      navigate('/', { replace: true });
    } catch (err) {
      
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transform -skew-y-12"></div>

        {/* Mouse Follower */}
        <div
          className="absolute w-6 h-6 bg-white/20 rounded-full blur-sm pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 transform transition-all duration-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* Left Side - Branding */}
          <div className="flex flex-col justify-center items-center text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  BlogSphere
                </h1>
              </div>

              <h2 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Welcome
                <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  Back
                </span>
              </h2>

              <p className="text-xl text-gray-300 max-w-md">
                Continue your journey of sharing amazing stories and connecting with fellow creators.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-md">
              {[
                { label: 'Stories', value: '10K+' },
                { label: 'Writers', value: '5K+' },
                { label: 'Readers', value: '50K+' }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Glassmorphism Card */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Sign In</h3>
                  <p className="text-gray-300">Enter your credentials to continue</p>
                </div>

                <div className="space-y-6">
                  {/* Username Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                    </div>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Username"
                      required
                    />

                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-white/10 border-white/20" />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Remember me</span>
                    </label>
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleLogin}
                    className="w-full relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>


                  {/* Register Link */}
                  <div className="text-center">
                    <p className="text-gray-300">
                      Don't have an account?{' '}
                      <a href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline">
                        Create one now
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 right-8 flex space-x-4">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
          <span className="text-white text-xl">?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;