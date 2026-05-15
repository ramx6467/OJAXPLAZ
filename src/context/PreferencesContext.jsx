import React, { createContext, useState, useEffect, useContext } from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('appLanguage') || 'telugu');
  
  // Additional settings
  const [dataSaver, setDataSaver] = useState(() => JSON.parse(localStorage.getItem('appDataSaver') || 'false'));
  const [normalizeVolume, setNormalizeVolume] = useState(() => JSON.parse(localStorage.getItem('appNormalizeVolume') || 'true'));
  const [gaplessPlayback, setGaplessPlayback] = useState(() => JSON.parse(localStorage.getItem('appGaplessPlayback') || 'true'));
  const [crossfade, setCrossfade] = useState(() => parseInt(localStorage.getItem('appCrossfade') || '0', 10));
  const [quality, setQuality] = useState(() => localStorage.getItem('appQuality') || 'high');

  // Apply theme class to body whenever theme changes
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else if (theme === 'dark') {
      document.body.classList.remove('light-theme');
    } else {
      // System default
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    }
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  // Save string preferences
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('appQuality', quality);
  }, [quality]);

  // Save boolean/number preferences
  useEffect(() => {
    localStorage.setItem('appDataSaver', JSON.stringify(dataSaver));
  }, [dataSaver]);
  
  useEffect(() => {
    localStorage.setItem('appNormalizeVolume', JSON.stringify(normalizeVolume));
  }, [normalizeVolume]);
  
  useEffect(() => {
    localStorage.setItem('appGaplessPlayback', JSON.stringify(gaplessPlayback));
  }, [gaplessPlayback]);
  
  useEffect(() => {
    localStorage.setItem('appCrossfade', crossfade.toString());
  }, [crossfade]);

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    dataSaver,
    setDataSaver,
    normalizeVolume,
    setNormalizeVolume,
    gaplessPlayback,
    setGaplessPlayback,
    crossfade,
    setCrossfade,
    quality,
    setQuality
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
