import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const About = () => {
  const { userCount, blogCount, writerCount } = useAuth();
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          {...floatingAnimation}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          {...floatingAnimation}
          style={{ animationDelay: "2s" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"
        />
        <motion.div
          {...floatingAnimation}
          style={{ animationDelay: "1s" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-300/5 to-blue-400/5 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative py-24 px-6 text-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-blue-900/90"></div>
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
              backgroundSize: "100px 100px"
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              Welcome to{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400"
                {...pulseAnimation}
              >
                BlogSphere
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl font-light max-w-4xl mx-auto leading-relaxed mb-8 text-indigo-100"
          >
            We built this platform with one{" "}
            <motion.span
              className="text-yellow-300 font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              revolutionary goal
            </motion.span>
            : To democratize storytelling and give every voice the power to reach the world.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-xl mt-8 text-indigo-200 max-w-3xl mx-auto leading-relaxed"
          >
            Whether you're a seasoned author, an aspiring journalist, or someone with a story burning inside you —
            this is your digital canvas to create, inspire, and connect with minds across the globe.
          </motion.p>

          {/* Floating CTA Button */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-12"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 no-underline"
              >
                Start Your Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          {...floatingAnimation}
          className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rotate-45 opacity-70"
        />
        <motion.div
          {...floatingAnimation}
          style={{ animationDelay: "1.5s" }}
          className="absolute bottom-32 right-24 w-6 h-6 bg-indigo-300 rounded-full opacity-60"
        />
        <motion.div
          {...floatingAnimation}
          style={{ animationDelay: "0.5s" }}
          className="absolute top-1/3 right-16 w-3 h-3 bg-blue-300 opacity-80"
        />
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 px-6 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={cardVariant} className="text-center mb-20">
            <motion.h2
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-900 mb-6"
              whileInView={{ scale: [0.9, 1] }}
              transition={{ duration: 0.8 }}
            >
              What Makes Us Different
            </motion.h2>
            <motion.p
              className="text-2xl text-indigo-600 max-w-3xl mx-auto font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover the tools and features that transform your ideas into compelling stories
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: "Create Your Identity",
                description: "Build your unique writer profile and establish your personal brand in the digital literary world.",
                gradient: "from-red-500 to-pink-600"
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                title: "Publish Anything",
                description: "From deep philosophical essays to quick life hacks, poetry to tutorials — your creativity knows no bounds here.",
                gradient: "from-blue-500 to-sky-600"
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Discover Stories",
                description: "Explore a universe of perspectives, dive into diverse topics, and find writers who challenge and inspire you.",
                gradient: "from-yellow-500 to-orange-600"
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Build Community",
                description: "Connect with like-minded readers, engage in meaningful discussions, and become part of a thriving creative ecosystem.",
                gradient: "from-blue-600 to-indigo-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-indigo-100 hover:border-indigo-300 h-full relative overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-indigo-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-indigo-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        ref={visionRef}
        initial="hidden"
        animate={visionInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-24 px-6 bg-gradient-to-r from-indigo-900/95 via-blue-900/95 to-indigo-900/95 text-white relative overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-800/30 to-blue-800/30 blur-3xl"
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400"
            whileInView={{ scale: [0.8, 1] }}
            transition={{ duration: 0.8 }}
          >
            Our Vision
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl leading-relaxed mb-12 text-indigo-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            To create a world where every story matters, every voice is heard, and every writer has the power to make a difference through their words.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: writerCount + '+', label: "Active Writers" },
              { number: blogCount + '+', label: "Stories Published" },
              { number: userCount + '+', label: "Readers Inspired" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <motion.div
                  className="text-5xl md:text-6xl font-black text-yellow-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xl text-indigo-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-24 px-6 text-center relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-blue-800 mb-8"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.8 }}
          >
            Ready to Share Your Story?
          </motion.h2>

          <motion.p
            className="text-2xl text-indigo-600 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join thousands of writers who are already making their mark on BlogSphere
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/writeblog"
                className="inline-block px-12 py-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 no-underline"
              >
                Start Writing Now
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(99, 102, 241, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/allblog"
                className="inline-block px-12 py-4 border-2 border-indigo-600 text-indigo-600 font-bold text-xl rounded-full hover:bg-indigo-50 transition-all duration-300 no-underline"
              >
                Explore Stories
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;