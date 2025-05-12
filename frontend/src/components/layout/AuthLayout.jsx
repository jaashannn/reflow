import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FiBriefcase, FiUser, FiUsers, FiSettings } from 'react-icons/fi';

const AuthLayout = () => {
  const { currentUser } = useAuth();
  
  // If user is already logged in, redirect to their dashboard
  if (currentUser) {
    return <Navigate to={`/${currentUser.userType}`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Left Side - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary-600 to-secondary-700 md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Connect with the perfect talent
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Our platform connects businesses with top freelancers and employees worldwide.
        </p>
        
        <div className="grid grid-cols-2 gap-6 max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <FiBriefcase className="text-white text-3xl mb-2" />
            <h3 className="text-lg font-semibold">For Businesses</h3>
            <p className="text-sm opacity-80">Post projects and find the perfect talent</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <FiUser className="text-white text-3xl mb-2" />
            <h3 className="text-lg font-semibold">For Freelancers</h3>
            <p className="text-sm opacity-80">Find projects and grow your career</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <FiUsers className="text-white text-3xl mb-2" />
            <h3 className="text-lg font-semibold">For Employees</h3>
            <p className="text-sm opacity-80">Manage tasks and collaborate efficiently</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <FiSettings className="text-white text-3xl mb-2" />
            <h3 className="text-lg font-semibold">For Admins</h3>
            <p className="text-sm opacity-80">Powerful tools to manage the platform</p>
          </div>
        </div>
      </motion.div>
      
      {/* Right Side - Auth Forms */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:w-1/2 p-8 md:p-12 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;