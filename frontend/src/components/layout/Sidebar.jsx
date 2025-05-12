import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, FiUsers, FiFileText, FiSettings, FiActivity, 
  FiMessageCircle, FiUser, FiDollarSign, FiList, 
  FiBell, FiCheckSquare, FiBarChart2, FiX,FiAperture, FiCommand, FiArchive,FiHelpCircle
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const navItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const Sidebar = ({ userType, closeSidebar }) => {
  const { currentUser } = useAuth();
  
  // Navigation links based on user type
  const getNavLinks = () => {
    switch (userType) {
      case 'admin':
        return [
          { to: '/admin', icon: <FiHome size={20} />, label: 'Dashboard' },
          { to: '/admin/users', icon: <FiUsers size={20} />, label: 'Users' },
          { to: '/admin/tasks', icon: <FiCheckSquare size={20} />, label: 'Tasks' },
          { to: '/admin/reports', icon: <FiBarChart2 size={20} />, label: 'Reports' },
          { to: '/admin/settings', icon: <FiSettings size={20} />, label: 'Settings' },
        ];
      case 'business':
        return [
          { to: '/business', icon: <FiHome size={20} />, label: 'Dashboard' },
          { to: '/business/activities', icon: <FiActivity size={20} />, label: 'Activities' },
          { to: '/business/leads', icon: <FiAperture size={20} />, label: 'Leads' },
          { to: '/business/announcements', icon: <FiBell size={20} />, label: 'Announcements' },
          { to: '/business/campaign', icon: <FiCommand size={20} />, label: 'campaign' },
          { to: '/business/tasks', icon: <FiFileText size={20} />, label: 'Tasks' },
          { to: '/business/responses', icon: <FiList size={20} />, label: 'Responses' },
          { to: '/business/freelancers', icon: <FiUsers size={20} />, label: 'Freelancers' },
          { to: '/business/chat', icon: <FiMessageCircle size={20} />, label: 'Chat' },
          { to: '/business/profile', icon: <FiUser size={20} />, label: 'Profile' },
          { to: '/business/payout', icon: <FiArchive size={20} />, label: 'Payout' },
        ];
      case 'freelancer':
        return [
          { to: '/freelancer', icon: <FiHome size={20} />, label: 'Dashboard' },
          { to: '/freelancer/businesses', icon: <FiCheckSquare size={20} />, label: 'businesses' },
          { to: '/freelancer/projects', icon: <FiList size={20} />, label: 'Projects' },
          { to: '/freelancer/proposals', icon: <FiFileText size={20} />, label: 'Proposals' },
          { to: '/freelancer/earnings', icon: <FiDollarSign size={20} />, label: 'Earnings' },
          { to: '/freelancer/training', icon: <FiHelpCircle size={20} />, label: 'Training' },
          { to: '/freelancer/chat', icon: <FiMessageCircle size={20} />, label: 'Chat' },
          { to: '/freelancer/profile', icon: <FiUser size={20} />, label: 'Profile' },
        ];
      case 'employee':
        return [
          { to: '/employee', icon: <FiHome size={20} />, label: 'Dashboard' },
          { to: '/employee/tasks', icon: <FiCheckSquare size={20} />, label: 'Tasks' },
          { to: '/employee/announcements', icon: <FiBell size={20} />, label: 'Announcements' },
          { to: '/employee/chat', icon: <FiMessageCircle size={20} />, label: 'Chat' },
          { to: '/employee/reports', icon: <FiFileText size={20} />, label: 'Reports' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          {userType === 'admin' ? 'Admin Portal' :
           userType === 'business' ? 'Business Portal' :
           userType === 'freelancer' ? 'Freelancer Portal' : 'Employee Portal'}
        </h1>
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={closeSidebar}
        >
          <FiX size={24} />
        </button>
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <div className="px-4 py-6">
          <motion.nav 
            initial="closed"
            animate="open"
            variants={navVariants}
          >
            <ul className="space-y-2">
              {getNavLinks().map((link, index) => (
                <motion.li key={index} variants={navItemVariants}>
                  <NavLink
                    to={link.to}
                    end={link.to.split('/').length === 2}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img
              src={currentUser?.avatar || `https://ui-avatars.com/api/?name=User&background=random&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {currentUser?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;