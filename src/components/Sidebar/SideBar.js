
import { styled, useTheme } from '@mui/material/styles';
import './SideBar.css'
import { useContext, useState } from 'react';
import Back from '../../images/back.png'
import Folder from '../../images/folder.png'
import Tree from '../../images/tree.png'
import Setting from '../../images/settings.png'
import { SideBarContext } from '../../context/SideBarProvider';

const drawerWidth = 240;

export default function SideBar() {
  const theme = useTheme();
  const {sideBarVal,setSideBarVal}= useContext(SideBarContext)



  return (
    <div className='SidebarUi' >
      <div class="f-icons">
        <img class="d-icons" src={Folder} onClick={() => setSideBarVal(sideBarVal=="FolderView" ? "":"FolderView")} width='40px' />
        <img class="d-icons" src={Tree} onClick={() => setSideBarVal(sideBarVal=="TreeView"?"":"TreeView")} width='40px' alt="" />
        <img class="d-icons" src={Setting} onClick={() => setSideBarVal(sideBarVal=="Settings"?"":"Settings")} width='40px' alt="" />
      </div>
      
      {/* <div style={{ display: `${open ? 'block' : 'none'}` }}>
        <div className='folderDir'>SidebarUiSidebarUiSidebarUiSidebarUiSidebarUiSidebarUiSidebarUi</div>

      </div> */}


    </div>
  );
}