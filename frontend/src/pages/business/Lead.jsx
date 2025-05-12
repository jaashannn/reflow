import React, { useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiMessageSquare } from 'react-icons/fi';

const Lead = () => {
  // Dummy data
  const initialLeads = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      value: 12500,
      status: 'new',
      priority: 'high',
      source: 'Website',
      freelancer: 'Alex Rivera',
      services: ['Web Development', 'UI/UX Design'],
      meetingTime: '2023-06-15T14:30:00',
      location: 'San Francisco, CA',
      notes: 'Interested in revamping their e-commerce platform. Wants to discuss timeline and budget.',
      createdAt: '2023-06-10',
      expanded: false
    },
    {
      id: 2,
      name: 'GreenSolutions LLC',
      value: 8500,
      status: 'contacted',
      priority: 'medium',
      source: 'Referral',
      freelancer: 'Jamie Smith',
      services: ['SEO Optimization', 'Content Marketing'],
      meetingTime: '2023-06-18T10:00:00',
      location: 'Remote',
      notes: 'Looking to improve organic search traffic. Already has basic SEO setup.',
      createdAt: '2023-06-05',
      expanded: false
    },
    {
      id: 3,
      name: 'Wilson & Associates',
      value: 20000,
      status: 'qualified',
      priority: 'high',
      source: 'Conference',
      freelancer: 'Taylor Brown',
      services: ['Custom Software', 'Database Integration'],
      meetingTime: '2023-06-20T13:15:00',
      location: 'New York, NY',
      notes: 'Needs case management system for law firm. Must comply with legal data standards.',
      createdAt: '2023-05-28',
      expanded: false
    },
    {
      id: 4,
      name: 'UrbanEats',
      value: 6500,
      status: 'lost',
      priority: 'low',
      source: 'Social Media',
      freelancer: 'Jordan Lee',
      services: ['Mobile App Development'],
      meetingTime: null,
      location: 'Chicago, IL',
      notes: 'Wanted food delivery app but went with competitor due to pricing.',
      createdAt: '2023-05-20',
      expanded: false
    }
  ];

  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    freelancer: 'all',
    priority: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Status color mapping
  const statusColors = {
    new: 'bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200',
    contacted: 'bg-secondary-100 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-200',
    qualified: 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200',
    lost: 'bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-200'
  };

  // Priority color mapping
  const priorityColors = {
    high: 'text-error-500',
    medium: 'text-warning-500',
    low: 'text-success-500'
  };

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.freelancer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.services.some(service => 
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = filters.status === 'all' || lead.status === filters.status;
    const matchesFreelancer = filters.freelancer === 'all' || lead.freelancer === filters.freelancer;
    const matchesPriority = filters.priority === 'all' || lead.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesFreelancer && matchesPriority;
  });

  // Get unique freelancers for filter dropdown
  const freelancers = ['all', ...new Set(leads.map(lead => lead.freelancer))];

  // Update lead status
  const updateStatus = (id, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    ));
  };

  // Toggle expanded view
  const toggleExpand = (id) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, expanded: !lead.expanded } : lead
    ));
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header and Search */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lead Management</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search leads by company, freelancer, or services..."
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
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Freelancer</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.freelancer}
                    onChange={(e) => setFilters({...filters, freelancer: e.target.value})}
                  >
                    {freelancers.map(freelancer => (
                      <option key={freelancer} value={freelancer}>
                        {freelancer === 'all' ? 'All Freelancers' : freelancer}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.priority}
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Freelancer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Services
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <React.Fragment key={lead.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">${lead.value.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[lead.status]}`}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{lead.freelancer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {lead.services.slice(0, 2).map((service, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                              {service}
                            </span>
                          ))}
                          {lead.services.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                              +{lead.services.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleExpand(lead.id)}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                          >
                            {lead.expanded ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                          <button className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-300">
                            <FiMessageSquare />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {lead.expanded && (
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td colSpan="6" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Details</h4>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Source:</span> {lead.source}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Priority:</span> 
                                  <span className={`ml-1 ${priorityColors[lead.priority]}`}>
                                    {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                                  </span>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Meeting:</span> {formatDate(lead.meetingTime)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Location:</span> {lead.location}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{lead.notes}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button 
                              onClick={() => updateStatus(lead.id, 'contacted')}
                              className="px-3 py-1 bg-secondary-500 hover:bg-secondary-600 text-white rounded text-xs transition-colors"
                            >
                              Mark as Contacted
                            </button>
                            <button 
                              onClick={() => updateStatus(lead.id, 'qualified')}
                              className="px-3 py-1 bg-success-500 hover:bg-success-600 text-white rounded text-xs transition-colors"
                            >
                              Qualify Lead
                            </button>
                            <button 
                              onClick={() => updateStatus(lead.id, 'lost')}
                              className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-xs transition-colors"
                            >
                              Mark as Lost
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="text-gray-500 dark:text-gray-400 py-8">
                      No leads found matching your criteria
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

export default Lead;