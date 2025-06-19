// 'use client';

// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';

// const Contact = () => {
//   // Animation variants for components
//   const componentVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: 'easeOut' },
//     },
//   };

//   // Refs and inView hooks for scroll-triggered animations
//   const headerRef = useRef(null);
//   const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

//   const contactInfoRef = useRef(null);
//   const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.3 });

//   const formRef = useRef(null);
//   const formInView = useInView(formRef, { once: true, amount: 0.3 });

//   return (
//     <div className="bg-gradient-to-b from-white to-blue-50 text-gray-900 min-h-screen p-4 sm:p-8 mt-[60px] sm:mt-0">
//       <motion.h2
//         ref={headerRef}
//         initial="hidden"
//         animate={headerInView ? 'visible' : 'hidden'}
//         variants={componentVariants}
//         className="text-4xl sm:text-5xl font-extrabold text-blue-900 text-center mb-8 font-['Inter',_Helvetica,_Arial,_sans-serif] tracking-tight"
//       >
//         Contact <span className="text-blue-600">Us</span>
//       </motion.h2>

//       <motion.div
//         initial="hidden"
//         animate={headerInView ? 'visible' : 'hidden'}
//         variants={componentVariants}
//         className="text-center text-gray-600 text-lg sm:text-xl mb-12 font-['Inter',_Helvetica,_Arial,_sans-serif] max-w-2xl mx-auto"
//       >
//         We're here to answer your questions and help you connect. Reach out to us anytime!
//       </motion.div>

//       <div className="flex flex-col md:flex-row justify-center gap-8 sm:gap-12 max-w-6xl mx-auto">
//         {/* Contact Info Section */}
//         <motion.div
//           ref={contactInfoRef}
//           initial="hidden"
//           animate={contactInfoInView ? 'visible' : 'hidden'}
//           variants={componentVariants}
//           className="md:w-[40%] w-full flex flex-col gap-8"
//         >
//           {/* Address Card */}
//           <div className="relative bg-white rounded-xl p-6 flex flex-col items-center border border-blue-200 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-blue-400 cursor-pointer">
//             <img className="w-12 mb-4" src="/Map.svg" alt="Map Icon" />
//             <div className="text-center">
//               <p className="font-semibold text-lg text-blue-700">Our Address</p>
//               <p className="text-gray-600">Kharagpur, West Bengal 721302</p>
//             </div>
//             {/* <div className="absolute top-2 right-2 text-blue-600 text-2xl font-bold font-['Inter',_Helvetica,_Arial,_sans-serif] opacity-20">
//               ✉
//             </div> */}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-6">
//             {/* Email Card */}
//             <div className="relative bg-white rounded-xl p-6 flex flex-col items-center sm:w-1/2 border border-blue-200 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-blue-400 cursor-pointer">
//               <img className="w-12 mb-4" src="/Mail.svg" alt="Email Icon" />
//               <div className="text-center">
//                 <p className="font-semibold text-lg text-blue-700">Email Us</p>
//                 <p className="text-gray-600">helpdesk@blogsphere.com</p>
//               </div>
//               {/* <div className="absolute top-2 right-2 text-blue-600 text-2xl font-bold font-['Inter',_Helvetica,_Arial,_sans-serif] opacity-20">
//                 ✉
//               </div> */}
//             </div>

//             {/* Phone Card */}
//             <div className="relative bg-white rounded-xl p-6 flex flex-col items-center sm:w-1/2 border border-blue-200 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-blue-400 cursor-pointer">
//               <img className="w-12 mb-4" src="/Phone.svg" alt="Phone Icon" />
//               <div className="text-center">
//                 <p className="font-semibold text-lg text-blue-700">Phone Us</p>
//                 <p className="text-gray-600">+91 79807 64720</p>
//               </div>
//               {/* <div className="absolute top-2 right-2 text-blue-600 text-2xl font-bold font-['Inter',_Helvetica,_Arial,_sans-serif] opacity-20">
//                 ✉
//               </div> */}
//             </div>
//           </div>
//         </motion.div>

//         {/* Contact Form */}
//         <motion.div
//           ref={formRef}
//           initial="hidden"
//           animate={formInView ? 'visible' : 'hidden'}
//           variants={componentVariants}
//           className="md:w-[50%] w-full bg-white p-6 sm:p-8 rounded-xl shadow-md border border-blue-200 transition-all duration-500 hover:shadow-lg hover:border-blue-400 relative"
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full p-3 bg-blue-50 text-gray-900 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all duration-300"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full p-3 bg-blue-50 text-gray-900 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all duration-300"
//             />
//           </div>
//           <input
//             type="text"
//             placeholder="Subject"
//             className="w-full p-3 bg-blue-50 text-gray-900 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all duration-300"
//           />
//           <textarea
//             placeholder="Message"
//             rows={5}
//             className="w-full mt-4 p-3 bg-blue-50 text-gray-900 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all duration-300"
//           />
//           <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold mt-4 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-['Inter',_Helvetica,_Arial,_sans-serif]">
//             Send Message
//           </button>
//           {/* <div className="absolute top-4 right-4 text-blue-600 text-3xl font-bold font-['Inter',_Helvetica,_Arial,_sans-serif] opacity-20">
//             ✉
//           </div> */}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120
      }
    }
  };

  // Refs for scroll animations
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const contactInfoRef = useRef(null);
  const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.2 });

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mt-[60px] sm:mt-0">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:4s]"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-8">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            <h1 className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Get In Touch
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed"
          >
            Let's create something amazing together. We're here to turn your ideas into reality.
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              ref={contactInfoRef}
              initial="hidden"
              animate={contactInfoInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              className="space-y-8"
            >
              {/* Main Contact Card */}
              <motion.div
                variants={cardVariants}
                className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Visit Us</h3>
                      <p className="text-gray-300">Come say hello at our office</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg">Kharagpur, West Bengal 721302</p>
                </div>
              </motion.div>

              {/* Contact Methods Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Email Card */}
                <motion.div
                  variants={cardVariants}
                  className="group relative p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Email Us</h4>
                    <p className="text-gray-300 break-all">helpdesk@blogsphere.com</p>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  variants={cardVariants}
                  className="group relative p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Call Us</h4>
                    <p className="text-gray-300">+91 79807 64720</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                variants={cardVariants}
                className="flex justify-center space-x-6"
              >
                {[
                  { name: 'LinkedIn', color: 'from-blue-600 to-blue-700', icon: './Linkedin.svg' },
                  { name: 'Instagram', color: 'from-pink-500 to-purple-600', icon: './Insta.svg' },
                  { name: 'Facebook', color: 'from-blue-500 to-blue-600', icon: './Facebook.svg' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`group relative w-14 h-14 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-6 h-6 text-white filter brightness-0 invert"
                    />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="relative"
            >
              <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    Send Us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:border-white/40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>

                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:border-white/40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:border-white/40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <div className="relative group">
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:border-white/40 resize-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <button
                      type="submit"
                      className="w-full p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        Send Message
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;