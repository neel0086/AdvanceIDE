import React, { useContext } from 'react'
import { FolderContext } from '../../context/FolderProvider'
import './FolderTree.css'
import FolderIcon from '../../images/folder.png'
function FolderTree() {
    const {folderVal,setFolderVal} = useContext(FolderContext);
    return (
        <div className='ft-container'>
            <div className='ft-nav'>
                <span></span>FolderView
            </div>
            <div className='ft-name'>
                <span><img src={FolderIcon}/></span>
                <span>{folderVal}</span>
                
            </div>


        </div>
    )
}

export default FolderTree
