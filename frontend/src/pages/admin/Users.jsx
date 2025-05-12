import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiSearch, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';
import { users } from '../../utils/dummyData';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedUserType === 'all' || user.userType === selectedUserType;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDeleteUser = (userId) => {
    toast.success('User deleted successfully');
  };

  const handleStatusToggle = (userId) => {
    toast.success('User status updated successfully');
  };

  return (
    <div>
      <PageTitle
        title="User Management"
        subtitle="Manage platform users and their permissions"
        actions={
          <button className="btn-primary">
            <FiUserPlus className="mr-2" /> Add User
          </button>
        }
      />
      
      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <select
          value={selectedUserType}
          onChange={(e) => setSelectedUserType(e.target.value)}
          className="input-field"
        >
          <option value="all">All Types</option>
          <option value="admin">Admin</option>
          <option value="business">Business</option>
          <option value="freelancer">Freelancer</option>
          <option value="employee">Employee</option>
        </select>
        
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input-field"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </motion.div>
      
      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${user.userType === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                        user.userType === 'business' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                          user.userType === 'freelancer' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'}`}
                    >
                      {user.userType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      className={`px-2 py-1 inline-flex items-center text-xs rounded-full transition-colors
                        ${user.status === 'active'
                          ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300 hover:bg-success-200'
                          : 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300 hover:bg-error-200'
                        }`}
                    >
                      {user.status === 'active' ? <FiCheck className="mr-1" /> : <FiX className="mr-1" />}
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        onClick={() => toast.success('Edit user clicked')}
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        className="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Users;