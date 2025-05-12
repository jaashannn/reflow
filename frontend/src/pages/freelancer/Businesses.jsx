import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiDollarSign, FiMail, FiGlobe, FiFilter, FiSearch } from 'react-icons/fi';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

// Dummy data for businesses
const dummyBusinesses = [
    {
        id: 1,
        name: 'TechSolutions Inc.',
        industry: 'Software Development',
        logo: 'https://logo.clearbit.com/techsolutions.com',
        location: 'San Francisco, CA',
        budget: '$10,000 - $50,000',
        rating: 4.5,
        reviews: 28,
        projectsPosted: 15,
        skillsNeeded: ['React', 'Node.js', 'AWS', 'UI/UX Design'],
        description: 'Fast-growing SaaS company looking for talented developers to help build our next-generation platform.',
        website: 'techsolutions.com',
        responseRate: '90%',
        avgPayTime: '7 days'
    },
    {
        id: 2,
        name: 'DesignHub Studio',
        industry: 'Creative Agency',
        logo: 'https://logo.clearbit.com/designhubstudio.com',
        location: 'New York, NY',
        budget: '$5,000 - $20,000',
        rating: 4.9,
        reviews: 42,
        projectsPosted: 23,
        skillsNeeded: ['Figma', 'Illustrator', 'Web Design', 'Branding'],
        description: 'Boutique design studio specializing in brand identity and digital experiences for startups.',
        website: 'designhubstudio.com',
        responseRate: '95%',
        avgPayTime: '5 days'
    },
    {
        id: 3,
        name: 'DataWise Analytics',
        industry: 'Data Science',
        logo: 'https://logo.clearbit.com/datawise.io',
        location: 'Austin, TX',
        budget: '$15,000 - $75,000',
        rating: 4.2,
        reviews: 18,
        projectsPosted: 9,
        skillsNeeded: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'],
        description: 'Enterprise analytics firm helping businesses make data-driven decisions with custom solutions.',
        website: 'datawise.io',
        responseRate: '85%',
        avgPayTime: '10 days'
    },
    {
        id: 4,
        name: 'GreenTech Innovations',
        industry: 'Clean Technology',
        logo: 'https://logo.clearbit.com/greentech.io',
        location: 'Seattle, WA',
        budget: '$20,000 - $100,000',
        rating: 4.7,
        reviews: 31,
        projectsPosted: 12,
        skillsNeeded: ['IoT', 'Embedded Systems', 'Python', 'Sustainability'],
        description: 'Pioneering sustainable technology solutions for a greener future.',
        website: 'greentech.io',
        responseRate: '88%',
        avgPayTime: '14 days'
    },
    {
        id: 5,
        name: 'HealthPlus Systems',
        industry: 'Healthcare Technology',
        logo: 'https://logo.clearbit.com/healthplus.com',
        location: 'Boston, MA',
        budget: '$25,000 - $80,000',
        rating: 4.8,
        reviews: 37,
        projectsPosted: 18,
        skillsNeeded: ['HIPAA Compliance', 'React', 'Healthcare IT', 'Security'],
        description: 'Digital health platform connecting patients with providers through innovative technology.',
        website: 'healthplus.com',
        responseRate: '92%',
        avgPayTime: '12 days'
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

const Businesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [budgetRange, setBudgetRange] = useState([0, 100000]);
    const [proposalModal, setProposalModal] = useState(false);
    const [proposal, setProposal] = useState({
        coverLetter: '',
        proposedRate: '',
        estimatedTime: '',
        relevantWork: ''
    });

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setBusinesses(dummyBusinesses);
            setIsLoading(false);
            toast.success('Businesses loaded successfully!');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const filteredBusinesses = businesses.filter(business => {
        const matchesFilter = filter === 'all' ||
            (filter === 'highest-rated' && business.rating >= 4.5) ||
            (filter === 'frequent-posters' && business.projectsPosted > 15);
        const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.skillsNeeded.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesLocation = locationFilter === '' || business.location.toLowerCase().includes(locationFilter.toLowerCase());
        const avgBudget = (parseInt(business.budget.split(' - ')[0].replace('$', '').replace(',', '')) +
            (parseInt(business.budget.split(' - ')[1].replace('$', '').replace(',', ''))) / 2);
        const matchesBudget = avgBudget >= budgetRange[0] && avgBudget <= budgetRange[1];

        return matchesFilter && matchesSearch && matchesLocation && matchesBudget;
    });

    const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
        if (filter === 'highest-rated') {
            return b.rating - a.rating;
        } else if (filter === 'frequent-posters') {
            return b.projectsPosted - a.projectsPosted;
        } else if (filter === 'fastest-payers') {
            return parseInt(a.avgPayTime) - parseInt(b.avgPayTime);
        }
        return 0;
    });

    const handleSubmitProposal = (e) => {
        e.preventDefault();
        setProposalModal(false);
        toast.success(`Proposal sent to ${selectedBusiness.name}!`);
        // Reset proposal form
        setProposal({
            coverLetter: '',
            proposedRate: '',
            estimatedTime: '',
            relevantWork: ''
        });
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
                title="Find Businesses"
                subtitle="Browse and send proposals to potential clients"
            />

            {/* Filters and Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        >
                            All Businesses
                        </button>
                        <button
                            onClick={() => setFilter('highest-rated')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'highest-rated' ? 'bg-success-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        >
                            Highest Rated
                        </button>
                        <button
                            onClick={() => setFilter('frequent-posters')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'frequent-posters' ? 'bg-secondary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        >
                            Frequent Posters
                        </button>
                        <button
                            onClick={() => setFilter('fastest-payers')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'fastest-payers' ? 'bg-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        >
                            Fastest Payers
                        </button>
                    </div>

                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search businesses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* Advanced Filters */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input
                            type="text"
                            placeholder="Filter by location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Budget Range: ${budgetRange[0].toLocaleString()} - ${budgetRange[1].toLocaleString()}
                        </label>
                        <div className="flex items-center space-x-2">
                            <span>${(budgetRange[0] / 1000).toFixed(0)}k</span>
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="5000"
                                value={budgetRange[0]}
                                onChange={(e) => setBudgetRange([parseInt(e.target.value), budgetRange[1]])}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="5000"
                                value={budgetRange[1]}
                                onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <span>${(budgetRange[1] / 1000).toFixed(0)}k</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Businesses List and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Businesses List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
                        {sortedBusinesses.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {sortedBusinesses.map(business => (
                                    <motion.div
                                        key={business.id}
                                        variants={cardVariants}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setSelectedBusiness(business)}
                                        className={`p-4 cursor-pointer transition-colors ${selectedBusiness?.id === business.id ? 'bg-primary-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        <div className="flex items-start">
                                            <img
                                                src={business.logo}
                                                alt={business.name}
                                                className="w-12 h-12 rounded-md object-contain mr-3"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {business.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {business.industry}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    {renderRatingStars(business.rating)}
                                                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                                        ({business.rating.toFixed(1)})
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{business.budget}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {business.projectsPosted} projects
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-8 text-center"
                            >
                                <FiBriefcase className="mx-auto text-3xl text-gray-400 mb-3" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                    No businesses found
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Try adjusting your search filters
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Business Details */}
                <div className="lg:col-span-2">
                    {selectedBusiness ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full"
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                                    <div className="flex items-start mb-4 md:mb-0">
                                        <img
                                            src={selectedBusiness.logo}
                                            alt={selectedBusiness.name}
                                            className="w-16 h-16 rounded-md object-contain mr-4"
                                        />
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {selectedBusiness.name}
                                            </h2>
                                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                                {selectedBusiness.industry}
                                            </p>
                                            <div className="flex items-center mt-1">
                                                {renderRatingStars(selectedBusiness.rating)}
                                                <span className="ml-2 text-gray-600 dark:text-gray-300">
                                                    {selectedBusiness.rating.toFixed(1)} ({selectedBusiness.reviews} reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setProposalModal(true)}
                                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                                    >
                                        Send Proposal
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <motion.div
                                        variants={detailVariants}
                                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                                    >
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                            Company Information
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <FiMapPin className="text-gray-400 mr-2" />
                                                <span>{selectedBusiness.location}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiDollarSign className="text-gray-400 mr-2" />
                                                <span>Typical budget: {selectedBusiness.budget}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiBriefcase className="text-gray-400 mr-2" />
                                                <span>{selectedBusiness.projectsPosted} projects posted</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiMail className="text-gray-400 mr-2" />
                                                <span>Response rate: {selectedBusiness.responseRate}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiDollarSign className="text-gray-400 mr-2" />
                                                <span>Average pay time: {selectedBusiness.avgPayTime}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={detailVariants}
                                        transition={{ delay: 0.1 }}
                                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                                    >
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                            Skills Needed
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedBusiness.skillsNeeded.map((skill, index) => (
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
                                        About the Company
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg whitespace-pre-line">
                                        {selectedBusiness.description}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={detailVariants}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                        Website
                                    </h3>
                                    <div className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                        <FiGlobe className="mr-2" />
                                        <a href={`https://${selectedBusiness.website}`} target="_blank" rel="noopener noreferrer">
                                            {selectedBusiness.website}
                                        </a>
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
                            <FiBriefcase className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                Select a business
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                                Choose a business from the list to view their profile and send proposals
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Proposal Modal */}
            <AnimatePresence>
                {proposalModal && selectedBusiness && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">Send Proposal to {selectedBusiness.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Complete the form below to submit your proposal
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setProposalModal(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitProposal}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Proposed Rate ($)
                                            </label>
                                            <input
                                                type="number"
                                                value={proposal.proposedRate}
                                                onChange={(e) => setProposal({ ...proposal, proposedRate: e.target.value })}
                                                placeholder="e.g. 5000"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Estimated Time (days)
                                            </label>
                                            <input
                                                type="number"
                                                value={proposal.estimatedTime}
                                                onChange={(e) => setProposal({ ...proposal, estimatedTime: e.target.value })}
                                                placeholder="e.g. 30"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Cover Letter
                                        </label>
                                        <textarea
                                            value={proposal.coverLetter}
                                            onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })}
                                            placeholder={`Explain why you're the best fit for ${selectedBusiness.name}...`}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                            rows="6"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Relevant Work Examples (URLs)
                                        </label>
                                        <textarea
                                            value={proposal.relevantWork}
                                            onChange={(e) => setProposal({ ...proposal, relevantWork: e.target.value })}
                                            placeholder="Links to portfolio, GitHub, or past projects..."
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setProposalModal(false)}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                            Submit Proposal
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

export default Businesses;