import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiUser, FiDollarSign, FiActivity } from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import toast from 'react-hot-toast';

import PageTitle from '../../components/common/PageTitle';
import StatsCard from '../../components/common/StatsCard';
import { users, activities, adminChartData } from '../../utils/dummyData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Dashboard data loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Stats calculation
  const totalUsers = users.length;
  const totalBusinesses = users.filter(user => user.userType === 'business').length;
  const totalFreelancers = users.filter(user => user.userType === 'freelancer').length;
  const totalEmployees = users.filter(user => user.userType === 'employee').length;
  
  // Activities data
  const totalActivities = activities.length;
  const ongoingActivities = activities.filter(activity => activity.status === 'ongoing').length;
  const upcomingActivities = activities.filter(activity => activity.status === 'upcoming').length;
  const completedActivities = activities.filter(activity => activity.status === 'completed').length;
  
  // Chart options
  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const usersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Growth by Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const activitiesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Activities Status',
      },
    },
  };
  
  // Card animation variants
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

  return (
    <div>
      <PageTitle
        title="Admin Dashboard"
        subtitle="Overview of the platform performance and metrics"
      />
      
      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={cardVariants}>
          <StatsCard
            title="Total Users"
            value={totalUsers}
            icon={<FiUsers size={20} className="text-primary-500" />}
            trend="up"
            trendValue="12%"
            color="primary"
          />
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <StatsCard
            title="Businesses"
            value={totalBusinesses}
            icon={<FiBriefcase size={20} className="text-secondary-500" />}
            trend="up"
            trendValue="8%"
            color="secondary"
          />
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <StatsCard
            title="Freelancers"
            value={totalFreelancers}
            icon={<FiUser size={20} className="text-accent-500" />}
            trend="up"
            trendValue="15%"
            color="accent"
          />
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <StatsCard
            title="Revenue"
            value="$24,500"
            icon={<FiDollarSign size={20} className="text-success-500" />}
            trend="up"
            trendValue="10%"
            color="success"
          />
        </motion.div>
      </motion.div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-80">
            <Line options={revenueOptions} data={adminChartData.revenue} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-80">
            <Bar options={usersOptions} data={adminChartData.users} />
          </div>
        </motion.div>
      </div>
      
      {/* Activities Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">Activities Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <FiActivity className="text-primary-500 text-3xl mx-auto mb-2" />
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Total Activities</h4>
            <p className="text-2xl font-bold">{totalActivities}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-warning-100 dark:bg-warning-900/20 flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 rounded-full bg-warning-500"></div>
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Upcoming</h4>
            <p className="text-2xl font-bold">{upcomingActivities}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 rounded-full bg-primary-500"></div>
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Ongoing</h4>
            <p className="text-2xl font-bold">{ongoingActivities}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 rounded-full bg-success-500"></div>
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Completed</h4>
            <p className="text-2xl font-bold">{completedActivities}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.slice(0, 5).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${user.userType === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' : 
                        user.userType === 'business' ? 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-300' : 
                          user.userType === 'freelancer' ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/20 dark:text-accent-300' : 
                            'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'}`}
                    >
                      {user.userType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300' : 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;