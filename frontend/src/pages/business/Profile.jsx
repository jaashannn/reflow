import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiUsers, FiDollarSign, FiMapPin, FiGlobe, FiPhone, FiMail, FiEdit2, FiSave } from 'react-icons/fi';
import { FaRegBuilding, FaRegChartBar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for business profile
const dummyBusinessProfile = {
  name: 'TechSolutions Inc.',
  industry: 'Information Technology',
  logo: 'https://logo.clearbit.com/techsolutions.com',
  founded: '2015',
  employees: '50-100',
  revenue: '$5M - $10M',
  location: 'San Francisco, CA',
  website: 'techsolutions.com',
  phone: '+1 (415) 555-0198',
  email: 'contact@techsolutions.com',
  description: 'We provide innovative software solutions for enterprises, specializing in cloud computing, AI integration, and digital transformation. Our team of experts delivers cutting-edge technology tailored to your business needs.',
  services: [
    'Enterprise Software Development',
    'Cloud Migration',
    'AI Integration',
    'Data Analytics',
    'IT Consulting'
  ],
  clients: [
    { name: 'Fortune 500 Companies', count: 12 },
    { name: 'Mid-Size Businesses', count: 45 },
    { name: 'Startups', count: 28 }
  ],
  projectsCompleted: 85,
  satisfactionRate: 94
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [newService, setNewService] = useState('');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProfile(dummyBusinessProfile);
      setEditedProfile(dummyBusinessProfile);
      setIsLoading(false);
      toast.success('Profile loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  const handleAddService = () => {
    if (newService.trim() && !editedProfile.services.includes(newService)) {
      setEditedProfile({
        ...editedProfile,
        services: [...editedProfile.services, newService]
      });
      setNewService('');
      toast.success('Service added!');
    }
  };

  const handleRemoveService = (service) => {
    setEditedProfile({
      ...editedProfile,
      services: editedProfile.services.filter(s => s !== service)
    });
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
        title="Business Profile"
        subtitle="Manage your company information"
      />
      
      {/* Business Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={cardVariants} className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center">
            <img
              src={profile.logo}
              alt={profile.name}
              className="w-32 h-32 rounded-lg object-contain mb-4 border border-gray-200 dark:border-gray-700"
            />
            {editMode ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="text-xl font-bold text-center mb-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
              />
            ) : (
              <h2 className="text-xl font-bold text-center mb-1">{profile.name}</h2>
            )}
            {editMode ? (
              <input
                type="text"
                value={editedProfile.industry}
                onChange={(e) => setEditedProfile({...editedProfile, industry: e.target.value})}
                className="text-gray-600 dark:text-gray-300 text-center mb-4 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{profile.industry}</p>
            )}
            
            <div className="flex space-x-2">
              <button
                onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                className={`flex items-center px-4 py-2 rounded-lg ${editMode ? 'bg-success-500 hover:bg-success-600 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'}`}
              >
                {editMode ? <FiSave className="mr-2" /> : <FiEdit2 className="mr-2" />}
                {editMode ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants} className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaRegBuilding className="mr-2 text-primary-500" />
                  Company Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiBriefcase className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="text"
                        value={editedProfile.founded}
                        onChange={(e) => setEditedProfile({...editedProfile, founded: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                        placeholder="Year founded"
                      />
                    ) : (
                      <span>Founded in {profile.founded}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="text"
                        value={editedProfile.employees}
                        onChange={(e) => setEditedProfile({...editedProfile, employees: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                        placeholder="Employee count"
                      />
                    ) : (
                      <span>{profile.employees} employees</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="text"
                        value={editedProfile.revenue}
                        onChange={(e) => setEditedProfile({...editedProfile, revenue: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                        placeholder="Annual revenue"
                      />
                    ) : (
                      <span>{profile.revenue} annual revenue</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiMapPin className="mr-2 text-primary-500" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiGlobe className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="text"
                        value={editedProfile.website}
                        onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                      />
                    ) : (
                      <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                        {profile.website}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="text"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              {editMode ? (
                <textarea
                  value={editedProfile.description}
                  onChange={(e) => setEditedProfile({...editedProfile, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{profile.description}</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Services & Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            {editMode && (
              <button 
                onClick={() => document.getElementById('serviceModal').showModal()}
                className="text-sm text-primary-500 hover:text-primary-700"
              >
                + Add Service
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {editedProfile.services?.map((service, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                <span className="font-medium">{service}</span>
                {editMode && (
                  <button 
                    onClick={() => handleRemoveService(service)}
                    className="text-error-500 hover:text-error-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4">Client Base</h3>
          
          <div className="space-y-4">
            {profile.clients.map((client, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{client.name}</span>
                <span className="text-gray-600 dark:text-gray-300">{client.count} clients</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Business Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mr-4">
              <FaRegChartBar className="text-primary-500 text-xl" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</h3>
              <p className="text-2xl font-bold">{profile.projectsCompleted}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/20 mr-4">
              <FiUsers className="text-success-500 text-xl" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</h3>
              <p className="text-2xl font-bold">{profile.satisfactionRate}%</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Add Service Modal */}
      <dialog id="serviceModal" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Add New Service</h3>
          <div className="flex">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Service name"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddService}
              className="px-4 py-2 bg-primary-500 text-white rounded-r-md hover:bg-primary-600"
            >
              Add
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Profile;