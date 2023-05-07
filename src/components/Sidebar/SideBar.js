
import { styled, useTheme } from '@mui/material/styles';
import './SideBar.css'
import { useContext, useEffect, useRef, useState } from 'react';
import Folder from '../../images/folder.png'
import Tree from '../../images/tree.png'
import Setting from '../../images/settings.png'
import Leetcode from '../../images/leetcode.png'
import Matrix from '../../images/matrix.png'


import { ProviderContext } from '../../context/Provider';

const drawerWidth = 240;

export default function SideBar() {
  const theme = useTheme();

  const {
    sideBarVal,
    setSideBarVal
  } = useContext(ProviderContext);
  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      setSideBarVal(JSON.parse(localStorage.getItem('sidebar')));
      firstUpdate.current = false
    }
    else {
      localStorage.setItem('sidebar', JSON.stringify(sideBarVal));
    }
  }, [sideBarVal])
  

  return (
    <div className='SidebarUi' >
      <div className="f-icons">
        <img className="d-icons" src={Folder} onClick={() => setSideBarVal(sideBarVal == "FolderView" ? "" : "FolderView")} width='40px' />
        <img className="d-icons" src={Tree} onClick={() => setSideBarVal(sideBarVal == "TreeView" ? "" : "TreeView")} width='40px' alt="" />
        <img className="d-icons" src={Matrix} onClick={() => setSideBarVal(sideBarVal == "MatrixView" ? "" : "MatrixView")} width='40px' alt="" />
        {/* <img className="d-icons" src={Setting} onClick={() => setSideBarVal(sideBarVal == "Settings" ? "" : "Settings")} width='40px' alt="" /> */}
        <img className="d-icons" src={Leetcode} onClick={() => setSideBarVal(sideBarVal == "Leetcode" ? "" : "Leetcode")} width='40px' alt="" />

      </div>

      {/* <div style={{ display: `${open ? 'block' : 'none'}` }}>
        <div className='folderDir'>SidebarUiSidebarUiSidebarUiSidebarUiSidebarUiSidebarUiSidebarUi</div>

      </div> */}


    </div>
  );
}