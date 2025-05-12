import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut, FiSettings, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'New project proposal received', time: '2 minutes ago', read: false },
    { id: 2, message: 'Your task status was updated', time: '1 hour ago', read: false },
    { id: 3, message: 'Payment of $250 was received', time: '5 hours ago', read: true },
    { id: 4, message: 'Profile verification completed', time: '1 day ago', read: true },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
    toast.success(`${darkMode ? 'Light' : 'Dark'} mode activated!`);
  };

  // Check system preference for dark mode
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
          
          <div className={`relative ml-4 ${sidebarOpen ? 'md:ml-0' : 'md:ml-4'}`}>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <FiSearch className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none ml-2 focus:outline-none text-gray-700 dark:text-gray-200 w-full max-w-xs"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <FiBell size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-2 ${
                            notification.read ? 'border-transparent' : 'border-primary-500'
                          }`}
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        No notifications yet
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="#"
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline block text-center"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={currentUser?.avatar || `https://ui-avatars.com/api/?name=User&background=random&color=fff`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {currentUser?.name || 'User'}
              </span>
            </button>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                  </div>
                  
                  <Link
                    to={`/${currentUser?.userType}/profile`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-2" size={16} />
                      Profile
                    </div>
                  </Link>
                  
                  <Link
                    to={`/${currentUser?.userType}/settings`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <FiSettings className="mr-2" size={16} />
                      Settings
                    </div>
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-2" size={16} />
                      Logout
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;