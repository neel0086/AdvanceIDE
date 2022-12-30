import React, { createContext, useState } from 'react'
export const LanguageContext = createContext("python3")
function LanguageProvider({children}) {
    const [languageMode,setLanguageMode] = useState("python3")
  return (
    <LanguageContext.Provider value={{
        languageMode,setLanguageMode,
    }}>
        {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
