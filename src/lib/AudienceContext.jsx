import React, { createContext, useContext, useState, useEffect } from 'react';

const AudienceContext = createContext();

export function AudienceProvider({ children }) {
  const [audience, setAudience] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount, default to 'investor'
    const saved = localStorage.getItem('audience_type') || 'investor';
    setAudience(saved);
    setIsLoading(false);
  }, []);

  const selectAudience = (type) => {
    setAudience(type);
    localStorage.setItem('audience_type', type);
  };

  const clearAudience = () => {
    setAudience(null);
    localStorage.removeItem('audience_type');
  };

  return (
    <AudienceContext.Provider value={{ audience, selectAudience, clearAudience, isLoading }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error('useAudience must be used within AudienceProvider');
  }
  return context;
}