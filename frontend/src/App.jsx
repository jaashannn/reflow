import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Dashboard
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import Tasks from './pages/admin/Tasks';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Business Dashboard
import BusinessDashboard from './pages/business/Dashboard';
import BusinessActivities from './pages/business/Activities';
import BusinessResponses from './pages/business/Responses';
import BusinessChat from './pages/business/Chat';
import BusinessProfile from './pages/business/Profile';
import Freelancer from './pages/business/Freelancers.jsx';
import Leads from './pages/business/Lead.jsx';
import Campaign from './pages/business/Campaign.jsx';
import Payout from './pages/business/Payout.jsx';
import Help from './pages/business/Help.jsx';

// Freelancer Dashboard
import FreelancerDashboard from './pages/freelancer/Dashboard';
import FreelancerProjects from './pages/freelancer/Projects';
import FreelancerProposals from './pages/freelancer/Proposals';
import FreelancerEarnings from './pages/freelancer/Earnings';
import FreelancerProfile from './pages/freelancer/Profile';
import FreelancerChat from './pages/freelancer/Chat.jsx';
import Businesses from './pages/freelancer/Businesses.jsx';
import Training from './pages/freelancer/Training.jsx';
// Employee Dashboard
import EmployeeDashboard from './pages/employee/Dashboard';
import EmployeeTasks from './pages/employee/Tasks';
import EmployeeAnnouncements from './pages/employee/Announcements';
import EmployeeChat from './pages/employee/Chat';
import EmployeeReports from './pages/employee/Reports';

// Layouts
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import PageLoader from './components/loaders/PageLoader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <AuthProvider>
      {/* <Router> */}
        <AnimatePresence mode="wait">
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout userType="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="settings" element={<AdminSettings />} />
              
            </Route>

            {/* Business Routes */}
            <Route path="/business" element={<DashboardLayout userType="business" />}>
              <Route index element={<BusinessDashboard />} />
              <Route path="activities" element={<BusinessActivities />} />
              <Route path="freelancers" element={<Freelancer />} />
              <Route path="responses" element={<BusinessResponses />} />
              <Route path="chat" element={<BusinessChat />} />
              <Route path="profile" element={<BusinessProfile />} />
              <Route path="leads" element={<Leads />} />
              <Route path="campaign" element={<Campaign />} />
              <Route path="payout" element={<Payout />} />
              <Route path="help" element={<Help />} />
            </Route>

            {/* Freelancer Routes */}
            <Route path="/freelancer" element={<DashboardLayout userType="freelancer" />}>
              <Route index element={<FreelancerDashboard />} />
              <Route path="projects" element={<FreelancerProjects />} />
              <Route path="proposals" element={<FreelancerProposals />} />
              <Route path="training" element={<Training />} />
              <Route path="businesses" element={<Businesses />} />
              <Route path="earnings" element={<FreelancerEarnings />} />
              <Route path="chat" element={<FreelancerChat />} />
              <Route path="profile" element={<FreelancerProfile />} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employee" element={<DashboardLayout userType="employee" />}>
              <Route index element={<EmployeeDashboard />} />
              <Route path="tasks" element={<EmployeeTasks />} />
              <Route path="announcements" element={<EmployeeAnnouncements />} />
              <Route path="chat" element={<EmployeeChat />} />
              <Route path="reports" element={<EmployeeReports />} />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AnimatePresence>
      {/* </Router> */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }} 
      />
    </AuthProvider>
  );
}

export default App;