import React, { useContext } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Back from '../../images/back.png'
import Folder from '../../images/folder.png'
import Tree from '../../images/tree.png'
import Setting from '../../images/settings.png'
import './SidebarExpandable.css'
import { SideBarContext } from '../../context/SideBarProvider';
import FolderTree from '../Foldertree/FolderTree';
function SidebarExpandable() {
    const theme = useTheme();
    
  const {sideBarVal,setSideBarVal}= useContext(SideBarContext)
  const [open, setOpen] = useState(false);
    return (
        <div className='SidebarExpUi' style={{ flex: `${sideBarVal ? 0.20 : 0.0}` }}>
            <div className='s-open'>
                <FolderTree />
                {/* {open ? <img src={Back} onClick={() => setOpen(!open)} />
                    : <></>} */}


            </div>
        </div>
    )
}

export default SidebarExpandable
