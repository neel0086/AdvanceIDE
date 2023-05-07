import React, { useContext } from 'react'
import LeetcodeExtension from './components/LeetcodeExtension/LeetcodeExtension'
import MatrixTesting from './components/matrixTesting/MatrixTesting'
import Settings from './components/settings/Settings'
import SidebarExpandable from './components/Sidebar/SidebarExpandable'
import Tree from './components/treeTesting/Tree'
import { ProviderContext } from './context/Provider'

function SidebarDisplay() {
    const {
        sideBarVal,
        setSideBarVal
    } = useContext(ProviderContext)
    return (
        <>
            {sideBarVal == "FolderView" ? <SidebarExpandable /> :
                sideBarVal == "MatrixView" ? <MatrixTesting /> :
                    sideBarVal == "TreeView" ? <Tree /> :
                        // sideBarVal == "Settings" ? <Settings /> :
                            <LeetcodeExtension />
            }
        </>
    )
}

export default SidebarDisplay
