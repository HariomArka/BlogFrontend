import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const Footer = () => {
const { userCount,blogCount,writerCount } = useAuth();
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse [animation-delay:2s]"></div>
        <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse [animation-delay:4s]"></div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Top Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse"></div>

      <div className="relative z-10 py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="group transform transition-all duration-500 hover:scale-105">
              <div className="relative">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-pulse">
                  BlogSphere
                </h2>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                A platform to share inspiring stories, connect with writers, and explore diverse perspectives from around the world.
              </p>

              {/* Write Blog Button */}
              <div className="flex">
                <a
                  href="/writeblog"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-white text-center"
                >
                  Write Your Blog
                </a>
              </div>
            </div>

<div className="group">
  <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
    Quick Links
  </h3>
  <ul className="space-y-4">
    {[
      { href: "/", text: "Home", icon: "🏠" },
      { href: "/about", text: "About", icon: "ℹ️" },
      { href: "/writeblog", text: "Write Your Blog", icon: "✍️" },
      { href: "/myblogs", text: "My Blogs", icon: "❤️" },
      { href: "/allblog", text: "All Blogs", icon: "📚" },
      { href: "/contact", text: "Contact Us", icon: "📧" }
    ].map((link, index) => (
      <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
        <Link
          to={link.href}
          className="flex items-center space-x-3 text-gray-300 hover:text-white group/link transition-all duration-300 hover:bg-white/5 rounded-lg p-2 -ml-2"
        >
          <span className="text-lg group-hover/link:animate-bounce">{link.icon}</span>
          <span className="group-hover/link:bg-gradient-to-r group-hover/link:from-blue-400 group-hover/link:to-purple-400 group-hover/link:bg-clip-text group-hover/link:text-transparent font-medium">
            {link.text}
          </span>
        </Link>
      </li>
    ))}
  </ul>
</div>

            {/* Social Media & Contact */}
            <div className="group">
              <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Connect With Us
              </h3>

              {/* Social Icons */}
              <div className="flex space-x-6 mb-8">
                {[
                  { href: "https://www.linkedin.com/in/arka-ghosh-2729b529a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", src: "/Linkedin.svg", alt: "LinkedIn", color: "from-blue-400 to-blue-600" },
                  { href: "https://www.facebook.com/share/1DvvUmbNCh/", src: "/Facebook.svg", alt: "Facebook", color: "from-blue-500 to-indigo-600" },
                  { href: "https://www.instagram.com/arkaghosh10007?igsh=cnhvOGd2N2Vpazln", src: "/Insta.svg", alt: "Instagram", color: "from-pink-400 to-purple-600" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative p-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:rotate-6"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-full opacity-0 group-hover/social:opacity-20 transition-opacity duration-300`}></div>
                    <img
                      className='w-6 h-6 filter brightness-90 group-hover/social:brightness-110 transition-all duration-300'
                      src={social.src}
                      alt={social.alt}
                    />
                  </a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                  <span className="text-blue-400">📍</span>
                  <span>Nehru hall of Residance, IIT Kharagpur, Kharagpur</span>
                </div>
                <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                  <span className="text-purple-400">📞</span>
                  <span>+91 9832416501</span>
                </div>
                <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                  <span className="text-pink-400">✉️</span>
                  <span>blogspherehelpdesk@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: writerCount + ' +', label: "Active Writers", icon: "✍️" },
                { number: blogCount + ' +', label: "Blog Posts", icon: "📚" },
                { number: userCount + ' +', label: "Monthly Readers", icon: "👥" },
                { number: "1 +", label: "Countries", icon: "🌍" }
              ].map((stat, index) => (
                <div key={index} className="group transform transition-all duration-500 hover:scale-110">
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} Arka Ghosh & Sagnik De. All rights reserved.</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-pulse"></div>
    </footer>
  )
}

export default Footer;