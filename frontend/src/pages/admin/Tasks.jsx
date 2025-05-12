import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertCircle, FiPlus, FiTrash2, FiEdit2, FiFilter, FiSearch,FiUser,FiCalendar} from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for tasks
const dummyTasks = [
  {
    id: 1,
    title: 'Update user documentation',
    description: 'Complete the new user onboarding guide for the admin dashboard',
    priority: 'high',
    status: 'pending',
    assignedTo: 'John Doe',
    dueDate: '2023-06-15',
    createdBy: 'Admin'
  },
  {
    id: 2,
    title: 'Fix dashboard responsive issues',
    description: 'Mobile view needs adjustments for the new components',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Sarah Smith',
    dueDate: '2023-06-10',
    createdBy: 'Admin'
  },
  {
    id: 3,
    title: 'Implement dark mode toggle',
    description: 'Add theme switcher to settings panel',
    priority: 'low',
    status: 'completed',
    assignedTo: 'Mike Johnson',
    dueDate: '2023-05-28',
    createdBy: 'Admin'
  },
  {
    id: 4,
    title: 'Database optimization',
    description: 'Run performance tuning on production database',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Emma Wilson',
    dueDate: '2023-06-20',
    createdBy: 'Admin'
  },
  {
    id: 5,
    title: 'Prepare quarterly report',
    description: 'Compile metrics for Q2 admin dashboard performance',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'David Brown',
    dueDate: '2023-06-05',
    createdBy: 'Admin'
  }
];

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'success'
};

const statusColors = {
  pending: 'warning',
  'in-progress': 'primary',
  completed: 'success'
};

