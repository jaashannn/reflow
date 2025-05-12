import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiUser, FiClock, FiCheck, FiX, FiSearch, FiMessageSquare, FiDollarSign,FiFileText  } from 'react-icons/fi';
import { FaRegStar, FaStar, FaRegClock,FaStarHalfAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for responses
const dummyResponses = [
  {
    id: 1,
    project: 'E-commerce Website Development',
    freelancer: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2023-06-15',
    status: 'pending',
    rating: 4.8,
    rate: '$85/hr',
    coverLetter: 'I have extensive experience building e-commerce platforms with React and Node.js. I can deliver a complete solution within 6 weeks with all requested features including payment integration and inventory management.',
    attachments: ['Proposal.pdf', 'Portfolio.pdf'],
    estimatedTime: '6 weeks'
  },
  {
    id: 2,
    project: 'Mobile App UI/UX Design',
    freelancer: 'Sarah Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '2023-06-14',
    status: 'accepted',
    rating: 5.0,
    rate: '$75/hr',
    coverLetter: 'As a UI/UX specialist with 5 years of experience, I can create a modern and intuitive interface for your mobile app. My design process includes user research, wireframing, and prototyping.',
    attachments: ['Design_Portfolio.pdf'],
    estimatedTime: '3 weeks'
  },
  {
    id: 3,
    project: 'SEO Optimization',
    freelancer: 'Mike Chen',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: '2023-06-12',
    status: 'rejected',
    rating: 4.3,
    rate: '$60/hr',
    coverLetter: 'I specialize in SEO strategies that improve organic search rankings. For your website, I propose a comprehensive audit followed by keyword optimization and content strategy implementation.',
    attachments: ['SEO_Strategy.pdf'],
    estimatedTime: '4 weeks'
  },
  {
    id: 4,
    project: 'Database Migration',
    freelancer: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    date: '2023-06-10',
    status: 'pending',
    rating: 4.9,
    rate: '$90/hr',
    coverLetter: 'With my expertise in database systems, I can ensure a smooth migration from your legacy system to the new cloud-based solution with zero downtime and complete data integrity.',
    attachments: ['Migration_Plan.pdf', 'Certifications.pdf'],
    estimatedTime: '5 weeks'
  }
];

const statusColors = {
  pending: 'warning',
  accepted: 'success',
  rejected: 'error'
};

const statusIcons = {
  pending: <FaRegClock className="mr-1" />,
  accepted: <FiCheck className="mr-1" />,
  rejected: <FiX className="mr-1" />
};

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setResponses(dummyResponses);
      setIsLoading(false);
      toast.success('Responses loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredResponses = responses.filter(response => {
    const matchesFilter = filter === 'all' || response.status === filter;
    const matchesSearch = response.project.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         response.freelancer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (responseId, newStatus) => {
    setResponses(responses.map(response => 
      response.id === responseId ? { ...response, status: newStatus } : response
    ));
    toast.success(`Response ${newStatus}!`);
  };

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
        title="Responses"
        subtitle="Manage freelancer responses to your projects"
      />
      
      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              All Responses
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'pending' ? 'bg-warning-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'accepted' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Accepted
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'rejected' ? 'bg-error-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Rejected
            </button>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search responses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Response Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <FiMail className="text-primary-500 text-3xl mx-auto mb-2" />
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Total Responses</h4>
            <p className="text-2xl font-bold">{responses.length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-warning-100 dark:bg-warning-900/20 flex items-center justify-center mx-auto mb-2">
              <FaRegClock className="text-warning-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Pending</h4>
            <p className="text-2xl font-bold">{responses.filter(r => r.status === 'pending').length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center mx-auto mb-2">
              <FiCheck className="text-success-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Accepted</h4>
            <p className="text-2xl font-bold">{responses.filter(r => r.status === 'accepted').length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-error-100 dark:bg-error-900/20 flex items-center justify-center mx-auto mb-2">
              <FiX className="text-error-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Rejected</h4>
            <p className="text-2xl font-bold">{responses.filter(r => r.status === 'rejected').length}</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Responses List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Responses List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredResponses.length > 0 ? (
              filteredResponses.map(response => (
                <motion.div
                  key={response.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedResponse(response)}
                  className={`p-4 cursor-pointer transition-colors ${selectedResponse?.id === response.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {response.project}
                      </h3>
                      <div className="flex items-center mt-1">
                        <img
                          src={response.avatar}
                          alt={response.freelancer}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {response.freelancer}
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${statusColors[response.status]}-100 dark:bg-${statusColors[response.status]}-900/20 text-${statusColors[response.status]}-800 dark:text-${statusColors[response.status]}-300`}>
                      {statusIcons[response.status]}
                      {response.status.charAt(0).toUpperCase() + response.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiDollarSign className="mr-1" />
                      <span>{response.rate}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiClock className="mr-1" />
                      <span>{response.estimatedTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <FiMail className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No responses found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' 
                    ? "You haven't received any responses yet" 
                    : `You have no ${filter} responses`}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Response Details */}
        <div className="lg:col-span-2">
          {selectedResponse ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedResponse.project}
                    </h2>
                    <div className="flex items-center">
                      <img
                        src={selectedResponse.avatar}
                        alt={selectedResponse.freelancer}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedResponse.freelancer}
                        </span>
                        <div className="flex items-center">
                          {renderRatingStars(selectedResponse.rating)}
                          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            ({selectedResponse.rating.toFixed(1)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {selectedResponse.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(selectedResponse.id, 'accepted')}
                          className="px-3 py-1 bg-success-500 hover:bg-success-600 text-white rounded-md text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedResponse.id, 'rejected')}
                          className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded-md text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-${statusColors[selectedResponse.status]}-100 dark:bg-${statusColors[selectedResponse.status]}-900/20 text-${statusColors[selectedResponse.status]}-800 dark:text-${statusColors[selectedResponse.status]}-300`}>
                      {statusIcons[selectedResponse.status]}
                      {selectedResponse.status.charAt(0).toUpperCase() + selectedResponse.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    variants={detailVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Proposal Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Received:</span>
                        <span className="font-medium">{selectedResponse.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Rate:</span>
                        <span className="font-medium">{selectedResponse.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Estimated Time:</span>
                        <span className="font-medium">{selectedResponse.estimatedTime}</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={detailVariants}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Attachments
                    </h3>
                    <div className="space-y-2">
                      {selectedResponse.attachments.map((file, index) => (
                        <div key={index} className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                          <FiFileText className="mr-2" />
                          <a href="#" className="text-sm truncate">{file}</a>
                        </div>
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
                    Cover Letter
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                    {selectedResponse.coverLetter}
                  </div>
                </motion.div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end space-x-3"
                >
                  {selectedResponse.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(selectedResponse.id, 'accepted')}
                        className="px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg"
                      >
                        Accept Proposal
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedResponse.id, 'rejected')}
                        className="px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg"
                      >
                        Reject Proposal
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    Message Freelancer
                  </button>
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
              <FiMessageSquare className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Select a response
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose a response from the list to view details and manage the proposal
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Responses;