import React, { createContext, useState } from 'react'
export const SideBarContext = createContext("")
function SideBarProvider({children}) {
    const [sideBarVal,setSideBarVal] = useState("")
  return (
    <SideBarContext.Provider value={{
        sideBarVal,setSideBarVal,
    }}>
        {children}
    </SideBarContext.Provider>
  )
}

export default SideBarProvider
