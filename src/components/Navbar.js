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
        className={`w-10 h-10 rounded-full bg-indigo-400 hover:bg-indigo-300 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 text-xl transform hover:scale-110 shadow-lg hover:shadow-xl ${isMobile ? 'mx-auto' : ''
          }`}
      >
        {getInitials(username)}
      </button>

      {/* Avatar Dropdown Menu */}
      {isAvatarMenuOpen && (
        <div
          className={`absolute ${isMobile ? 'left-1/2 transform -translate-x-1/2' : 'right-0'
            } mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 transition-all duration-300 ease-in-out transform ${isAvatarMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 tracking-tight">{username}</p>
            <p className="text-xs text-gray-500 mt-0.5">Welcome back!</p>
          </div>

          <hr className="my-1 border-gray-100" />
          <a
            href="/"
            className="block px-4 py-2.5 text-sm text-red-600 font-medium hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-b-xl"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );

  const LoginButton = ({ isMobile = false }) => (
    <a
      href="/login"
      className={`bg-indigo-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-white hover:border-2 ${isMobile ? 'text-center' : ''
        }`}
    >
      Log In
    </a>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-1 shadow-xl sticky top-0 z-50 transition-all duration-500">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <h1 className="text-4xl font-extrabold ">
          <a href="/" className="hover:text-indigo-200 items-center space-x-2">
            <span className="text-indigo-100">BlogSphere</span>
            <span className="text-sm font-light text-indigo-200 hidden sm:block">A space where every voice matters</span>
          </a>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12 font-semibold text-lg">
          <Link
            to="/"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group"
          >
            Home
            <span className="absolute bottom-[-6px] left-0 w-0 h-[3px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/about"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group"
          >
            About
            <span className="absolute bottom-[-6px] left-0 w-0 h-[3px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/writeblog"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group"
          >
            Write Your Blog
            <span className="absolute bottom-[-6px] left-0 w-0 h-[3px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/myblogs"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group"
          >
            My Blogs
            <span className="absolute bottom-[-6px] left-0 w-0 h-[3px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/contact"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-110 group"
          >
            Contact Us
            <span className="absolute bottom-[-6px] left-0 w-0 h-[3px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Conditional rendering based on login status */}
          {isLoggedIn ? <UserAvatar /> : <LoginButton />}
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none transform hover:scale-110 transition-transform duration-300"
          onClick={toggleMenu}
        >
          <svg
            className="w-8 h-8"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-b from-indigo-600 to-purple-700 shadow-2xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-6 text-white font-semibold text-lg">
          <a
            href="/"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/about"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            About
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/writeblog"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            Write Your Blog
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/myblogs"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            My Blogs
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/contact"
            className="relative text-white hover:text-indigo-200 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            Contact Us
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-indigo-300 transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Conditional rendering for mobile */}
          {isLoggedIn ? <UserAvatar isMobile={true} /> : <LoginButton isMobile={true} />}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;