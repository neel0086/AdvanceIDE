import React, { createContext, useState } from 'react'
export const FolderContext = createContext('')
function FolderProvider({children}) {
    const [folderVal,setFolderVal] = useState('')
  return (
    <FolderContext.Provider value={{
        folderVal,setFolderVal,
    }}>
        {children}
    </FolderContext.Provider>
  )
}

export default FolderProvider
