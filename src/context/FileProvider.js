import React, { createContext, useState } from 'react'
export const FileContext = createContext({})
function FileProvider({children}) {
    const [fileVal,setFileVal] = useState({})
  return (
    <FileContext.Provider value={{
        fileVal,setFileVal,
    }}>
        {children}
    </FileContext.Provider>
  )
}

export default FileProvider
