import React, { useState} from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';

const WriteBlog = () => {
  const {isLoggedIn} = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    description: '',
    username: '',
    choice: 'public',
  });
  const [errors, setErrors] = useState({
    title: '',
    image: '',
    description: '',
    author: '',
    username: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitMessage(''); // Clear any previous messages
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', image: '', description: '', author: '', username: '', };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Blog description is required';
      isValid = false;
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
      isValid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
      isValid = false;
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image)) {
      newErrors.image = 'Please provide a valid image URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare data for API (matching your backend schema exactly)
      const blogData = {
        title: formData.title.trim(),
        image: formData.image.trim(),
        choice: formData.choice, // 'public' or 'private'
        description: formData.description.trim(),
        author: formData.author.trim(),
        username: formData.username.trim()
      };

      console.log('Sending blog data:', blogData);

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('Blog published successfully! 🎉');
        setFormData({
          title: '',
          author: '',
          image: '',
          description: '',
          username: '',
          choice: 'public',
        });
        console.log('Blog created:', result);
      } else {
        setSubmitMessage(`Error: ${result.error || 'Failed to publish blog'}`);
        console.error('Error response:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitMessage('Network error: Unable to publish blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Glass morphism container */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-700 hover:shadow-purple-500/25">

            {/* Animated title */}
            <div className="mb-8 relative">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-pulse leading-tight">
                Ready to Share Your Story?
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* Subtitle with typewriter effect simulation */}
            <p className="text-xl text-gray-200 mb-12 opacity-90 animate-bounce delay-500">
            Please{' '}
            <Link 
              to="/login" 
              className="text-purple-300 hover:text-pink-300 underline decoration-2 underline-offset-4 decoration-purple-400 hover:decoration-pink-400 transition-all duration-300 font-semibold"
            >
              Login
            </Link>
            {' '}or{' '}
            <Link 
              to="/register" 
              className="text-blue-300 hover:text-cyan-300 underline decoration-2 underline-offset-4 decoration-blue-400 hover:decoration-cyan-400 transition-all duration-300 font-semibold"
            >
              Register
            </Link>
            {' '}to start writing your blog
          </p>

            {/* Animated buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/login"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300 min-w-32 text-lg border border-purple-400/30"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
              </Link>

              <Link
                to="/register"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 min-w-32 text-lg border border-blue-400/30"
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="mt-12 flex justify-center space-x-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>

          {/* Bottom floating text */}
          <p className="mt-8 text-gray-400 text-sm opacity-70 hover:opacity-100 transition-opacity duration-300">
            ✨ Join thousands of writers sharing their stories
          </p>
        </div>


      </div>
    );
  }


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background with floating elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:4s]"></div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-gray-900 min-h-screen p-4 sm:p-8 mt-[60px] sm:mt-0">
        {/* Animated header */}
        <div className="text-center mb-12 transform transition-all duration-700 hover:scale-105">
          <h2 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 font-sans tracking-tight animate-pulse">
            Write Your <span className="relative">
              Blog
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform origin-left animate-pulse"></div>
            </span>
          </h2>

          <div className="text-gray-600 text-lg sm:text-xl font-sans max-w-2xl mx-auto transform transition-all duration-700 delay-300 opacity-90 hover:opacity-100">
            Share your thoughts and stories with the world. Fill out the form below to create your blog post.
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/30 transition-all duration-700 hover:shadow-3xl hover:bg-white/90 relative overflow-hidden transform hover:scale-[1.02]">

            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-2xl opacity-20 blur-lg animate-pulse pointer-events-none"></div>

            {/* Floating sparkles on the form */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-pink-400 rounded-full animate-ping [animation-delay:1s]"></div>
            <div className="absolute top-6 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping [animation-delay:2s]"></div>

            <div className="relative z-10">
              {/* Submit Message with enhanced animation */}
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-xl transform transition-all duration-500 scale-100 ${submitMessage.includes('successfully')
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-400 text-green-700 shadow-lg'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-400 text-red-700 shadow-lg'
                  }`}>
                  <div className="flex items-center">
                    {submitMessage.includes('successfully') ? (
                      <div className="mr-2 text-green-500 animate-bounce">✅</div>
                    ) : (
                      <div className="mr-2 text-red-500 animate-pulse">❌</div>
                    )}
                    {submitMessage}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-6">
                {/* Title Input with enhanced styling */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="title" className="block text-gray-700 font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Blog Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter your blog title"
                      className="w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 focus:shadow-xl transition-all duration-500 hover:shadow-lg"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.title && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.title}</p>}
                </div>

                {/* Author Input */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="author" className="block text-gray-700 font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    Author Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 focus:shadow-xl transition-all duration-500 hover:shadow-lg"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.author && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.author}</p>}
                </div>

                {/* Username Input */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="author" className="block text-gray-700 font-semibold mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    Username *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      className="w-full p-4 bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 rounded-xl border-2 border-emerald-200 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 focus:border-emerald-500 focus:shadow-xl transition-all duration-500 hover:shadow-lg resize-none"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.username && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.username}</p>}
                </div>

                {/* Image URL Input */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="image" className="block text-gray-700 font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    Image URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Paste image URL (jpg, png, gif, webp)"
                      className="w-full p-4 bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-900 rounded-xl border-2 border-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500 focus:shadow-xl transition-all duration-500 hover:shadow-lg"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.image && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.image}</p>}
                </div>

                {/* Blog Description Textarea */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="description" className="block text-gray-700 font-semibold mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    Blog Description *
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write your blog description here..."
                      rows={5}
                      className="w-full p-4 bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 rounded-xl border-2 border-emerald-200 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 focus:border-emerald-500 focus:shadow-xl transition-all duration-500 hover:shadow-lg resize-none"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.description && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.description}</p>}
                </div>

                {/* Choice Select */}
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="choice" className="block text-gray-700 font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    Privacy Choice
                  </label>
                  <div className="relative">
                    <select
                      id="choice"
                      name="choice"
                      value={formData.choice}
                      onChange={handleChange}
                      className="w-full p-4 bg-gradient-to-r from-orange-50 to-yellow-50 text-gray-900 rounded-xl border-2 border-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-500 focus:shadow-xl transition-all duration-500 hover:shadow-lg cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <option value="public">🌍 Public</option>
                      <option value="private">🔒 Private</option>
                    </select>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Submit Button with enhanced animations */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`group relative w-full p-4 rounded-xl font-bold text-lg mt-6 shadow-2xl transition-all duration-500 font-sans overflow-hidden ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed transform scale-95'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 hover:shadow-3xl active:scale-95'
                    }`}
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                  {/* Ripple effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-30 rounded-xl transition-opacity duration-150"></div>

                  <div className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        <span className="animate-pulse">Publishing...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2 group-hover:animate-bounce">🚀</span>
                        Publish Blog
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;