const statusIcons = {
  pending: <FiClock className="mr-1" />,
  'in-progress': <FiAlertCircle className="mr-1" />,
  completed: <FiCheckCircle className="mr-1" />
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
    dueDate: '',
    status: 'pending'
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setTasks(dummyTasks);
      setIsLoading(false);
      toast.success('Tasks loaded successfully!');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskWithId = {
      ...editedTask,
      id: tasks.length + 1,
      createdBy: 'Admin'
    };
    setTasks([taskWithId, ...tasks]);
    setNewTaskModal(false);
    setEditedTask({
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
      status: 'pending'
    });
    toast.success('Task added successfully!');
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      status: task.status
    });
    setEditMode(true);
  };

  const handleSaveTask = () => {
    setTasks(tasks.map(task => 
      task.id === selectedTask.id ? { ...task, ...editedTask } : task
    ));
    setSelectedTask({ ...selectedTask, ...editedTask });
    setEditMode(false);
    toast.success('Task updated successfully!');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
    toast.success('Task deleted successfully!');
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, status: newStatus });
    }
    toast.success('Task status updated!');
  };

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
        title="Task Management"
        subtitle="Manage and track admin tasks"
      />
      
      {/* Task Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'pending' ? 'bg-warning-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'in-progress' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'completed' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Completed
            </button>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <button
            onClick={() => setNewTaskModal(true)}
            className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Task
          </button>
        </div>
      </motion.div>
      
      {/* Task Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <FiCheckCircle className="text-primary-500 text-3xl mx-auto mb-2" />
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</h4>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-warning-100 dark:bg-warning-900/20 flex items-center justify-center mx-auto mb-2">
              <FiClock className="text-warning-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Pending</h4>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'pending').length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-2">
              <FiAlertCircle className="text-primary-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">In Progress</h4>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</p>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center mx-auto mb-2">
              <FiCheckCircle className="text-success-500" />
            </div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Completed</h4>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'completed').length}</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Tasks List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 cursor-pointer transition-colors ${selectedTask?.id === task.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {task.title}
                      </h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${priorityColors[task.priority]}-100 dark:bg-${priorityColors[task.priority]}-900/20 text-${priorityColors[task.priority]}-800 dark:text-${priorityColors[task.priority]}-300`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${statusColors[task.status]}-100 dark:bg-${statusColors[task.status]}-900/20 text-${statusColors[task.status]}-800 dark:text-${statusColors[task.status]}-300`}>
                          {statusIcons[task.status]}
                          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiUser className="mr-1" />
                      <span>{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiCalendar className="mr-1" />
                      <span>{task.dueDate}</span>
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
                <FiCheckCircle className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No tasks found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' 
                    ? "You haven't created any tasks yet" 
                    : `You have no ${filter} tasks`}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Task Details */}
        <div className="lg:col-span-2">
          {selectedTask ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {editMode ? (
                        <input
                          type="text"
                          value={editedTask.title}
                          onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                          className="text-2xl font-bold bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded w-full"
                        />
                      ) : (
                        selectedTask.title
                      )}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-${priorityColors[selectedTask.priority]}-100 dark:bg-${priorityColors[selectedTask.priority]}-900/20 text-${priorityColors[selectedTask.priority]}-800 dark:text-${priorityColors[selectedTask.priority]}-300`}>
                        {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-${statusColors[selectedTask.status]}-100 dark:bg-${statusColors[selectedTask.status]}-900/20 text-${statusColors[selectedTask.status]}-800 dark:text-${statusColors[selectedTask.status]}-300`}>
                        {statusIcons[selectedTask.status]}
                        {selectedTask.status === 'in-progress' ? 'In Progress' : selectedTask.status.charAt(0).toUpperCase() + selectedTask.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {editMode ? (
                      <>
                        <button
                          onClick={handleSaveTask}
                          className="px-3 py-1 bg-success-500 hover:bg-success-600 text-white rounded-md text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditTask(selectedTask)}
                          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(selectedTask.id)}
                          className="p-2 text-gray-500 dark:text-gray-400 hover:text-error-500 dark:hover:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    variants={detailVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Task Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Assigned To:</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={editedTask.assignedTo}
                            onChange={(e) => setEditedTask({...editedTask, assignedTo: e.target.value})}
                            className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <span className="font-medium">{selectedTask.assignedTo}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Due Date:</span>
                        {editMode ? (
                          <input
                            type="date"
                            value={editedTask.dueDate}
                            onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                            className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <span className="font-medium">{selectedTask.dueDate}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Created By:</span>
                        <span className="font-medium">{selectedTask.createdBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Status:</span>
                        {editMode ? (
                          <select
                            value={editedTask.status}
                            onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
                            className={`text-sm rounded-md border-0 focus:ring-2 focus:ring-offset-2 bg-${statusColors[editedTask.status]}-100 dark:bg-${statusColors[editedTask.status]}-900/20 text-${statusColors[editedTask.status]}-800 dark:text-${statusColors[editedTask.status]}-300`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        ) : (
                          <select
                            value={selectedTask.status}
                            onChange={(e) => handleStatusChange(selectedTask.id, e.target.value)}
                            className={`text-sm rounded-md border-0 focus:ring-2 focus:ring-offset-2 bg-${statusColors[selectedTask.status]}-100 dark:bg-${statusColors[selectedTask.status]}-900/20 text-${statusColors[selectedTask.status]}-800 dark:text-${statusColors[selectedTask.status]}-300`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={detailVariants}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Priority
                    </h3>
                    {editMode ? (
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                        className={`w-full px-3 py-2 rounded-md border-0 bg-${priorityColors[editedTask.priority]}-100 dark:bg-${priorityColors[editedTask.priority]}-900/20 text-${priorityColors[editedTask.priority]}-800 dark:text-${priorityColors[editedTask.priority]}-300`}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    ) : (
                      <select
                        value={selectedTask.priority}
                        onChange={(e) => {
                          const updatedTasks = tasks.map(task => 
                            task.id === selectedTask.id ? { ...task, priority: e.target.value } : task
                          );
                          setTasks(updatedTasks);
                          setSelectedTask({ ...selectedTask, priority: e.target.value });
                        }}
                        className={`w-full px-3 py-2 rounded-md border-0 bg-${priorityColors[selectedTask.priority]}-100 dark:bg-${priorityColors[selectedTask.priority]}-900/20 text-${priorityColors[selectedTask.priority]}-800 dark:text-${priorityColors[selectedTask.priority]}-300`}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    )}
                  </motion.div>
                </div>
                
                <motion.div
                  variants={detailVariants}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Description
                  </h3>
                  {editMode ? (
                    <textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      rows="4"
                    />
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                      {selectedTask.description}
                    </div>
                  )}
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
              <FiCheckCircle className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Select a task
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose a task from the list to view details and manage it
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Add Task Modal */}
      <AnimatePresence>
        {newTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Add New Task</h3>
                  <button 
                    onClick={() => setNewTaskModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleAddTask}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        rows="3"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Priority
                        </label>
                        <select
                          value={editedTask.priority}
                          onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Status
                        </label>
                        <select
                          value={editedTask.status}
                          onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Assign To
                        </label>
                        <input
                          type="text"
                          value={editedTask.assignedTo}
                          onChange={(e) => setEditedTask({...editedTask, assignedTo: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={editedTask.dueDate}
                          onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;