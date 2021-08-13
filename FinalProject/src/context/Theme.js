import React, {useContext, useState} from 'react';
import {StatusBar} from 'react-native';
import colors from '../config/colors';

export const ThemeContext = React.createContext();

const lightTheme = {
  backgroundColor: colors.white,
  textColor: colors.black,
  primaryColor: colors.pink,
};

const darkTheme = {
  backgroundColor: colors.black,
  textColor: colors.white,
  primaryColor: colors.skyBlue,
};

const Theme = ({children}) => {
  const [darkModeEnabled, updateDarkModeEnabled] = useState(false);
  const [mainTheme, updateMainTheme] = useState(lightTheme);

  const toggleDarkMode = () => {
    const theme = !darkModeEnabled ? darkTheme : lightTheme;
    const statusBarStyle = !darkModeEnabled ? 'light-content' : 'dark-content';
    const statusBackground = !darkModeEnabled ? colors.black : colors.white;

    StatusBar.setBackgroundColor(statusBackground);
    StatusBar.setBarStyle(statusBarStyle);
    updateMainTheme(theme);
    updateDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <ThemeContext.Provider
      value={{
        mainTheme,
        darkModeEnabled,
        toggleDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('UseTehme debe ser usado dentro de Theme context');
  }
  return context;
};
