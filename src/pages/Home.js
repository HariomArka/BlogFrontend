import React, { useEffect, useState } from 'react';
import Blogcard from '../components/Blogcard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const { userCount, setuserCount, blogCount, setblogCount, writerCount, setwriterCount } = useAuth();

  // Add these state variables to your existing useState declarations
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);


  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs`);
      const json = await response.json();

      if (response.ok) {
        setBlogs(json);
        setblogCount(json.length)
        // Count unique usernames
        const uniqueUsernames = new Set(json.map(blog => blog.username));

        setwriterCount(uniqueUsernames.size)
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUsernumber = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/totalusers`);
      const json = await response.json();
      if (response.ok) {
        setuserCount('' + json.totalUsers);
      }
    };

    fetchUsernumber();
  }, []);

  const FloatingShape = ({ delay, size, position }) => (
    <div
      className={`absolute ${size} rounded-full bg-gradient-to-r from-blue-400/10 to-purple-500/10 backdrop-blur-sm animate-pulse`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    />
  );

  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => Math.min(prev + 3, blogs?.length || 0));
  };

  //handle Like
  const handleLike = async (e, blogId) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiking) return;

    setIsLiking(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        //setLikes(updatedBlog.likes);
      } else if (response.status === 404) {
        const errorData = await response.json();
        //console.error('Blog not found or invalid ID:', errorData.error);
      } else if (response.status === 500) {
        const errorData = await response.json();
        // console.error('Server error:', errorData.error);
      } else {
        //console.error('Failed to update likes. Status:', response.status);
      }
    } catch (error) {
      // console.error('Network error updating likes:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Add this handleCommentSubmit function
  const handleCommentSubmit = async (e, blogId) => {
    e.preventDefault();

    if (!commentText.trim() || !selectedBlog || isSubmittingComment) return;

    setShowCommentForm(false)
    setIsSubmittingComment(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}/comment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newComment: commentText.trim(),
        }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();

        // Update the blog in the local state
        setBlogs(prevBlogs =>
          prevBlogs.map(blog =>
            blog._id === selectedBlog._id ? updatedBlog : blog
          )
        );

        // Update selected blog
        setSelectedBlog(updatedBlog);

        // Reset form
        setCommentText('');
        setShowCommentForm(false);

        //console.log('Comment added successfully');
      } else {
        const errorData = await response.json();
        //console.error('Failed to add comment:', errorData.error);
      }
    } catch (error) {
      //console.error('Network error adding comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)`
            }}
          />

          {/* Floating Shapes */}
          <FloatingShape delay={0} size="w-32 h-32" position={{ x: 10, y: 20 }} />
          <FloatingShape delay={2} size="w-24 h-24" position={{ x: 80, y: 10 }} />
          <FloatingShape delay={4} size="w-40 h-40" position={{ x: 70, y: 70 }} />
          <FloatingShape delay={1} size="w-20 h-20" position={{ x: 20, y: 80 }} />
          <FloatingShape delay={3} size="w-28 h-28" position={{ x: 85, y: 40 }} />

        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className={`text-center max-w-5xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-white/90">{blogs ? blogCount : ''} + blogs for you</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Discover Stories
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                That Inspire
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-10 font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join our vibrant community of{' '}
              <span className="text-blue-300 font-semibold">storytellers</span> and{' '}
              <span className="text-purple-300 font-semibold">dreamers</span>{' '}
              to share experiences that move the world
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/writeblog"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  🚀 Start Writing Now
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
              <Link to="/allblog">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  📚 Explore Stories
                </button>
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{writerCount}+</div>
                <div className="text-sm text-white/60">Writers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{blogs ? blogCount : ''}+</div>
                <div className="text-sm text-white/60">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{userCount}+</div>
                <div className="text-sm text-white/60">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1+</div>
                <div className="text-sm text-white/60">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-purple-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
        </div>

        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Geometric Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

        <div className="container mx-auto relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Floating Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-bold text-white/90 tracking-wide">✨ FEATURED CONTENT</span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Main Title with Enhanced Gradient */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                Latest Stories
              </span>
              {/* Glowing underline effect */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50" />
            </h2>

            {/* Enhanced Description */}
            <div className="relative max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                Discover compelling narratives and insights from our community of
                <span className="text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text font-semibold"> passionate writers</span>
              </p>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-purple-400/30 rounded-br-lg" />
            </div>
          </div>

          {/* Enhanced Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {blogs && blogs.slice(0, visibleBlogs).map((post, index) => (
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
                      }}
                    />

                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Load More Button */}
          {blogs && visibleBlogs < blogs.length && (
            <div className="text-center">
              <div className="relative inline-block">
                {/* Button glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-70 scale-110 animate-pulse" />

                {/* Main button */}
                <button
                  onClick={loadMoreBlogs}
                  className="relative group px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl font-bold text-lg hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 border border-white/20"
                >
                  <span className="flex items-center relative z-10">
                    <span className="mr-3">Load More Stories</span>

                    {/* Animated icon */}
                    <div className="relative w-6 h-6 overflow-hidden">
                      <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </span>

                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 group-hover:via-white/20 transition-all duration-300" />
                </button>

                {/* Floating particles effect */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75" />
                <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Bottom accent gradient */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
      </section>


      {selectedBlog && (
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

                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-white/80 font-medium">5 min read</span>
                        </div>
                      </div>


                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                      <div className="text-white/90 leading-relaxed space-y-6">
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
                              <div key={index} className="flex items-start items-center space-x-4 p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
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
                        <div className="flex items-center space-x-4">
                          <button
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
                            onClick={(e) => handleLike(e, selectedBlog._id)}
                            disabled={isLiking}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>Like</span>
                          </button>

                          <button
                            className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white border border-white/20 hover:scale-105 transition-all duration-300"
                            onClick={() => setShowCommentForm(true)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>Comment</span>
                          </button>

                          {/* Comment Form Modal */}

                          {showCommentForm && (
                            <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
                              {/* Backdrop */}
                              <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => {
                                  setShowCommentForm(false);
                                  setCommentText('');
                                }}
                              />

                              {/* Comment Form */}
                              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/20 backdrop-blur-xl max-w-lg w-full mx-4 shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                  <h3 className="text-2xl font-bold text-white flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Add Comment
                                  </h3>
                                  <button
                                    onClick={() => {
                                      setShowCommentForm(false);
                                      setCommentText('');
                                    }}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300"
                                  >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={(e) => handleCommentSubmit(e, selectedBlog._id)} className="space-y-6">
                                  <div>
                                    <textarea
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      placeholder="Write your comment here..."
                                      className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 resize-none focus:outline-none focus:border-blue-400 transition-all duration-300 min-h-[120px]"
                                      required
                                    />
                                  </div>

                                  <div className="flex items-center justify-end space-x-3">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowCommentForm(false);
                                        setCommentText('');
                                      }}
                                      className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white border border-white/20 transition-all duration-300"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      disabled={!commentText?.trim() || isSubmittingComment}
                                      className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 ${(!commentText?.trim() || isSubmittingComment)
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-lg hover:shadow-blue-500/25'
                                        }`}
                                    >
                                      {isSubmittingComment ? (
                                        <span className="flex items-center">
                                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                          Submitting...
                                        </span>
                                      ) : (
                                        'Submit Comment'
                                      )}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}

                        </div>

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


      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;