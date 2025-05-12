import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RouteLoader from '../loaders/RouteLoader';

const DashboardLayout = ({ userType }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [routeChanging, setRouteChanging] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Check if user is authorized to access this dashboard
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.userType !== userType) {
      navigate(`/${currentUser.userType}`);
    }
  }, [currentUser, userType, navigate]);

  // Show route changing animation
  useEffect(() => {
    setRouteChanging(true);
    const timer = setTimeout(() => setRouteChanging(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If no user, don't render
  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 md:relative"
          >
            <Sidebar userType={userType} closeSidebar={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen} 
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          {routeChanging ? (
            <RouteLoader />
          ) : (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto"
            >
              <Outlet />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;