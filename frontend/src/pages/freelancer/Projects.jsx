import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiAward, FiClock, FiDollarSign, FiExternalLink, FiFileText} from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for projects
const dummyProjects = [
  {
    id: 1,
    title: 'E-commerce Website Development',
    client: 'ABC Corporation',
    clientAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    completedDate: '2023-05-15',
    budget: '$5,000',
    duration: '6 weeks',
    description: 'Developed a full-featured e-commerce platform with React frontend and Node.js backend. Implemented payment gateway integration, inventory management, and admin dashboard.',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    rating: 4.7,
    reviewCount: 12,
    attachments: ['project1-screenshot1.jpg', 'project1-screenshot2.jpg'],
    link: 'https://example-ecommerce.com',
    milestones: [
      { name: 'Design Approval', completed: true, date: '2023-04-01' },
      { name: 'Frontend Development', completed: true, date: '2023-04-15' },
      { name: 'Backend Integration', completed: true, date: '2023-04-30' },
      { name: 'Testing & Deployment', completed: true, date: '2023-05-15' }
    ]
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Design',
    client: 'XYZ Startup',
    clientAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    completedDate: '2023-04-10',
    budget: '$2,500',
    duration: '3 weeks',
    description: 'Created modern and intuitive UI/UX designs for a food delivery mobile application. Conducted user research and created high-fidelity prototypes.',
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping'],
    rating: 5.0,
    reviewCount: 8,
    attachments: ['app-design.fig', 'user-flow.pdf'],
    link: 'https://dribbble.com/example',
    milestones: [
      { name: 'Research & Wireframes', completed: true, date: '2023-03-20' },
      { name: 'Initial Designs', completed: true, date: '2023-03-27' },
      { name: 'Client Feedback', completed: true, date: '2023-04-03' },
      { name: 'Final Delivery', completed: true, date: '2023-04-10' }
    ]
  },
  {
    id: 3,
    title: 'SEO Optimization',
    client: 'Global Services',
    clientAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    completedDate: '2023-03-01',
    budget: '$1,200',
    duration: '4 weeks',
    description: 'Performed comprehensive SEO audit and optimization. Improved organic search rankings by 65% through keyword optimization and content strategy.',
    skills: ['SEO', 'Keyword Research', 'Google Analytics', 'Content Strategy'],
    rating: 4.3,
    reviewCount: 5,
    attachments: ['seo-report.pdf'],
    link: 'https://globalservices.com',
    milestones: [
      { name: 'Initial Audit', completed: true, date: '2023-02-01' },
      { name: 'Keyword Research', completed: true, date: '2023-02-08' },
      { name: 'Implementation', completed: true, date: '2023-02-22' },
      { name: 'Final Report', completed: true, date: '2023-03-01' }
    ]
  }
];

const renderRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return stars;
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProjects(dummyProjects);
      setIsLoading(false);
      toast.success('Projects loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(project => 
    filter === 'all' || 
    (filter === 'highRating' && project.rating >= 4.5) ||
    (filter === 'recent' && new Date(project.completedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ));

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.completedDate) - new Date(a.completedDate);
    } else if (sortBy === 'highestRated') {
      return b.rating - a.rating;
    } else if (sortBy === 'highestBudget') {
      return parseFloat(b.budget.replace('$', '')) - parseFloat(a.budget.replace('$', ''));
    }
    return 0;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        title="My Projects"
        subtitle="Showcase your completed work and client feedback"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter('highRating')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'highRating' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Top Rated
              </button>
              <button
                onClick={() => setFilter('recent')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'recent' ? 'bg-secondary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Recent
              </button>
            </div>
            
            <div className="mt-3">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="highestRated">Highest Rated</option>
                <option value="highestBudget">Highest Budget</option>
              </select>
            </div>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-250px)] overflow-y-auto"
          >
            {sortedProjects.length > 0 ? (
              sortedProjects.map(project => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedProject(project)}
                  className={`p-4 cursor-pointer transition-colors ${selectedProject?.id === project.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <img
                          src={project.clientAvatar}
                          alt={project.client}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {project.client}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{project.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiDollarSign className="mr-1" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiClock className="mr-1" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiAward className="mr-1" />
                      <span>{project.reviewCount} reviews</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <FiAward className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No projects found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' 
                    ? "You haven't completed any projects yet" 
                    : `You have no ${filter === 'highRating' ? 'highly rated' : 'recent'} projects`}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center">
                      <img
                        src={selectedProject.clientAvatar}
                        alt={selectedProject.client}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedProject.client}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderRatingStars(selectedProject.rating)}
                    </div>
                    <span className="font-medium">
                      {selectedProject.rating.toFixed(1)} ({selectedProject.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <motion.div
                    variants={detailVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Project Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Completed:</span>
                        <span className="font-medium">{selectedProject.completedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Budget:</span>
                        <span className="font-medium">{selectedProject.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                        <span className="font-medium">{selectedProject.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Project Link:</span>
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                        >
                          Visit <FiExternalLink className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={detailVariants}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Skills Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Project Description
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                    {selectedProject.description}
                  </div>
                </motion.div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Project Milestones
                  </h3>
                  <div className="space-y-4">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 ${milestone.completed ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {milestone.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Completed on {milestone.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Attachments
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProject.attachments.map((file, index) => (
                      <div 
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center">
                          <FiFileText className="text-gray-400 mr-2" />
                          <span className="text-sm truncate">{file}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <FiAward className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Select a project
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose a project from the list to view details, ratings, and showcase your work
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;