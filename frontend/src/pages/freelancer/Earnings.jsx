import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiCreditCard, FiPieChart, FiCalendar } from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
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
import PageTitle from '../../components/common/PageTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for earnings
const dummyEarnings = {
  balance: 4280.50,
  pending: 1250.00,
  lifetimeEarnings: 18975.25,
  transactions: [
    {
      id: 1,
      project: 'E-commerce Website',
      client: 'ABC Corp',
      date: '2023-06-15',
      amount: 2500.00,
      status: 'completed',
      type: 'project'
    },
    {
      id: 2,
      project: 'Mobile App Design',
      client: 'XYZ Startup',
      date: '2023-06-10',
      amount: 1250.00,
      status: 'pending',
      type: 'project'
    },
    {
      id: 3,
      project: 'SEO Optimization',
      client: 'Global Services',
      date: '2023-06-05',
      amount: 800.00,
      status: 'completed',
      type: 'project'
    },
    {
      id: 4,
      description: 'Withdrawal to Bank',
      date: '2023-06-01',
      amount: -1500.00,
      status: 'completed',
      type: 'withdrawal'
    },
    {
      id: 5,
      project: 'Database Migration',
      client: 'Tech Solutions',
      date: '2023-05-28',
      amount: 1800.00,
      status: 'completed',
      type: 'project'
    },
  ],
  monthlyEarnings: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1850, 2100, 1750, 3200, 2500]
  },
  earningsByCategory: {
    labels: ['Web Development', 'Mobile App', 'UI/UX Design', 'SEO', 'Consulting'],
    data: [45, 20, 15, 12, 8]
  }
};

const Earnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setEarnings(dummyEarnings);
      setIsLoading(false);
      toast.success('Earnings data loaded!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Chart options and data
  const earningsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Earnings',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  const earningsChartData = {
    labels: earnings?.monthlyEarnings.labels,
    datasets: [
      {
        label: 'Earnings',
        data: earnings?.monthlyEarnings.data,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Earnings by Category',
      },
    },
  };

  const categoryChartData = {
    labels: earnings?.earningsByCategory.labels,
    datasets: [
      {
        data: earnings?.earningsByCategory.data,
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(20, 184, 166, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1,
      },
    ],
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
        title="Earnings"
        subtitle="Track your income and financial performance"
      />
      
      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mr-4">
                <FiDollarSign className="text-primary-500 text-xl" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Available Balance</h3>
                <p className="text-2xl font-bold">${earnings.balance.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                Withdraw Funds
              </button>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900/20 mr-4">
                <FiTrendingUp className="text-warning-500 text-xl" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Pending Clearance</h3>
                <p className="text-2xl font-bold">${earnings.pending.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Will be available in 5-7 days
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/20 mr-4">
                <FiCreditCard className="text-success-500 text-xl" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Lifetime Earnings</h3>
                <p className="text-2xl font-bold">${earnings.lifetimeEarnings.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Since joining the platform
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Earnings Overview</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 dark:bg-gray-700"
            >
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
            </select>
          </div>
          <div className="h-64">
            <Bar options={earningsChartOptions} data={earningsChartData} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4">Earnings Distribution</h3>
          <div className="h-64">
            <Pie options={categoryChartOptions} data={categoryChartData} />
          </div>
        </motion.div>
      </div>
      
      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Transaction History</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
          {earnings.transactions.map(transaction => (
            <motion.div
              key={transaction.id}
              whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
              className="p-4 cursor-pointer"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${
                    transaction.amount > 0 
                      ? 'bg-success-100 dark:bg-success-900/20' 
                      : 'bg-error-100 dark:bg-error-900/20'
                  }`}>
                    {transaction.amount > 0 ? (
                      <FiTrendingUp className="text-success-500 text-xl" />
                    ) : (
                      <FiTrendingDown className="text-error-500 text-xl" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {transaction.type === 'project' ? transaction.project : transaction.description}
                    </h4>
                    {transaction.type === 'project' && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.client}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.amount > 0 
                      ? 'text-success-500' 
                      : 'text-error-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Transaction Details</h3>
                  <button 
                    onClick={() => setSelectedTransaction(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {selectedTransaction.type === 'project' ? 'Project' : 'Description'}
                    </h4>
                    <p className="font-medium">
                      {selectedTransaction.type === 'project' 
                        ? selectedTransaction.project 
                        : selectedTransaction.description}
                    </p>
                  </div>
                  
                  {selectedTransaction.type === 'project' && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Client
                      </h4>
                      <p className="font-medium">{selectedTransaction.client}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Amount
                      </h4>
                      <p className={`font-medium ${
                        selectedTransaction.amount > 0 
                          ? 'text-success-500' 
                          : 'text-error-500'
                      }`}>
                        ${Math.abs(selectedTransaction.amount).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Date
                      </h4>
                      <p className="font-medium">{selectedTransaction.date}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Status
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedTransaction.status === 'completed' 
                        ? 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-300'
                        : 'bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-300'
                    }`}>
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </span>
                  </div>
                  
                  {selectedTransaction.type === 'withdrawal' && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Withdrawal Details
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-sm">
                          Processed to your bank account ending in ••••1234
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Earnings;