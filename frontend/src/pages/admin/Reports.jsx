import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFilter, FiPieChart, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi';
import { Line, Bar, Pie } from 'react-chartjs-2';
import PageTitle from '../../components/common/PageTitle';
import StatsCard from '../../components/common/StatsCard';
import { adminChartData } from '../../utils/dummyData';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('revenue');
  
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 35000, 32000, 38000, 42000, 45000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };
  
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 150, 180, 250, 280, 300],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        fill: true,
      },
    ],
  };
  
  const projectStatusData = {
    labels: ['Completed', 'Ongoing', 'Cancelled'],
    datasets: [
      {
        data: [63, 25, 12],
        backgroundColor: ['#22c55e', '#3b82f6', '#ef4444'],
      },
    ],
  };

  return (
    <div>
      <PageTitle
        title="Reports & Analytics"
        subtitle="View detailed platform statistics and generate reports"
        actions={
          <button className="btn-primary">
            <FiDownload className="mr-2" /> Export Report
          </button>
        }
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatsCard
            title="Total Revenue"
            value="$245,000"
            icon={<FiDollarSign size={20} className="text-primary-500" />}
            trend="up"
            trendValue="12%"
            color="primary"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatsCard
            title="Active Users"
            value="1,234"
            icon={<FiUsers size={20} className="text-secondary-500" />}
            trend="up"
            trendValue="8%"
            color="secondary"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatsCard
            title="Projects"
            value="456"
            icon={<FiPieChart size={20} className="text-accent-500" />}
            trend="up"
            trendValue="15%"
            color="accent"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatsCard
            title="Growth Rate"
            value="25%"
            icon={<FiTrendingUp size={20} className="text-success-500" />}
            trend="up"
            trendValue="5%"
            color="success"
          />
        </motion.div>
      </div>
      
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap gap-4"
      >
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="input-field"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
        
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="input-field"
        >
          <option value="revenue">Revenue</option>
          <option value="users">User Growth</option>
          <option value="projects">Projects</option>
        </select>
        
        <button className="btn-outline">
          <FiFilter className="mr-2" /> More Filters
        </button>
      </motion.div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-80">
            <Line
              data={revenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-80">
            <Line
              data={userGrowthData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">Project Status Distribution</h3>
          <div className="h-80">
            <Pie
              data={projectStatusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4">User Type Distribution</h3>
          <div className="h-80">
            <Bar
              data={adminChartData.users}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;