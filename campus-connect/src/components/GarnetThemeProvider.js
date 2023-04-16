// src/components/GarnetThemeProvider.js
import { createContext, useContext } from 'react';

const GarnetThemeContext = createContext();

export const useGarnetTheme = () => useContext(GarnetThemeContext);

export const GarnetThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      garnet: '#73000a',
      white: '#FFFFFF',
      black: '#000000',
    },
  };

  return (
    <GarnetThemeContext.Provider value={theme}>
      {children}
    </GarnetThemeContext.Provider>
  );
};
