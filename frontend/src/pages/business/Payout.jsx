import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDollarSign, FiCalendar, FiUser, FiChevronDown, FiChevronUp, FiDownload,FiClock  } from 'react-icons/fi';

const Payout = () => {
  // Dummy payout data
  const initialPayouts = [
    {
      id: 1,
      freelancer: 'Alex Rivera',
      amount: 1250,
      status: 'completed',
      method: 'Bank Transfer',
      date: '2023-06-15',
      invoice: 'INV-2023-001',
      services: ['Web Development', 'UI/UX Design'],
      notes: 'Project completion payout for TechCorp Inc.',
      expanded: false
    },
    {
      id: 2,
      freelancer: 'Jamie Smith',
      amount: 850,
      status: 'processing',
      method: 'PayPal',
      date: '2023-06-18',
      invoice: 'INV-2023-002',
      services: ['SEO Optimization'],
      notes: 'Monthly SEO services for GreenSolutions LLC',
      expanded: false
    },
    {
      id: 3,
      freelancer: 'Taylor Brown',
      amount: 2000,
      status: 'pending',
      method: 'Bank Transfer',
      date: '2023-06-20',
      invoice: 'INV-2023-003',
      services: ['Custom Software'],
      notes: 'Initial deposit for Wilson & Associates project',
      expanded: false
    },
    {
      id: 4,
      freelancer: 'Jordan Lee',
      amount: 650,
      status: 'failed',
      method: 'PayPal',
      date: '2023-06-22',
      invoice: 'INV-2023-004',
      services: ['Mobile App Development'],
      notes: 'Payment failed due to insufficient funds',
      expanded: false
    }
  ];

  const [payouts, setPayouts] = useState(initialPayouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    method: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Status color mapping
  const statusColors = {
    completed: 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200',
    processing: 'bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200',
    pending: 'bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-200',
    failed: 'bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-200'
  };

  // Filter payouts based on search and filters
  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.freelancer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.services.some(service => 
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = filters.status === 'all' || payout.status === filters.status;
    const matchesMethod = filters.method === 'all' || payout.method === filters.method;
    const matchesDate = filters.dateRange === 'all' || 
      (filters.dateRange === 'this-month' && new Date(payout.date).getMonth() === new Date().getMonth()) ||
      (filters.dateRange === 'last-month' && new Date(payout.date).getMonth() === new Date().getMonth() - 1);

    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  // Get unique methods for filter dropdown
  const methods = ['all', ...new Set(payouts.map(payout => payout.method))];

  // Toggle expanded view
  const toggleExpand = (id) => {
    setPayouts(payouts.map(payout => 
      payout.id === id ? { ...payout, expanded: !payout.expanded } : payout
    ));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate totals
  const totalCompleted = payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payouts
    .filter(p => p.status === 'pending' || p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header and Stats */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payout Management</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 mr-4">
                  <FiDollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Paid</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalCompleted.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900/20 text-warning-500 mr-4">
                  <FiClock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payouts</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalPending.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/20 text-success-500 mr-4">
                  <FiUser className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Freelancers</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {[...new Set(payouts.map(p => p.freelancer))].length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search payouts by freelancer, invoice, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Method</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.method}
                    onChange={(e) => setFilters({...filters, method: e.target.value})}
                  >
                    {methods.map(method => (
                      <option key={method} value={method}>
                        {method === 'all' ? 'All Methods' : method}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  >
                    <option value="all">All Time</option>
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payouts Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Freelancer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Invoice
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPayouts.length > 0 ? (
                filteredPayouts.map((payout) => (
                  <React.Fragment key={payout.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-500">
                            <FiUser className="w-5 h-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{payout.freelancer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">${payout.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[payout.status]}`}>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{payout.method}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{formatDate(payout.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{payout.invoice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleExpand(payout.id)}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                          >
                            {payout.expanded ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                          <button className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-300">
                            <FiDownload />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {payout.expanded && (
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services</h4>
                              <div className="flex flex-wrap gap-2">
                                {payout.services.map((service, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{payout.notes}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="text-gray-500 dark:text-gray-400 py-8">
                      No payouts found matching your criteria
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payout;