import React, { createContext, useContext, useState, useEffect } from 'react';
// Translation data
const translations = {
  en: {
    app_title: "SmartNote",
    nav_link_home: "Home",
    nav_link_notes: "Notes",
    nav_link_about: "About",
    current_lang: "English",
    text_direction: "ltr",
  },
  fa: {
    app_title: "اسمارت نوت",
    nav_link_home: " خانه",
    nav_link_notes: " یاداشت ها",
    nav_link_about: "در باره ",
    current_lang: "  فارسی ",
    text_direction: "rtl",
  },
};

const TranslationContext = createContext();
// Context provider
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const dir = translations[language].text_direction;
  
  // Use useEffect to set the global HTML direction attribute when the language changes
  useEffect(() => {
      document.documentElement.setAttribute('dir', dir);
  }, [dir]);

  const contextValue = { 
    language,
    setLanguage,
    t,
    dir, // Expose text direction for conditional styling
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
// Custom hook for making the context easier to use
export const useTranslation = () => useContext(TranslationContext);