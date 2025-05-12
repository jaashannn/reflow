import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password, userType) => {
    // This is a dummy authentication. In a real app, you would validate credentials on the server.
    if (email && password) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        userType,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random&color=fff`,
      };
      
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on user type
      navigate(`/${userType}`);
      toast.success('Successfully logged in!');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  // Register function
  const register = (email, password, userType) => {
    // This is a dummy registration. In a real app, you would create a user on the server.
    if (email && password) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        userType,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random&color=fff`,
      };
      
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on user type
      navigate(`/${userType}`);
      toast.success('Successfully registered!');
      return true;
    }
    
    toast.error('Invalid registration data');
    return false;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Successfully logged out!');
  };

  // Update user profile
  const updateProfile = (userData) => {
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully!');
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};