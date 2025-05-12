import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiStar, FiMapPin, FiDollarSign, FiMail, FiBriefcase, FiFilter, FiSearch,FiGlobe } from 'react-icons/fi';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for freelancers
const dummyFreelancers = [
  {
    id: 1,
    name: 'Alex Johnson',
    title: 'Senior Full-Stack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'San Francisco, CA',
    rate: '$85/hr',
    rating: 4.8,
    reviews: 42,
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
    availability: 'Full-time',
    portfolio: 'alexjohnson.dev',
    bio: 'Full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
    completedProjects: 36,
    responseTime: 'Within 24 hours',
    distance: '5 miles'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    title: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'New York, NY',
    rate: '$75/hr',
    rating: 5.0,
    reviews: 28,
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Adobe XD'],
    availability: 'Part-time',
    portfolio: 'sarahsmithdesign.com',
    bio: 'UI/UX specialist with 5 years of experience creating modern and intuitive interfaces for mobile and web applications.',
    completedProjects: 24,
    responseTime: 'Within 12 hours',
    distance: '250 miles'
  },
  {
    id: 3,
    name: 'Mike Chen',
    title: 'SEO Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    location: 'Chicago, IL',
    rate: '$60/hr',
    rating: 4.3,
    reviews: 15,
    skills: ['SEO', 'Keyword Research', 'Google Analytics', 'Content Strategy', 'SEM'],
    availability: 'Full-time',
    portfolio: 'mikechenseo.com',
    bio: 'SEO expert helping businesses improve their organic search rankings through comprehensive audits and optimization strategies.',
    completedProjects: 18,
    responseTime: 'Within 6 hours',
    distance: '800 miles'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    title: 'Database Architect',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    location: 'Austin, TX',
    rate: '$90/hr',
    rating: 4.9,
    reviews: 31,
    skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Database Design', 'Cloud Migration'],
    availability: 'Full-time',
    portfolio: 'emmawilsontech.com',
    bio: 'Database architect specializing in performance optimization and seamless cloud migrations for enterprise systems.',
    completedProjects: 29,
    responseTime: 'Within 8 hours',
    distance: '1200 miles'
  },
  {
    id: 5,
    name: 'David Brown',
    title: 'Mobile App Developer',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    location: 'Seattle, WA',
    rate: '$80/hr',
    rating: 4.7,
    reviews: 23,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    availability: 'Part-time',
    portfolio: 'davidbrownapps.com',
    bio: 'Mobile developer creating cross-platform applications with React Native and Flutter for startups and established businesses.',
    completedProjects: 17,
    responseTime: 'Within 18 hours',
    distance: '900 miles'
  }
];

const renderRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return stars;
};

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [rateRange, setRateRange] = useState([0, 100]);
  const [connectModal, setConnectModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setFreelancers(dummyFreelancers);
      setIsLoading(false);
      toast.success('Freelancers loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'nearest' && parseInt(freelancer.distance) < 100) ||
                         (filter === 'cheapest' && parseInt(freelancer.rate.replace('$', '')) < 70);
    const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === '' || freelancer.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesRate = parseInt(freelancer.rate.replace('$', '')) >= rateRange[0] && 
                        parseInt(freelancer.rate.replace('$', '')) <= rateRange[1];
    
    return matchesFilter && matchesSearch && matchesLocation && matchesRate;
  });

  const sortedFreelancers = [...filteredFreelancers].sort((a, b) => {
    if (filter === 'rating') {
      return b.rating - a.rating;
    } else if (filter === 'cheapest') {
      return parseInt(a.rate.replace('$', '')) - parseInt(b.rate.replace('$', ''));
    } else if (filter === 'nearest') {
      return parseInt(a.distance) - parseInt(b.distance);
    }
    return 0;
  });

  const handleConnect = (e) => {
    e.preventDefault();
    setConnectModal(false);
    setMessage('');
    toast.success(`Message sent to ${selectedFreelancer.name}!`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        title="Find Freelancers"
        subtitle="Browse and connect with top professionals"
      />
      
      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              All Freelancers
            </button>
            <button
              onClick={() => setFilter('rating')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'rating' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Top Rated
            </button>
            <button
              onClick={() => setFilter('cheapest')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'cheapest' ? 'bg-secondary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Most Affordable
            </button>
            <button
              onClick={() => setFilter('nearest')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'nearest' ? 'bg-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Nearest
            </button>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search freelancers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rate Range: ${rateRange[0]} - ${rateRange[1]}/hr
            </label>
            <div className="flex items-center space-x-2">
              <span>${rateRange[0]}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={rateRange[0]}
                onChange={(e) => setRateRange([parseInt(e.target.value), rateRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={rateRange[1]}
                onChange={(e) => setRateRange([rateRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span>${rateRange[1]}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Freelancers List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Freelancers List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
            {sortedFreelancers.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedFreelancers.map(freelancer => (
                  <motion.div
                    key={freelancer.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedFreelancer(freelancer)}
                    className={`p-4 cursor-pointer transition-colors ${selectedFreelancer?.id === freelancer.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <div className="flex items-start">
                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {freelancer.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {freelancer.title}
                        </p>
                        <div className="flex items-center mt-1">
                          {renderRatingStars(freelancer.rating)}
                          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            ({freelancer.rating.toFixed(1)})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{freelancer.rate}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {freelancer.distance} away
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <FiUser className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No freelancers found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search filters
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Freelancer Details */}
        <div className="lg:col-span-2">
          {selectedFreelancer ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex items-start mb-4 md:mb-0">
                    <img
                      src={selectedFreelancer.avatar}
                      alt={selectedFreelancer.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedFreelancer.name}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {selectedFreelancer.title}
                      </p>
                      <div className="flex items-center mt-1">
                        {renderRatingStars(selectedFreelancer.rating)}
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          {selectedFreelancer.rating.toFixed(1)} ({selectedFreelancer.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setConnectModal(true)}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  >
                    Connect
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    variants={detailVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiMapPin className="text-gray-400 mr-2" />
                        <span>{selectedFreelancer.location}</span>
                      </div>
                      <div className="flex items-center">
                        <FiDollarSign className="text-gray-400 mr-2" />
                        <span>{selectedFreelancer.rate} per hour</span>
                      </div>
                      <div className="flex items-center">
                        <FiBriefcase className="text-gray-400 mr-2" />
                        <span>{selectedFreelancer.availability}</span>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-2" />
                        <span>{selectedFreelancer.completedProjects} projects completed</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={detailVariants}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFreelancer.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    About
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                    {selectedFreelancer.bio}
                  </div>
                </motion.div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Portfolio & Links
                  </h3>
                  <div className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                    <FiGlobe className="mr-2" />
                    <a href={`https://${selectedFreelancer.portfolio}`} target="_blank" rel="noopener noreferrer">
                      {selectedFreelancer.portfolio}
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <FiUser className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Select a freelancer
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose a freelancer from the list to view their profile and connect with them
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Connect Modal */}
      <AnimatePresence>
        {connectModal && selectedFreelancer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Connect with {selectedFreelancer.name}</h3>
                  <button 
                    onClick={() => setConnectModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleConnect}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi ${selectedFreelancer.name}, I'd like to discuss a potential project...`}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <FiMail className="mr-2" />
                    <span>Your message will be sent to {selectedFreelancer.name}'s inbox</span>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setConnectModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Freelancers;