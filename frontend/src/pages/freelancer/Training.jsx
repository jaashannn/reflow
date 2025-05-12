import React, { useState } from 'react';
import { FiBook, FiAward, FiClock, FiSearch, FiFilter, FiPlay, FiCheck, FiLock, FiBarChart2 } from 'react-icons/fi';

const Training = () => {
  // Training categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'business', name: 'Business' },
    { id: 'soft-skills', name: 'Soft Skills' }
  ];

  // Dummy training data
  const initialTrainings = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      category: 'development',
      duration: '2h 45m',
      level: 'Advanced',
      progress: 100,
      completed: true,
      certification: true,
      description: 'Learn advanced React patterns to build scalable applications with best practices.',
      modules: 8,
      skills: ['React', 'State Management', 'Performance']
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      category: 'design',
      duration: '4h 10m',
      level: 'Beginner',
      progress: 65,
      completed: false,
      certification: true,
      description: 'Master the core principles of user interface and experience design.',
      modules: 6,
      skills: ['Figma', 'Wireframing', 'User Research']
    },
    {
      id: 3,
      title: 'Content Marketing Strategy',
      category: 'marketing',
      duration: '3h 30m',
      level: 'Intermediate',
      progress: 0,
      completed: false,
      certification: false,
      description: 'Develop a winning content strategy to grow your freelance business.',
      modules: 5,
      skills: ['SEO', 'Content Planning', 'Audience Analysis']
    },
    {
      id: 4,
      title: 'Freelance Contract Essentials',
      category: 'business',
      duration: '1h 15m',
      level: 'Beginner',
      progress: 100,
      completed: true,
      certification: true,
      description: 'Learn how to create bulletproof contracts for your freelance work.',
      modules: 3,
      skills: ['Legal', 'Contracts', 'Negotiation']
    },
    {
      id: 5,
      title: 'Node.js Backend Development',
      category: 'development',
      duration: '5h 20m',
      level: 'Intermediate',
      progress: 30,
      completed: false,
      certification: true,
      description: 'Build robust backend services with Node.js and Express.',
      modules: 7,
      skills: ['Node.js', 'Express', 'API Design']
    },
    {
      id: 6,
      title: 'Client Communication Mastery',
      category: 'soft-skills',
      duration: '2h 0m',
      level: 'Beginner',
      progress: 0,
      completed: false,
      certification: false,
      description: 'Improve your client communication skills to build better relationships.',
      modules: 4,
      skills: ['Communication', 'Client Management', 'Expectation Setting']
    }
  ];

  const [trainings, setTrainings] = useState(initialTrainings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    level: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter trainings based on search and filters
  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = 
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory = filters.category === 'all' || training.category === filters.category;
    const matchesStatus = 
      filters.status === 'all' || 
      (filters.status === 'completed' && training.completed) ||
      (filters.status === 'in-progress' && !training.completed && training.progress > 0) ||
      (filters.status === 'not-started' && training.progress === 0);
    const matchesLevel = filters.level === 'all' || training.level.toLowerCase() === filters.level;

    return matchesSearch && matchesCategory && matchesStatus && matchesLevel;
  });

  // Start/resume training
  const startTraining = (id) => {
    // In a real app, this would navigate to the training player
    console.log(`Starting training ${id}`);
  };

  // Calculate stats
  const completedCount = trainings.filter(t => t.completed).length;
  const inProgressCount = trainings.filter(t => !t.completed && t.progress > 0).length;
  const certificationCount = trainings.filter(t => t.certification && t.completed).length;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header and Stats */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Training Center</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 mr-4">
                  <FiBook className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Trainings</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{trainings.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/20 text-success-500 mr-4">
                  <FiCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-accent-100 dark:bg-accent-900/20 text-accent-500 mr-4">
                  <FiAward className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Certifications</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{certificationCount}</p>
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
                placeholder="Search trainings by title, description, or skills..."
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="not-started">Not Started</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                    value={filters.level}
                    onChange={(e) => setFilters({...filters, level: e.target.value})}
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trainings Grid */}
        {filteredTrainings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings.map(training => (
              <div key={training.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      training.completed 
                        ? 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200'
                        : training.progress > 0
                          ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {training.completed ? 'Completed' : training.progress > 0 ? 'In Progress' : 'Not Started'}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {training.level}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{training.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{training.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <FiClock className="mr-1" />
                    <span className="mr-4">{training.duration}</span>
                    <FiBook className="mr-1" />
                    <span>{training.modules} modules</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{training.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          training.completed 
                            ? 'bg-success-500'
                            : training.progress > 0
                              ? 'bg-primary-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                        }`} 
                        style={{ width: `${training.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Skills Covered:</div>
                    <div className="flex flex-wrap gap-2">
                      {training.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => startTraining(training.id)}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${
                      training.completed
                        ? 'bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-300 hover:bg-success-200 dark:hover:bg-success-800/30'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    } transition-colors`}
                  >
                    {training.completed ? (
                      <>
                        <FiCheck className="mr-2" />
                        View Certificate
                      </>
                    ) : (
                      <>
                        <FiPlay className="mr-2" />
                        {training.progress > 0 ? 'Continue' : 'Start'} Training
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No trainings found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;