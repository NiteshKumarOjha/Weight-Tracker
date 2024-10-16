import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Users, Shield, Menu, Star } from "lucide-react";
import api from "../utils/api";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await api.get("/auth/verify-token", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="container mx-auto px-6 py-32 lg:py-48 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-8 md:mb-14 leading-tight">
          Weight
          <span className="md:py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Track
          </span>
        </h1>
        <p className="text-xl md:text-4xl mb-12 text-gray-300">
          Simplify your weight tracking experience with WeightTrack.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={isAuthenticated ? "/dashboard" : "/signup"}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full inline-flex items-center text-lg transition transform hover:scale-105"
          >
            Start Tracking Today
            <ArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <BarChart2 size={40} />,
      title: "Simple Logging",
      description: "Quickly log your weight data in just a few clicks.",
    },
    {
      icon: <Users size={40} />,
      title: "Family Support",
      description: "Monitor your family’s weight data in one place.",
    },
    {
      icon: <Shield size={40} />,
      title: "Data Security",
      description: "Your weight data remains encrypted and secure.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="bg-gray-800 px-4 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center text-white"
        variants={itemVariants}
      >
        Why Choose WeightTrack?
      </motion.h2>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
    >
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jethalal Gada",
      profession: "Businessman",
      comment:
        "Running business is tough, but keeping track of my health used to be tougher. Since I started using WeightTrack, it’s like a manager for my health. I can easily monitor my weight and stay on track without hassle. Now, even Bapuji doesn’t worry about my health as much! Thank you WeightTrack!",
    },
    {
      name: "John Cena",
      profession: "Wrestler & Actor",
      comment:
        "As someone who’s constantly training, WeightTrack helps me stay on top of my fitness goals. The detailed tracking and easy-to-use interface fit right into my busy schedule. It’s like my invisible coach, keeping me focused on getting stronger every day. You may not see me, but my results speak for themselves!",
      rating: 4,
    },
    {
      name: "Eren Yeager",
      profession: "Scout Regiment Soldier",
      comment:
        "In a world where survival depends on strength and discipline, tracking my progress is vital. WeightTrack helps me monitor my weight and maintain the fitness I need to keep pushing forward. Whether it’s training in the mountains or preparing for the next battle, WeightTrack ensures I stay in peak condition.",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="container mx-auto px-10 md:px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        variants={itemVariants}
      >
        What Our Users Say
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <TestimonialCard {...testimonial} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ name, comment, profession }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-700 p-6 rounded-lg shadow-lg"
    >
      <p className="text-gray-300 text-lg mb-5">{comment}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">- {name}</span>
        <span className=" text-lg font-semibold">{`(${profession})`}</span>
      </div>
    </motion.div>
  );
};

const CTASection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await api.get("/auth/verify-token", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-semibold text-white mb-6 md:mb-10"
          variants={containerVariants}
        >
          Ready to Take Control of Your Health Journey?
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          variants={containerVariants}
        >
          Track your weight effortlessly, set goals, and see your progress over
          time. Start your journey towards a healthier you.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to={isAuthenticated ? "/dashboard" : "/signup"}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Get Started
            <ArrowRight className="ml-2 inline-block text-white" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <p className="text-sm">&copy; 2024 WeightTrack. All rights reserved.</p>

        <div className="mt-4 md:mt-0 space-x-6">
          <Link
            to="/privacy"
            className="hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </Link>
          <Link
            to="/faq"
            className="hover:text-white transition-colors duration-300"
          >
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LandingPage;
