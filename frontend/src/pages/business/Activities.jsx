import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiUsers, FiBriefcase, FiClock, FiCheckCircle, FiAlertCircle, FiPlus, FiSearch } from 'react-icons/fi';
import { FaRegDotCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for business activities
const dummyActivities = [
  {
    id: 1,
    title: 'Quarterly Strategy Meeting',
    type: 'meeting',
    date: '2023-06-15',
    time: '10:00 AM - 12:00 PM',
    participants: ['Management Team', 'Department Heads'],
    status: 'upcoming',
    description: 'Review Q2 performance and plan Q3 strategy with all department heads.'
  },
  {
    id: 2,
    title: 'Client Project Deadline',
    type: 'project',
    date: '2023-06-10',
    time: 'All Day',
    participants: ['Project Team', 'Client ABC'],
    status: 'ongoing',
    description: 'Final deliverables due for Client ABC project. Ensure all teams submit their components.'
  },
  {
    id: 3,
    title: 'Team Building Workshop',
    type: 'event',
    date: '2023-06-05',
    time: '9:00 AM - 4:00 PM',
    participants: ['All Employees'],
    status: 'completed',
    description: 'Annual team building activity at the mountain resort. Focus on collaboration exercises.'
  },
  {
    id: 4,
    title: 'Investor Pitch Presentation',
    type: 'presentation',
    date: '2023-05-28',
    time: '2:00 PM - 3:30 PM',
    participants: ['CEO', 'CFO', 'Potential Investors'],
    status: 'completed',
    description: 'Series B funding pitch to potential investors. Prepare financial projections and demo.'
  },
  {
    id: 5,
    title: 'Product Launch Webinar',
    type: 'webinar',
    date: '2023-05-20',
    time: '1:00 PM - 2:30 PM',
    participants: ['Marketing Team', 'Sales Team', 'Customers'],
    status: 'completed',
    description: 'Launch our new product line with live demo and Q&A session.'
  }
];

const statusColors = {
  upcoming: 'warning',
  ongoing: 'primary',
  completed: 'success'
};

const statusIcons = {
  upcoming: <FiClock className="mr-1" />,
  ongoing: <FaRegDotCircle className="mr-1" />,
  completed: <FiCheckCircle className="mr-1" />
};

const typeColors = {
  meeting: 'primary',
  project: 'secondary',
  event: 'accent',
  presentation: 'info',
  webinar: 'success'
};

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newActivityModal, setNewActivityModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'meeting',
    date: '',
    time: '',
    participants: [],
    status: 'upcoming',
    description: ''
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setActivities(dummyActivities);
      setIsLoading(false);
      toast.success('Activities loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.status === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddActivity = (e) => {
    e.preventDefault();
    const activityWithId = {
      ...newActivity,
      id: activities.length + 1,
      participants: newActivity.participants.split(',').map(p => p.trim())
    };
    setActivities([activityWithId, ...activities]);
    setNewActivityModal(false);
    setNewActivity({
      title: '',
      type: 'meeting',
      date: '',
      time: '',
      participants: [],
      status: 'upcoming',
      description: ''
    });
    toast.success('Activity added successfully!');
  };

  const handleStatusChange = (activityId, newStatus) => {
    setActivities(activities.map(activity => 
      activity.id === activityId ? { ...activity, status: newStatus } : activity
    ));
    toast.success('Activity status updated!');
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
        title="Business Activities"
        subtitle="Manage and track your company activities"
      />
      
      {/* Activity Filters and Search */}
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
              All Activities
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'upcoming' ? 'bg-warning-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'ongoing' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'completed' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Completed
            </button>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <button
            onClick={() => setNewActivityModal(true)}
            className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Activity
          </button>
        </div>
      </motion.div>
      
      {/* Activity Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <FiCalendar className="text-primary-500 text-3xl mx-auto mb-2" />
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Total Activities</h4>
            <p className="text-2xl font-bold">{activities.length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-warning-100 dark:bg-warning-900/20 flex items-center justify-center mx-auto mb-2">
              <FiClock className="text-warning-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Upcoming</h4>
            <p className="text-2xl font-bold">{activities.filter(a => a.status === 'upcoming').length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-2">
              <FaRegDotCircle className="text-primary-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Ongoing</h4>
            <p className="text-2xl font-bold">{activities.filter(a => a.status === 'ongoing').length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center mx-auto mb-2">
              <FiCheckCircle className="text-success-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Completed</h4>
            <p className="text-2xl font-bold">{activities.filter(a => a.status === 'completed').length}</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Activities List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredActivities.length > 0 ? (
              filteredActivities.map(activity => (
                <motion.div
                  key={activity.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedActivity(activity)}
                  className={`p-4 cursor-pointer transition-colors ${selectedActivity?.id === activity.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${typeColors[activity.type]}-100 dark:bg-${typeColors[activity.type]}-900/20 text-${typeColors[activity.type]}-800 dark:text-${typeColors[activity.type]}-300 mr-2`}>
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${statusColors[activity.status]}-100 dark:bg-${statusColors[activity.status]}-900/20 text-${statusColors[activity.status]}-800 dark:text-${statusColors[activity.status]}-300`}>
                          {statusIcons[activity.status]}
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiCalendar className="mr-1" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiClock className="mr-1" />
                      <span>{activity.time}</span>
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
                <FiCalendar className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No activities found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' 
                    ? "You don't have any activities yet" 
                    : `You have no ${filter} activities`}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Activity Details */}
        <div className="lg:col-span-2">
          {selectedActivity ? (
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
                      {selectedActivity.title}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-${typeColors[selectedActivity.type]}-100 dark:bg-${typeColors[selectedActivity.type]}-900/20 text-${typeColors[selectedActivity.type]}-800 dark:text-${typeColors[selectedActivity.type]}-300`}>
                        {selectedActivity.type.charAt(0).toUpperCase() + selectedActivity.type.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-${statusColors[selectedActivity.status]}-100 dark:bg-${statusColors[selectedActivity.status]}-900/20 text-${statusColors[selectedActivity.status]}-800 dark:text-${statusColors[selectedActivity.status]}-300`}>
                        {statusIcons[selectedActivity.status]}
                        {selectedActivity.status.charAt(0).toUpperCase() + selectedActivity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={selectedActivity.status}
                      onChange={(e) => handleStatusChange(selectedActivity.id, e.target.value)}
                      className={`text-sm rounded-md border-0 focus:ring-2 focus:ring-offset-2 bg-${statusColors[selectedActivity.status]}-100 dark:bg-${statusColors[selectedActivity.status]}-900/20 text-${statusColors[selectedActivity.status]}-800 dark:text-${statusColors[selectedActivity.status]}-300`}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    variants={detailVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Schedule
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Date:</span>
                        <span className="font-medium">{selectedActivity.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Time:</span>
                        <span className="font-medium">{selectedActivity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={detailVariants}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Participants
                    </h3>
                    <div className="space-y-2">
                      {selectedActivity.participants.map((participant, index) => (
                        <div key={index} className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                          <FiUsers className="mr-2" />
                          <span>{participant}</span>
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
                    Description
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                    {selectedActivity.description}
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
              <FiBriefcase className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Select an activity
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose an activity from the list to view details and manage it
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Add Activity Modal */}
      <AnimatePresence>
        {newActivityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Add New Activity</h3>
                  <button 
                    onClick={() => setNewActivityModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleAddActivity}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Type
                        </label>
                        <select
                          value={newActivity.type}
                          onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="meeting">Meeting</option>
                          <option value="project">Project</option>
                          <option value="event">Event</option>
                          <option value="presentation">Presentation</option>
                          <option value="webinar">Webinar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Status
                        </label>
                        <select
                          value={newActivity.status}
                          onChange={(e) => setNewActivity({...newActivity, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newActivity.date}
                          onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Time
                        </label>
                        <input
                          type="text"
                          value={newActivity.time}
                          onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                          placeholder="e.g. 2:00 PM - 3:30 PM"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Participants (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newActivity.participants}
                        onChange={(e) => setNewActivity({...newActivity, participants: e.target.value})}
                        placeholder="e.g. Management Team, Department Heads"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        rows="3"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      Add Activity
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

export default Activities;