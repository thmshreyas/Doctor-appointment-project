import React, { createContext, useContext, useState } from 'react';
import { doctors as staticDoctors } from '../assets/assets';

// Create the context
export const AppContext = createContext();

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [doctors] = useState(staticDoctors);
  const [user, setUser] = useState(null);

  const value = {
    doctors,
    user,
    setUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};