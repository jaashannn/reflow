import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiRefreshCw, FiDollarSign, FiPercent, FiMail, FiGlobe } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

const Settings = () => {
  const [settings, setSettings] = useState({
    platformFee: 10,
    featuredProjectFee: 50,
    minimumProjectBudget: 100,
    maximumProjectBudget: 10000,
    supportEmail: 'support@example.com',
    adminEmail: 'admin@example.com',
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    allowGuestBrowsing: true,
    requireEmailVerification: true,
    enableDarkMode: true,
    maintenanceMode: false,
  });
  
  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };
  
  const handleReset = () => {
    // Reset to default values
    setSettings({
      platformFee: 10,
      featuredProjectFee: 50,
      minimumProjectBudget: 100,
      maximumProjectBudget: 10000,
      supportEmail: 'support@example.com',
      adminEmail: 'admin@example.com',
      defaultCurrency: 'USD',
      defaultLanguage: 'en',
      allowGuestBrowsing: true,
      requireEmailVerification: true,
      enableDarkMode: true,
      maintenanceMode: false,
    });
    toast.success('Settings reset to defaults');
  };

  return (
    <div>
      <PageTitle
        title="Platform Settings"
        subtitle="Configure global platform settings and preferences"
        actions={
          <div className="flex space-x-3">
            <button className="btn-outline" onClick={handleReset}>
              <FiRefreshCw className="mr-2" /> Reset
            </button>
            <button className="btn-primary" onClick={handleSave}>
              <FiSave className="mr-2" /> Save Changes
            </button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fees & Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-6">Fees & Payments</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform Fee (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPercent className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={settings.platformFee}
                  onChange={(e) => handleChange('platformFee', parseFloat(e.target.value))}
                  className="input-field pl-10"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Project Fee
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={settings.featuredProjectFee}
                  onChange={(e) => handleChange('featuredProjectFee', parseFloat(e.target.value))}
                  className="input-field pl-10"
                  min="0"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Project Budget
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={settings.minimumProjectBudget}
                    onChange={(e) => handleChange('minimumProjectBudget', parseFloat(e.target.value))}
                    className="input-field pl-10"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Project Budget
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={settings.maximumProjectBudget}
                    onChange={(e) => handleChange('maximumProjectBudget', parseFloat(e.target.value))}
                    className="input-field pl-10"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Support Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleChange('adminEmail', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Localization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-6">Localization</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Currency
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGlobe className="text-gray-400" />
                </div>
                <select
                  value={settings.defaultCurrency}
                  onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                  className="input-field pl-10"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Language
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGlobe className="text-gray-400" />
                </div>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                  className="input-field pl-10"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Platform Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-6">Platform Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Allow Guest Browsing</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow non-registered users to browse projects
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowGuestBrowsing}
                  onChange={(e) => handleChange('allowGuestBrowsing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Require Email Verification</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Users must verify their email before accessing the platform
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after: left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Enable Dark Mode</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow users to switch between light and dark themes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableDarkMode}
                  onChange={(e) => handleChange('enableDarkMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable maintenance mode to prevent user access
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;