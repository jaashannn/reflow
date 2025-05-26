import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiFileText, FiDollarSign, FiTrendingUp, FiBriefcase } from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import PageTitle from '../../components/common/PageTitle';
import StatsCard from '../../components/common/StatsCard';
import { activities, proposals, earnings, freelancerChartData } from '../../utils/dummyData';
import { useAuth } from '../../context/AuthContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FreelancerDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Simulate a fake request that fails
    const fetchData = async () => {
      try {
        // Simulate a failed API call by throwing an error
        throw new Error('Failed to fetch dashboard data');
        setIsLoading(false);
        toast.success('Dashboard data loaded successfully!');
      } catch (error) {
        // Instead of handling the error gracefully, throw it to crash the component
        throw new Error('Critical error: Unable to load dashboard');
      }
    };
    
    fetchData();
    
    // No cleanup needed for this case
  }, []);
  
  // The rest of the component will not render due to the error being thrown
  
  // Filter proposals for current freelancer
  const freelancerProposals = proposals.filter(proposal => 
    proposal.freelancerId === currentUser?.id || proposal.freelancerId === 'u3' || proposal.freelancerId === 'u5'
  );
  
  // Filter earnings for current freelancer
  const freelancerEarnings = earnings.filter(earning => 
    earning.freelancerId === currentUser?.id || earning.freelancerId === 'u3' || earning.freelancerId === 'u5'
  );
  
  // Stats calculation
  const totalProposals = freelancerProposals.length;
  const acceptedProposals = freelancerProposals.filter(proposal => proposal.status === 'accepted').length;
  const pendingProposals = freelancerProposals.filter(proposal => proposal.status === 'pending').length;
  
  // Calculate total earnings
  const totalEarned = freelancerEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  
  // Chart options
  const earningsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Earnings Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const proposalsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Proposal Status',
      },
    },
  };
  
  // Available activities (excluding ones already applied to)
  const appliedActivityIds = freelancerProposals.map(proposal => proposal.activityId);
  const availableActivities = activities.filter(activity => 
    !appliedActivityIds.includes(activity.id) && activity.status !== 'completed'
  );
  
  return (
    <div>
      <PageTitle
        title="Freelancer Dashboard"
        subtitle="Monitor your proposals, projects, and earnings"
        actions={
          <Link to="/freelancer/projects" className="btn-primary">
            <FiBriefcase className="mr-2" /> Find Projects
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
            title="Total Proposals"
            value={totalProposals}
            icon={<FiFileText size={20} className="text-primary-500" />}
            trend="up"
            trendValue="20%"
            color="primary"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatsCard
            title="Active Projects"
            value={acceptedProposals}
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
            title="Pending Proposals"
            value={pendingProposals}
            icon={<FiClock size={20} className="text-warning-500" />}
            color="warning"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatsCard
            title="Total Earnings"
            value={`$${totalEarned}`}
            icon={<FiDollarSign size={20} className="text-success-500" />}
            trend="up"
            trendValue="15%"
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
          <h3 className="text-lg font-semibold mb-4">Earnings Trend</h3>
          <div className="h-80">
            <Line options={earningsOptions} data={freelancerChartData.earnings} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">Proposal Status</h3>
          <div className="h-80">
            <Doughnut options={proposalsOptions} data={freelancerChartData.proposals} />
          </div>
        </motion.div>
      </div>
      
      {/* Recent Proposals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Proposals</h3>
          <Link to="/freelancer/proposals" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {freelancerProposals.map((proposal) => {
                const activity = activities.find(a => a.id === proposal.activityId);
                return (
                  <tr key={proposal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity?.title || 'Unknown Project'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {activity?.description.substring(0, 60) || '...'}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        proposal.status === 'pending' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300' : 
                        proposal.status === 'accepted' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300' : 
                        'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300'
                      }`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${proposal.proposedBudget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {proposal.submittedAt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Available Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Available Projects</h3>
          <Link to="/freelancer/projects" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Browse All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableActivities.slice(0, 4).map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  activity.status === 'upcoming' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300' : 
                  'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                }`}>
                  {activity.status}
                </span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {activity.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${activity.budget}
                </span>
                <Link
                  to={`/freelancer/projects?id=${activity.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FreelancerDashboard;