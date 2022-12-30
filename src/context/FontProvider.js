import React, { createContext, useState } from 'react'
export const FontContext = createContext("16px")
function FontProvider({children}) {
    const [fontVal,setFontVal] = useState("16px")
  return (
    <FontContext.Provider value={{
        fontVal,setFontVal,
    }}>
        {children}
    </FontContext.Provider>
  )
}

export default FontProvider
