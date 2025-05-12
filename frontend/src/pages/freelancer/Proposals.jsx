import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiEdit2, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for proposals
const dummyProposals = [
  {
    id: 1,
    projectTitle: 'E-commerce Website Development',
    clientName: 'ABC Corporation',
    clientAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    proposalDate: '2023-06-10',
    budget: '$5,000',
    status: 'accepted',
    coverLetter: 'I have extensive experience in building e-commerce platforms with React and Node.js. I can deliver a complete solution within 6 weeks with all the requested features including payment integration and inventory management.',
    attachments: ['Proposal_ABC.pdf', 'Portfolio.pdf'],
    estimatedTime: '6 weeks'
  },
  {
    id: 2,
    projectTitle: 'Mobile App UI/UX Design',
    clientName: 'XYZ Startup',
    clientAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    proposalDate: '2023-06-05',
    budget: '$2,500',
    status: 'pending',
    coverLetter: 'As a UI/UX specialist with 5 years of experience, I can create a modern and intuitive interface for your mobile app. My design process includes user research, wireframing, and prototyping.',
    attachments: ['Design_Portfolio.pdf'],
    estimatedTime: '3 weeks'
  },
  {
    id: 3,
    projectTitle: 'SEO Optimization',
    clientName: 'Global Services',
    clientAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    proposalDate: '2023-05-28',
    budget: '$1,200',
    status: 'rejected',
    coverLetter: 'I specialize in SEO strategies that improve organic search rankings. For your website, I propose a comprehensive audit followed by keyword optimization and content strategy implementation.',
    attachments: ['SEO_Strategy.pdf'],
    estimatedTime: '4 weeks'
  },
  {
    id: 4,
    projectTitle: 'Database Migration',
    clientName: 'Tech Solutions Inc.',
    clientAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    proposalDate: '2023-05-20',
    budget: '$3,800',
    status: 'accepted',
    coverLetter: 'With my expertise in database systems, I can ensure a smooth migration from your legacy system to the new cloud-based solution with zero downtime and complete data integrity.',
    attachments: ['Migration_Plan.pdf', 'Certifications.pdf'],
    estimatedTime: '5 weeks'
  }
];

const statusColors = {
  accepted: 'success',
  pending: 'warning',
  rejected: 'error'
};

const statusIcons = {
  accepted: <FiCheckCircle className="mr-1" />,
  pending: <FiClock className="mr-1" />,
  rejected: <FiXCircle className="mr-1" />
};

const Proposal = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filter, setFilter] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [editedProposal, setEditedProposal] = useState({
    budget: '',
    coverLetter: '',
    estimatedTime: ''
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProposals(dummyProposals);
      setIsLoading(false);
      toast.success('Proposals loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredProposals = proposals.filter(proposal => 
    filter === 'all' || proposal.status === filter
  );

  const handleEditProposal = (proposal) => {
    setSelectedProposal(proposal);
    setEditedProposal({
      budget: proposal.budget,
      coverLetter: proposal.coverLetter,
      estimatedTime: proposal.estimatedTime
    });
    setEditMode(true);
  };

  const handleSaveProposal = () => {
    const updatedProposals = proposals.map(proposal => 
      proposal.id === selectedProposal.id 
        ? { ...proposal, ...editedProposal }
        : proposal
    );
    
    setProposals(updatedProposals);
    setSelectedProposal({ ...selectedProposal, ...editedProposal });
    setEditMode(false);
    toast.success('Proposal updated successfully!');
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
        title="My Proposals"
        subtitle="Manage and track your submitted proposals"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proposal List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('accepted')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'accepted' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Accepted
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'pending' ? 'bg-warning-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'rejected' ? 'bg-error-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Rejected
              </button>
            </div>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-250px)] overflow-y-auto"
          >
            {filteredProposals.length > 0 ? (
              filteredProposals.map(proposal => (
                <motion.div
                  key={proposal.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedProposal(proposal)}
                  className={`p-4 cursor-pointer transition-colors ${selectedProposal?.id === proposal.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {proposal.projectTitle}
                      </h3>
                      <div className="flex items-center mt-1">
                        <img
                          src={proposal.clientAvatar}
                          alt={proposal.clientName}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {proposal.clientName}
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColors[proposal.status]}-100 dark:bg-${statusColors[proposal.status]}-900/20 text-${statusColors[proposal.status]}-800 dark:text-${statusColors[proposal.status]}-300`}>
                      {statusIcons[proposal.status]}
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiDollarSign className="mr-1" />
                      <span>{proposal.budget}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiCalendar className="mr-1" />
                      <span>{proposal.proposalDate}</span>
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
                <FiFileText className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No proposals found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' 
                    ? "You haven't submitted any proposals yet" 
                    : `You have no ${filter} proposals`}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Proposal Details */}
        <div className="lg:col-span-2">
          {selectedProposal ? (
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
                      {selectedProposal.projectTitle}
                    </h2>
                    <div className="flex items-center">
                      <img
                        src={selectedProposal.clientAvatar}
                        alt={selectedProposal.clientName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedProposal.clientName}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProposal(selectedProposal)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                      <FiEdit2 />
                    </button>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${statusColors[selectedProposal.status]}-100 dark:bg-${statusColors[selectedProposal.status]}-900/20 text-${statusColors[selectedProposal.status]}-800 dark:text-${statusColors[selectedProposal.status]}-300`}>
                      {statusIcons[selectedProposal.status]}
                      {selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <motion.div
                    variants={detailVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Proposal Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Submitted:</span>
                        <span className="font-medium">{selectedProposal.proposalDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Budget:</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={editedProposal.budget}
                            onChange={(e) => setEditedProposal({...editedProposal, budget: e.target.value})}
                            className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                          />
                        ) : (
                          <span className="font-medium">{selectedProposal.budget}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Estimated Time:</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={editedProposal.estimatedTime}
                            onChange={(e) => setEditedProposal({...editedProposal, estimatedTime: e.target.value})}
                            className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                          />
                        ) : (
                          <span className="font-medium">{selectedProposal.estimatedTime}</span>
                        )}
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
                      {selectedProposal.attachments.map((file, index) => (
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
                  {editMode ? (
                    <textarea
                      value={editedProposal.coverLetter}
                      onChange={(e) => setEditedProposal({...editedProposal, coverLetter: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      rows="6"
                    />
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                      {selectedProposal.coverLetter}
                    </div>
                  )}
                </motion.div>
                
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end space-x-3"
                  >
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProposal}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Changes
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <FiFileText className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Select a proposal
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose a proposal from the list to view details and manage your submission
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposal;