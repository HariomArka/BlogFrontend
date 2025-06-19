// import React from 'react';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 font-sans">
//       {/* Header */}
//       {/* <header className="bg-purple-600 text-white py-6">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold">BlogSphere</h1>
//           <p className="mt-2 text-lg">A space where every voice matters</p>
//         </div>
//       </header> */}

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto px-4 py-12">
//         {/* About Section */}
//         <section className="mb-16">
//           <h2 className="text-4xl font-bold text-gray-800 mb-6 transition-colors duration-300 hover:text-purple-600">
//             ✨ Welcome to BlogSphere
//           </h2>
//           <p className="text-lg text-gray-600 leading-relaxed">
//             We built this platform with one simple goal: <br />
//             <span className="font-semibold text-purple-600">
//               To give everyone the power to share their thoughts, stories, and ideas with the world.
//             </span>
//           </p>
//           <p className="text-lg text-gray-600 mt-4 leading-relaxed">
//             Whether you're a seasoned writer, a passionate thinker, or someone just starting out — this is your space to write, express, and connect.
//           </p>
//         </section>

//         {/* Features Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 transition-colors duration-300 hover:text-purple-600">
//             🛠️ What You Can Do Here
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { icon: '✍️', title: 'Create a free account', desc: 'Start sharing your thoughts with the world in minutes.' },
//               { icon: '🧾', title: 'Write and publish blogs', desc: 'Long-form stories, quick tips, tutorials, poetry — anything that inspires you.' },
//               { icon: '🔍', title: 'Discover content from others', desc: 'Explore ideas from fellow writers across various topics.' },
//               { icon: '❤️', title: 'Connect and engage', desc: 'Follow writers, leave comments, and be part of a growing community.' },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
//               >
//                 <span className="text-3xl transition-transform duration-300 hover:scale-125 inline-block mb-4">
//                   {feature.icon}
//                 </span>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Vision Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 transition-colors duration-300 hover:text-purple-600">
//             🌱 Our Vision
//           </h2>
//           <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
//             <p className="text-lg text-gray-600 leading-relaxed">
//               We believe writing is a superpower. By creating an open platform, we want to:
//             </p>
//             <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
//               <li className="transition-colors duration-300 hover:text-purple-600">Empower new voices</li>
//               <li className="transition-colors duration-300 hover:text-purple-600">Encourage thoughtful dialogue</li>
//               <li className="transition-colors duration-300 hover:text-purple-600">Build a diverse, respectful community of readers and writers</li>
//             </ul>
//           </div>
//         </section>

//         {/* Join Us Section */}
//         <section className="text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 transition-colors duration-300 hover:text-purple-600">
//             👥 Join Us
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Whether you're here to read or write — or both — we're glad to have you.
//           </p>
//           <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-purple-700 hover:scale-105">
//             Create. Share. Inspire.
//           </button>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto px-4 text-center">
//           <p>&copy; 2025 BlogSphere. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AboutPage;



import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const visionRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative py-20 px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Welcome to <span className="text-yellow-300">BlogSphere</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-6">
            We built this platform with one revolutionary goal: <strong>To democratize storytelling and give every voice the power to reach the world.</strong>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg mt-6 text-blue-100 max-w-2xl mx-auto"
          >
            Whether you're a seasoned author, an aspiring journalist, or someone with a story burning inside you — this is your digital canvas to create, inspire, and connect with minds across the globe.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={cardVariant} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the tools and features that transform your ideas into compelling stories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              variants={cardVariant}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Create Your Identity</h3>
              <p className="text-gray-600 leading-relaxed">
                Build your unique writer profile and establish your personal brand in the digital literary world.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Publish Anything</h3>
              <p className="text-gray-600 leading-relaxed">
                From deep philosophical essays to quick life hacks, poetry to tutorials — your creativity knows no bounds here.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Discover Stories</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore a universe of perspectives, dive into diverse topics, and find writers who challenge and inspire you.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Build Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with like-minded readers, engage in meaningful discussions, and become part of a thriving creative ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      </div>
)}

export default About;