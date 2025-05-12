import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiUsers, FiCheckCircle, FiTrendingUp, FiPlus } from 'react-icons/fi';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import PageTitle from '../../components/common/PageTitle';
import StatsCard from '../../components/common/StatsCard';
import { activities, proposals, businessChartData } from '../../utils/dummyData';
import { useAuth } from '../../context/AuthContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BusinessDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Dashboard data loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter activities for current business
  const businessActivities = activities.filter(activity => 
    activity.businessId === currentUser?.id || activity.businessId === 'u2' || activity.businessId === 'u6'
  );
  
  // Stats calculation
  const totalActivities = businessActivities.length;
  const ongoingActivities = businessActivities.filter(activity => activity.status === 'ongoing').length;
  const completedActivities = businessActivities.filter(activity => activity.status === 'completed').length;
  const upcomingActivities = businessActivities.filter(activity => activity.status === 'upcoming').length;
  
  // Calculate total responses to activities
  const totalResponses = businessActivities.reduce((sum, activity) => sum + activity.responses.length, 0);
  
  // Calculate total assigned freelancers
  const totalAssigned = businessActivities.reduce((sum, activity) => sum + activity.assignedTo.length, 0);
  
  // Chart options
  const activitiesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Activities Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const responsesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Responses by Activity',
      },
    },
  };
  
  return (
    <div>
      <PageTitle
        title="Business Dashboard"
        subtitle="Manage your activities and monitor freelancer responses"
        actions={
          <Link to="/business/activities" className="btn-primary">
            <FiPlus className="mr-2" /> New Activity
          </Link>
        }
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatsCard
            title="Total Activities"
            value={totalActivities}
            icon={<FiActivity size={20} className="text-primary-500" />}
            trend="up"
            trendValue="15%"
            color="primary"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatsCard
            title="Ongoing"
            value={ongoingActivities}
            icon={<FiTrendingUp size={20} className="text-accent-500" />}
            color="accent"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatsCard
            title="Freelancer Responses"
            value={totalResponses}
            icon={<FiUsers size={20} className="text-secondary-500" />}
            trend="up"
            trendValue="8%"
            color="secondary"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatsCard
            title="Completed"
            value={completedActivities}
            icon={<FiCheckCircle size={20} className="text-success-500" />}
            color="success"
          />
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">Activities Statistics</h3>
          <div className="h-80">
            <Bar options={activitiesOptions} data={businessChartData.activities} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">Responses Distribution</h3>
          <div className="h-80">
            <Doughnut options={responsesOptions} data={businessChartData.responses} />
          </div>
        </motion.div>
      </div>
      
      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Activities</h3>
          <Link to="/business/activities" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Responses
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {businessActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {activity.description.substring(0, 60)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      activity.status === 'upcoming' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300' : 
                      activity.status === 'ongoing' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300' : 
                      'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${activity.budget}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {activity.deadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <span className="bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-300 px-2 py-1 rounded text-xs font-semibold">
                        {activity.responses.length}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Activity Status Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-warning-100 dark:bg-warning-900/20 flex items-center justify-center mr-4">
              <FiActivity className="text-warning-500 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{upcomingActivities}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Activities</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mr-4">
              <FiTrendingUp className="text-primary-500 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ongoingActivities}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ongoing Activities</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center mr-4">
              <FiCheckCircle className="text-success-500 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{completedActivities}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed Activities</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessDashboard;