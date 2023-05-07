import React, { createContext, useState } from 'react'
export const SuggestionContext = createContext({})
function SuggestionProvider({children}) {
    const [suggestionVal,setSuggestionVal] = useState({})
    const [closeIo,setCloseIo] = useState("88.5%")
  return (
    <SuggestionContext.Provider value={{
        suggestionVal,setSuggestionVal,closeIo,setCloseIo
    }}>
        {children}
    </SuggestionContext.Provider>
  )
}

export default SuggestionProvider
