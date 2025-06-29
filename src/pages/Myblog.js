import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Edit, Trash2, Heart, MessageCircle, X, Save, Eye, Sparkles, Clock, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import Blogcard from '../components/Blogcard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { username: currentUser } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (currentUser) {
      fetchBlogs();
    }
  }, [currentUser]);


  const fetchBlogs = async () => {
    setLoading(true);
    try {
      //console.log('Current user from context:', currentUser);

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/username/${currentUser}`);
      const data = await res.json();
      //console.log(data);
      setBlogs(data);
    } catch (error) {
      toast.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async (e, blogId) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editFormData.title,
          image: editFormData.image, // Required by your model
          description: editFormData.content,
          choice: editFormData.choice,
          username: selectedBlog.username,
          author: selectedBlog.author || '',
        }),
      });

      const updated = await res.json();
      setBlogs(blogs.map(b => (b._id === updated._id ? updated : b)));
      setShowEditModal(false);
      setSelectedBlog(updated);
      toast.success('Blog updated successfully!')
    } catch (error) {
      toast.error('Update failed')
    }
  };


  const handleDelete = (blogId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog? This action cannot be undone.');
    if (confirmDelete) {
      deleteBlog(blogId);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`, { method: 'DELETE' });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      if (selectedBlog && selectedBlog._id === blogId) {
        setShowDetailModal(false);
        setSelectedBlog(null);
      }
      toast.success('Blog deleted successfully!')
    } catch (error) {
      //console.error('Error deleting blog:', error);
      toast.error('Error deleting blog. Please try again.')
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-border"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated background */}
          <div className="relative mb-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl transform -skew-y-1"></div>
            <div className="relative">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent mb-4 animate-pulse">
                My Blogs
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full animate-pulse"></div>
            </div>
          </div>


          {(blogs.length == 0 && currentUser == null) && (
            <div className="">

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
                    <h2 className="text-4xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-pulse leading-tight">
                      Ready to Share Your Story?
                    </h2>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                  </div>

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
          )}



          {(blogs.length == 0 && currentUser != null) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center min-h-[60vh] px-6"
            >
              {/* Static Container */}
              <div className="text-center mb-8">
                {/* Large Inspirational Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, type: "spring", bounce: 0.4 }}
                  className="text-5xl mb-6"
                >
                  ✨


                  {/* Main Message */}
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-4 leading-tight"
                  >
                    Your Journey Begins Here
                  </motion.h2>

                  {/* Sub Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                  >
                    You are about to start inspiring the world through your
                    <span className="text-indigo-600 font-semibold"> pen and thoughts</span>.
                    Every great writer started with a single word.
                  </motion.p>

                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/writeblog"
                    className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 no-underline overflow-hidden"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />

                    {/* Button Content */}
                    <motion.span
                      className="relative flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span>Write Your First Blog</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-2xl"
                      >
                        ✍️
                      </motion.span>
                    </motion.span>

                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                      animate={{ x: [-100, 400] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }}
                    />
                  </Link>

                </motion.div>

                {/* Motivational Quote */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="text-gray-500 italic text-center mt-8 max-w-md"
                >
                  "The secret to getting ahead is getting started." - Mark Twain
                </motion.p>
              </div>
            </motion.div>
          )}


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {blogs && blogs.map((post, index) => (
              <div
                key={post._id}
                className={`group transition-all duration-700 hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card Wrapper with Enhanced Styling */}
                <div className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 transition-all duration-500">
                  {/* Inner card */}
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-1 border border-white/10">
                    <Blogcard
                      _id={post._id}
                      image={post.image}
                      title={post.title}
                      description={post.description}
                      likes={post.likes}
                      author={post.author}
                      timestamp={post.timestamps}
                      onReadMore={() => {
                        setSelectedBlog(post)
                        setShowDetailModal(true)
                      }}
                    />

                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Showing complete */}
          {selectedBlog && showDetailModal && (
            <div
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 pt-0"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedBlog(null);
              }}
            >
              {/* Enhanced Backdrop with Multiple Layers */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_70%)]" />
              </div>

              {/* Floating Background Elements */}
              <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

              {/* Enhanced Modal Content */}
              <div className="relative w-[90%] h-[95%] animate-slideUp z-10">
                {/* Outer Glow Container */}
                <div className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 shadow-2xl shadow-purple-500/20 h-full">
                  {/* Main Modal */}
                  <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl border border-white/10 backdrop-blur-xl h-full flex flex-col">

                    {/* Enhanced Close Button */}
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="absolute top-6 right-6 z-30 group"
                    >
                      <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                        <svg className="w-6 h-6 text-white/80 group-hover:text-white group-hover:rotate-90 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {/* Button glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:to-red-500/10 transition-all duration-300" />
                      </div>
                    </button>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto" style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                    }}>

                      {/* Hero Image Section */}
                      <div className="relative h-[50vh] overflow-hidden">
                        {/* Image */}
                        <img
                          src={selectedBlog.image}
                          alt={selectedBlog.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-2xl"
                        />

                        {/* Image Overlay Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20" />

                        {/* Floating Content Badge */}
                        <div className="absolute top-8 left-8">
                          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                            <span className="text-sm font-semibold text-white">Featured Story</span>
                          </div>
                        </div>

                        {/* Bottom Content Preview */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                              {selectedBlog.title}
                            </h1>
                            <div className="flex items-center space-x-4 text-white/70">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 flex items-center justify-center">
                                  <span className="text-sm font-bold text-white">
                                    {selectedBlog.author.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="font-medium">By {selectedBlog.author}</span>
                              </div>
                              <div className="w-1 h-1 bg-white/40 rounded-full" />
                              <span>{selectedBlog.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 md:p-12">

                        {/* Article Meta */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              <span className="text-white/80 font-medium">{selectedBlog.likes} likes</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span className="text-white/80 font-medium">{selectedBlog.comments?.length || 0} comments</span>
                            </div>

                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                          <div className="text-white/90 leading-relaxed space-y-6">
                            {/* <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                              {selectedBlog.description}
                            </p> */}
                            <div className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                              {selectedBlog.description
                                .split('\n\n') // Split into paragraphs
                                .map((para, i) => (
                                  <p key={i} className="mb-3">
                                    {para.split('\n').map((line, j, arr) => (
                                      <React.Fragment key={j}>
                                        {line}
                                        {j !== arr.length - 1 && <br />}
                                      </React.Fragment>
                                    ))}
                                  </p>
                                ))}
                            </div>

                          </div>


                          {/* Comments Section */}
                          <div className="mt-16">
                            <div className="flex items-center mb-8">
                              <h3 className="text-2xl font-bold text-white flex items-center">
                                <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Comments ({selectedBlog.comments?.length || 0})
                              </h3>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-4">
                              {selectedBlog.comments && selectedBlog.comments.length > 0 ? (
                                selectedBlog.comments.map((comment, index) => (
                                  <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                                    {/* Arka SVG Icon */}
                                    <div className=" mt-1">
                                      <img
                                        src="./Hand.svg"
                                        alt="Comment"
                                        className="w-[30px] text-blue-400"
                                      />
                                    </div>

                                    {/* Comment Text */}
                                    <div className="flex-1">
                                      <p className="text-white/90 leading-relaxed">
                                        {comment.content || comment.text || comment.message || comment}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-8">
                                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <p className="text-white/60">No comments yet.</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bottom Action Bar */}
                          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                            <div className="flex gap-4">

                              {/* Edit button */}
                              <button
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
                                onClick={() => {
                                  setEditFormData({
                                    title: selectedBlog.title,
                                    content: selectedBlog.description,
                                    image: selectedBlog.image,
                                    choice: selectedBlog.choice || 'public',
                                  });
                                  setShowEditModal(true);
                                  setShowDetailModal(false);
                                }}

                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                </svg>
                                <span>Edit</span>
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => handleDelete(selectedBlog._id)}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                                <span>Delete</span>
                              </button>

                            </div>

                            {/* <div className=" items-center space-x-4">
                              <div className="text-sm text-white/60">
                                Published {selectedBlog.timestamp}
                              </div>
                            </div> */}

                          </div>
                        </div>

                        {/* Decorative corner elements */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-blue-400/30 rounded-tl-3xl" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-400/30 rounded-br-3xl" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showEditModal && selectedBlog && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
              <style jsx>{`
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d946ef33 #1e1b4b;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    margin: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ec4899, #8b5cf6, #06b6d4);
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #f472b6, #c084fc, #22d3ee);
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: linear-gradient(180deg, #f0abfc, #ddd6fe, #67e8f9);
    box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.4);
  }

  .custom-scrollbar::-webkit-scrollbar-corner {
    background: transparent;
  }
`}</style>


              <div className="bg-gradient-to-br from-slate-900/95 via-violet-900/90 via-fuchsia-900/85 to-cyan-900/95 backdrop-blur-xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-violet-400/40 shadow-2xl shadow-fuchsia-500/30 animate-slideInScale relative overflow-hidden custom-scrollbar">

                {/* Animated background patterns */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-fuchsia-500/40 to-pink-500/40 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-500/25 to-purple-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
                  backgroundSize: '20px 20px'
                }}></div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-fuchsia-500/40 via-violet-500/40 via-cyan-500/40 to-pink-500/40 blur-sm -z-10 animate-pulse"></div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3 relative">
                      <div className="relative">
                        <Edit className="w-8 h-8 text-fuchsia-400 drop-shadow-lg" />
                        <div className="absolute inset-0 w-8 h-8 bg-fuchsia-400/40 rounded-full blur-md animate-pulse"></div>
                      </div>
                      <span className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-sm">
                        Edit Blog
                      </span>
                      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/80 to-cyan-500/0 rounded-full"></div>
                    </h2>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-3 text-gray-400 hover:text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 relative group"
                    >
                      <X className="w-6 h-6 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
                    </button>
                  </div>

                  <div className="space-y-6">

                    <div className="animate-slideInUp relative group" style={{ animationDelay: '100ms' }}>
                      <label className="block text-sm font-medium text-purple-200 mb-3 relative">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Title</span>
                        <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-focus-within:w-full transition-all duration-500"></div>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={editFormData.title}
                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/60 focus:bg-white/15 transition-all duration-300 hover:border-white/30 relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="animate-slideInUp relative group" style={{ animationDelay: '200ms' }}>
                      <label className="block text-sm font-medium text-purple-200 mb-3 relative">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Content</span>
                        <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-focus-within:w-full transition-all duration-500"></div>
                      </label>
                      <div className="relative">
                        <textarea
                          value={editFormData.content}
                          onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                          rows={12}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/60 focus:bg-white/15 transition-all duration-300 resize-none hover:border-white/30 relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="animate-slideInUp relative group" style={{ animationDelay: '300ms' }}>
                      <label className="block text-sm font-medium text-purple-200 mb-3 relative">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Image URL</span>
                        <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-focus-within:w-full transition-all duration-500"></div>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={editFormData.image}
                          onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/60 focus:bg-white/15 transition-all duration-300 hover:border-white/30 relative z-10"
                          placeholder="React, JavaScript, Web Development"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="animate-slideInUp relative group" style={{ animationDelay: '400ms' }}>
                      <label className="block text-sm font-medium text-purple-200 mb-3 relative">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">Visibility</span>
                        <div className="absolute -bottom-1 left-0 w-14 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-focus-within:w-full transition-all duration-500"></div>
                      </label>
                      <div className="relative">
                        <select
                          value={editFormData.choice}
                          onChange={(e) => setEditFormData({ ...editFormData, choice: e.target.value })}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/60 focus:bg-white/15 transition-all duration-300 hover:border-white/30 relative z-10 appearance-none cursor-pointer"
                        >
                          <option value="public" className="bg-gray-800">Public - Edit to share with all</option>
                          <option value="private" className="bg-gray-800">Private - Edit to make it secret</option>
                        </select>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-all duration-300 pointer-events-none"></div>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-purple-300"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6 animate-slideInUp" style={{ animationDelay: '500ms' }}>
                      <button
                        onClick={(e) => handleUpdateBlog(e, selectedBlog._id)}
                        className="flex-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <Save className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="relative z-10 font-semibold">Update Blog</span>
                      </button>
                      <button
                        onClick={() => setShowEditModal(false)}
                        className="flex-1 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative z-10 font-semibold">Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}



        </div>

        <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
      </div>
    </div >
  );
};

export default MyBlogs;
