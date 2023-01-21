import React, { createContext, useState } from 'react'
export const CodeContext = createContext('')
function CodeProvider({children}) {
    const [codeVal,setCodeVal] = useState('')
  return (
    <CodeContext.Provider value={{
        codeVal,setCodeVal,
    }}>
        {children}
    </CodeContext.Provider>
  )
}

export default CodeProvider
