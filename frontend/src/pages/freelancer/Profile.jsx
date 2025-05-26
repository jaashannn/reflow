import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiFileText, 
  FiCheckCircle, FiXCircle, FiUpload, FiSave, FiEdit2, FiGlobe,
  FiBriefcase, FiDollarSign, FiGithub, FiLinkedin
} from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTitle from '../../components/common/PageTitle';

const ProfileCompletionStatus = ({ profile }) => {
  const requiredFields = [
    { name: 'name', label: 'Full Name' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'country', label: 'Country' },
    { name: 'postalCode', label: 'Postal Code' },
    { name: 'bankDetails', label: 'Bank Details' },
    { name: 'verificationIDs', label: 'Verification IDs' }
  ];

  const completedFields = requiredFields.filter(field => {
    if (field.name === 'bankDetails') {
      return profile.bankDetails?.accountNumber && profile.bankDetails?.routingNumber;
    }
    if (field.name === 'verificationIDs') {
      return profile.verificationIDs?.length >= 2;
    }
    return profile[field.name];
  }).length;

  const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
      <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div 
            className="bg-primary-500 h-4 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="text-right mt-1 text-sm text-gray-600 dark:text-gray-300">
          {completionPercentage}% Complete
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requiredFields.map((field) => {
          const isComplete = field.name === 'bankDetails' 
            ? profile.bankDetails?.accountNumber && profile.bankDetails?.routingNumber
            : field.name === 'verificationIDs'
              ? profile.verificationIDs?.length >= 2
              : profile[field.name];
              
          return (
            <div key={field.name} className="flex items-center">
              {isComplete ? (
                <FiCheckCircle className="text-success-500 mr-2" />
              ) : (
                <FiXCircle className="text-error-500 mr-2" />
              )}
              <span className={isComplete ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}>
                {field.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Profile = () => {
  // Profile state with both completion and detailed profile data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    isEmailVerified: false,
    country: '',
    phoneNumber: '',
    postalCode: '',
    bankDetails: {
      accountNumber: '',
      routingNumber: '',
      bankName: ''
    },
    verificationIDs: [],
    isAdminVerified: false,
    tokensAvailable: 5,
    // Detailed profile fields
    title: '',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    website: '',
    github: '',
    linkedin: '',
    bio: '',
    skills: [],
    languages: [],
    education: [],
    rating: 0,
    reviews: 0,
    completedProjects: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [idUploading, setIdUploading] = useState(false);
  const [idFiles, setIdFiles] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ name: '', level: '' });
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // Simulate loading profile data from API
    const timer = setTimeout(() => {
      setProfile({
        ...profile,
        email: 'freelancer@example.com',
        isEmailVerified: true,
        name: 'Alex Johnson',
        // Demo completed profile data
        title: 'Senior Full-Stack Developer',
        website: 'alexjohnson.dev',
        github: 'github.com/alexjohnson',
        linkedin: 'linkedin.com/in/alexjohnson',
        bio: 'Full-stack developer with 8+ years of experience building scalable web applications.',
        skills: [
          { name: 'JavaScript', level: 5 },
          { name: 'React', level: 5 }
        ],
        languages: [
          { name: 'English', level: 'Native' }
        ],
        education: [
          { degree: 'MSc Computer Science', institution: 'Stanford University', year: '2015' }
        ],
        rating: 4.8,
        reviews: 42,
        completedProjects: 36
      });
      
      // Check if profile is complete (in a real app, this would be based on actual completion)
      const isComplete = true; // Set to false to see completion flow
      setIsProfileComplete(isComplete);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (idFiles.length > 0) {
        const newIds = idFiles.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file)
        }));
        setProfile(prev => ({
          ...prev,
          verificationIDs: [...prev.verificationIDs, ...newIds]
        }));
        setIdFiles([]);
      }
      
      // In a real app, check if all required fields are filled
      const allFieldsComplete = true; // Add actual validation
      if (allFieldsComplete) {
        setIsProfileComplete(true);
        toast.success('Profile completed successfully!');
      } else {
        toast.success('Profile updated successfully!');
      }
      
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + profile.verificationIDs.length > 2) {
      toast.error('You can upload maximum 2 verification documents');
      return;
    }
    setIdFiles(files);
  };

  const removeVerificationID = (index) => {
    setProfile(prev => ({
      ...prev,
      verificationIDs: prev.verificationIDs.filter((_, i) => i !== index)
    }));
  };

  const removeUploadedFile = (index) => {
    setIdFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.some(s => s.name === newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkill, level: 3 }]
      }));
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.name.trim() && newLanguage.level.trim()) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage({ name: '', level: '' });
      toast.success('Language added!');
    }
  };

  const handleRemoveSkill = (skillName) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
  };

  const handleRemoveLanguage = (languageName) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.name !== languageName)
    }));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  const renderSkillLevel = (level) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full mx-0.5 ${i < level ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-600'}`}
          />
        ))}
      </div>
    );
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!profile.isEmailVerified) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="max-w-md mx-auto">
          <FiMail className="mx-auto text-4xl text-primary-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Verify Your Email Address</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've sent a verification link to {profile.email}. Please click the link in that email to continue.
          </p>
          <button
            onClick={() => toast.success('Verification email resent!')}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        title={isProfileComplete ? "My Profile" : "Complete Your Profile"}
        subtitle={isProfileComplete 
          ? "Manage your professional profile" 
          : "Please complete your profile to start using the platform"}
      />
      
      {!isProfileComplete ? (
        <>
          <ProfileCompletionStatus profile={profile} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8"
          >
            {/* ... Profile completion form (same as previous version) ... */}
          </motion.div>
          
          {/* ... Bank Details and Verification sections (same as previous version) ... */}
        </>
      ) : (
        <>
          {/* Detailed Profile View */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={cardVariants} className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-100 dark:border-primary-900/20"
                />
                {editMode ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="text-xl font-bold text-center mb-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-center mb-1">{profile.name}</h2>
                )}
                {editMode ? (
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                    className="text-gray-600 dark:text-gray-300 text-center mb-4 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{profile.title}</p>
                )}
                
                <div className="flex items-center mb-4">
                  {renderRatingStars(profile.rating)}
                  <span className="ml-2 font-medium">{profile.rating.toFixed(1)}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">({profile.reviews})</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                    className={`flex items-center px-4 py-2 rounded-lg ${editMode ? 'bg-success-500 hover:bg-success-600 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'}`}
                  >
                    {editMode ? <FiSave className="mr-2" /> : <FiEdit2 className="mr-2" />}
                    {editMode ? 'Save Profile' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={cardVariants} className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FiUser className="mr-2 text-primary-500" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-2" />
                        {editMode ? (
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <span>{profile.email}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiDollarSign className="text-gray-400 mr-2" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.rate}
                            onChange={(e) => setProfile({...profile, rate: e.target.value})}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <span>{profile.rate}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="text-gray-400 mr-2" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <span>{profile.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FiGlobe className="mr-2 text-primary-500" />
                      Online Presence
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiGlobe className="text-gray-400 mr-2" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.website}
                            onChange={(e) => setProfile({...profile, website: e.target.value})}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                            {profile.website}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiGithub className="text-gray-400 mr-2" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.github}
                            onChange={(e) => setProfile({...profile, github: e.target.value})}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                            {profile.github}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiLinkedin className="text-gray-400 mr-2" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                          />
                        ) : (
                          <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                            {profile.linkedin}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About Me</h3>
                  {editMode ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      rows="4"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{profile.bio}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Skills & Languages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Skills</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.completedProjects} projects completed
                </span>
              </div>
              
              <div className="space-y-3">
                {profile.skills?.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    {editMode ? (
                      <div className="flex items-center">
                        <select
                          value={skill.level}
                          onChange={(e) => {
                            const updatedSkills = [...profile.skills];
                            updatedSkills[index].level = parseInt(e.target.value);
                            setProfile({...profile, skills: updatedSkills});
                          }}
                          className="mr-2 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700"
                        >
                          {[1, 2, 3, 4, 5].map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        <button 
                          onClick={() => handleRemoveSkill(skill.name)}
                          className="text-error-500 hover:text-error-700"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      renderSkillLevel(skill.level)
                    )}
                  </div>
                ))}
                
                {editMode && (
                  <div className="flex mt-4">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add new skill"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-primary-500 text-white rounded-r-md hover:bg-primary-600"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              
              <div className="space-y-3">
                {profile.languages?.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{language.name}</span>
                    {editMode ? (
                      <div className="flex items-center">
                        <select
                          value={language.level}
                          onChange={(e) => {
                            const updatedLanguages = [...profile.languages];
                            updatedLanguages[index].level = e.target.value;
                            setProfile({...profile, languages: updatedLanguages});
                          }}
                          className="mr-2 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700"
                        >
                          {['Basic', 'Conversational', 'Fluent', 'Native'].map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        <button 
                          onClick={() => handleRemoveLanguage(language.name)}
                          className="text-error-500 hover:text-error-700"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">{language.level}</span>
                    )}
                  </div>
                ))}
                
                {editMode && (
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={newLanguage.name}
                        onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                        placeholder="Language"
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      />
                      <select
                        value={newLanguage.level}
                        onChange={(e) => setNewLanguage({...newLanguage, level: e.target.value})}
                        className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700"
                      >
                        <option value="">Level</option>
                        {['Basic', 'Conversational', 'Fluent', 'Native'].map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleAddLanguage}
                      className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                    >
                      Add Language
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Education</h3>
              {editMode && (
                <button className="text-sm text-primary-500 hover:text-primary-700">
                  + Add Education
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {profile.education?.map((edu, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {editMode ? (
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const updatedEducation = [...profile.education];
                          updatedEducation[index].year = e.target.value;
                          setProfile({...profile, education: updatedEducation});
                        }}
                        className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                      />
                    ) : (
                      edu.year
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Profile;