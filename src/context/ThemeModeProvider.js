import React, { createContext, useState } from 'react'
export const ThemeModeContext = createContext("dracula")
function ThemeModeProvider({children}) {
    const [themeMode,setThemeMode] = useState("dracula")
  return (
    <ThemeModeContext.Provider value={{
        themeMode,setThemeMode,
    }}>
        {children}
    </ThemeModeContext.Provider>
  )
}

export default ThemeModeProvider
