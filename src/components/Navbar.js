import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, username } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to get initials from username
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const UserAvatar = ({ isMobile = false }) => (
    <div className="relative">
      <button
        onClick={toggleAvatarMenu}
        className={`w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-transparent ${isMobile ? 'mx-auto' : ''
          }`}
        aria-label="User menu"
      >
        {getInitials(username)}
      </button>

      {/* Avatar Dropdown Menu */}
      {isAvatarMenuOpen && (
        <div
          className={`absolute ${isMobile ? 'left-1/2 transform -translate-x-1/2' : 'right-0'
            } mt-3 w-64 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-xl z-50 transition-all duration-500 ease-out transform ${isAvatarMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2'
            } overflow-hidden`}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl animate-pulse"></div>

          {/* Header section */}
          <div className="relative px-6 py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50" onClick={() => setIsAvatarMenuOpen(false)}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {getInitials(username)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors duration-300">
                  {username}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 animate-pulse">
                  ✨ Welcome back!
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>

          {/* Menu items */}
          <div className="relative py-2 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
            <a
              href="/"
              onClick={() => setIsAvatarMenuOpen(false)}
              className="group flex items-center px-6 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 focus:outline-none focus:bg-red-500/10 relative overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Logout icon */}
              <svg className="w-4 h-4 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>

              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                Logout
              </span>

              {/* Arrow indicator */}
              <svg className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Bottom decorative line */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-pulse"></div>
        </div>
      )
      }
    </div >
  );

  const LoginButton = ({ isMobile = false }) => (
    <Link
      to="/login"
      className={`bg-indigo-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-transparent border-2 border-transparent hover:border-indigo-200 ${isMobile ? 'text-center block' : 'inline-block'
        }`}
    >
      Log In
    </Link>
  );

  const NavLink = ({ to, children, onClick, isMobile = false }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group focus:outline-none focus:text-indigo-200 ${isMobile ? 'block py-2' : ''
        }`}
    >
      {children}
      <span className={`absolute ${isMobile ? 'bottom-0' : 'bottom-[-6px]'} left-0 w-0 h-[3px] bg-indigo-300 transition-all duration-300 group-hover:w-full group-focus:w-full`}></span>
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xl sticky top-0 z-50 transition-all duration-500">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {/* <Link to="/" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors duration-300"> */}
            <Link to="/" className="flex items-center space-x-2 hover:text-indigo-200 transition-all duration-700 transform hover:scale-105 group">
              <div className="flex flex-col">
                {/* <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-100">
                  BlogSphere
                </span> */}
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent group-hover:from-pink-200 group-hover:via-purple-200 group-hover:to-indigo-200 group-hover:drop-shadow-lg transition-all duration-300">

                  BlogSphere
                </span>
                <span className="text-xs sm:text-sm font-light text-indigo-200 hidden sm:block">
                  A space where every voice matters
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <div className="flex items-center space-x-6 lg:space-x-8 font-semibold text-sm lg:text-base">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/writeblog">Write Blog</NavLink>
              <NavLink to="/allblog">All Blogs</NavLink>
              <NavLink to="/myblogs">My Blogs</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            {/* Auth Section */}
            <div className="ml-4 lg:ml-6">
              {isLoggedIn ? <UserAvatar /> : <LoginButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-300 transition-all duration-300"
              aria-expanded="false"
              aria-label="Main menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div >

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-b from-indigo-600 to-purple-700 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >

        <div className="px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-4 text-white font-semibold text-base">
            <NavLink to="/" onClick={closeMenu} isMobile>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu} isMobile>About</NavLink>
            <NavLink to="/writeblog" onClick={closeMenu} isMobile>Write Blog</NavLink>
            <NavLink to="/allblog" onClick={closeMenu} isMobile>All Blogs</NavLink>
            <NavLink to="/myblogs" onClick={closeMenu} isMobile>My Blogs</NavLink>
            <NavLink to="/contact" onClick={closeMenu} isMobile>Contact</NavLink>
          </div>

          {/* Mobile Auth Section */}
          <div className="pt-4 border-t border-indigo-500">
            {isLoggedIn ? <UserAvatar isMobile={true} /> : <LoginButton isMobile={true} />}
          </div>
        </div>
      </div >
    </nav >
  );
};

export default Navbar;