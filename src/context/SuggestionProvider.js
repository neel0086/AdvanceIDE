import React, { createContext, useState } from 'react'
export const SuggestionContext = createContext({})
function SuggestionProvider({children}) {
    const [suggestionVal,setSuggestionVal] = useState({})
  return (
    <SuggestionContext.Provider value={{
        suggestionVal,setSuggestionVal
    }}>
        {children}
    </SuggestionContext.Provider>
  )
}

export default SuggestionProvider
