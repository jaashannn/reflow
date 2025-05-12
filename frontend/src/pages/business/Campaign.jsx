import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBullhorn, FaFilter, FaChartLine, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import StatsCard from '../../components/common/StatsCard';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Expanded dummy data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: 'Summer Sale Blitz',
    type: 'business',
    status: 'ongoing',
    budget: 5000,
    progress: 60,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    targetAudience: 'Young adults (18-35), urban areas',
    channels: ['Social Media', 'Email', 'PPC'],
    kpis: { impressions: 100000, clicks: 5000, conversions: 500 },
    notes: 'Focus on Instagram and TikTok for maximum engagement.',
  },
  {
    id: 2,
    name: 'Product Launch Campaign',
    type: 'freelancer',
    status: 'upcoming',
    budget: 3000,
    progress: 10,
    startDate: '2025-07-15',
    endDate: '2025-09-15',
    targetAudience: 'Tech enthusiasts, global',
    channels: ['YouTube', 'Blogs', 'SEO'],
    kpis: { impressions: 50000, clicks: 2000, conversions: 200 },
    notes: 'Collaborate with tech influencers for reviews.',
  },
  {
    id: 3,
    name: 'Brand Awareness Drive',
    type: 'business',
    status: 'completed',
    budget: 7000,
    progress: 100,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    targetAudience: 'General public, all ages',
    channels: ['TV', 'Billboards', 'Social Media'],
    kpis: { impressions: 200000, clicks: 10000, conversions: 1000 },
    notes: 'Successful campaign, exceeded impression goals.',
  },
  {
    id: 4,
    name: 'Holiday Promo Fest',
    type: 'employee',
    status: 'ongoing',
    budget: 4000,
    progress: 45,
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    targetAudience: 'Families, suburban areas',
    channels: ['Email', 'Radio', 'Local Events'],
    kpis: { impressions: 80000, clicks: 4000, conversions: 400 },
    notes: 'Increase local event participation in December.',
  },
];

// Chart data
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Campaign Performance',
      data: [1200, 1900, 3000, 2500, 4000, 3500],
      borderColor: '#6366F1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#4F46E5',
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top', labels: { color: '#FFFFFF' } },
    title: { display: true, text: 'Campaign Performance Trend', color: '#FFFFFF', font: { size: 18 } },
  },
  scales: {
    x: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
    y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
  },
};

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      try {
        setCampaigns(mockCampaigns);
        setLoading(false);
      } catch (err) {
        setError('Failed to load campaigns. Please try again.');
        setLoading(false);
      }
    }, 1000);

    // Handle Escape key to close modal
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedCampaign(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      (filterStatus === 'all' || campaign.status === filterStatus) &&
      (filterType === 'all' || campaign.type === filterType)
  );

  const stats = [
    {
      title: 'Total Campaigns',
      value: campaigns.length,
      icon: <FaBullhorn className="text-primary-500" />,
      trend: 'up',
      trendValue: '5%',
      color: 'primary',
    },
    {
      title: 'Active',
      value: campaigns.filter((c) => c.status === 'ongoing').length,
      icon: <FaBullhorn className="text-primary-500" />,
      trend: 'down',
      trendValue: '3%',
      color: 'primary',
    },
    {
      title: 'Completed',
      value: campaigns.filter((c) => c.status === 'completed').length,
      icon: <FaBullhorn className="text-success-500" />,
      trend: 'up',
      trendValue: '8%',
      color: 'success',
    },
    {
      title: 'Revenue',
      value: `$${campaigns.reduce((sum, c) => sum + c.budget, 0)}`,
      icon: <FaBullhorn className="text-success-500" />,
      trend: 'up',
      trendValue: '10%',
      color: 'success',
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      ongoing: { bg: 'bg-primary-100 dark:bg-primary-900/20', dot: 'bg-primary-500', text: 'text-primary-800' },
      upcoming: { bg: 'bg-warning-100 dark:bg-warning-900/20', dot: 'bg-warning-500', text: 'text-warning-800' },
      completed: { bg: 'bg-success-100 dark:bg-success-900/20', dot: 'bg-success-500', text: 'text-success-800' },
    };
    return styles[status] || styles.ongoing;
  };

  const getUserTypeBadge = (type) => {
    const styles = {
      admin: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-800' },
      business: { bg: 'bg-secondary-100 dark:bg-secondary-900/20', text: 'text-secondary-800' },
      freelancer: { bg: 'bg-accent-100 dark:bg-accent-900/20', text: 'text-accent-800' },
      employee: { bg: 'bg-primary-100 dark:bg-primary-900/20', text: 'text-primary-800' },
    };
    return styles[type] || styles.employee;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-error-500 mb-4">Server Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Campaign Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
            color={stat.color}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex items-center">
          <FaFilter className="text-primary-500 mr-2" aria-hidden="true" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center">
          <FaFilter className="text-primary-500 mr-2" aria-hidden="true" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 rounded-md bg-mobile-first bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            <option value="business">Business</option>
            <option value="freelancer">Freelancer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Budget</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Progress</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600 dark:text-gray-400">
                    Loading campaigns...
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600 dark:text-gray-400">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <motion.tr
                    key={campaign.id}
                    className="border-t dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="p-4 text-gray-900 dark:text-white">{campaign.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getUserTypeBadge(campaign.type).bg} ${
                          getUserTypeBadge(campaign.type).text
                        }`}
                      >
                        {campaign.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadge(campaign.status).bg} ${
                          getStatusBadge(campaign.status).text
                        } flex items-center`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(campaign.status).dot}`}
                          aria-hidden="true"
                        ></span>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white">${campaign.budget}</td>
                    <td className="p-4 text-gray-900 dark:text-white">{campaign.progress}%</td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-primary-500 hover:text-primary-600 transition"
                        aria-label={`View details for ${campaign.name}`}
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="flex items-center mb-4">
          <FaChartLine className="text-primary-500 mr-2" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trend</h2>
        </div>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-labelledby="campaign-modal-title"
            aria-modal="true"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 id="campaign-modal-title" className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedCampaign.name}
                  </h2>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close modal"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Type</h3>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${getUserTypeBadge(selectedCampaign.type).bg} ${
                        getUserTypeBadge(selectedCampaign.type).text
                      }`}
                    >
                      {selectedCampaign.type}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Status</h3>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusBadge(selectedCampaign.status).bg} ${
                        getStatusBadge(selectedCampaign.status).text
                      } flex items-center`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(selectedCampaign.status).dot}`}
                        aria-hidden="true"
                      ></span>
                      {selectedCampaign.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Budget</h3>
                    <p className="text-gray-600 dark:text-gray-400">${selectedCampaign.budget}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Progress</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedCampaign.progress}%</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Duration</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedCampaign.startDate} to {selectedCampaign.endDate}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Target Audience</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedCampaign.targetAudience}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Channels</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedCampaign.channels.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Key Performance Indicators</h3>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                      <li>Impressions: {selectedCampaign.kpis.impressions.toLocaleString()}</li>
                      <li>Clicks: {selectedCampaign.kpis.clicks.toLocaleString()}</li>
                      <li>Conversions: {selectedCampaign.kpis.conversions.toLocaleString()}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notes</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedCampaign.notes}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Campaign;