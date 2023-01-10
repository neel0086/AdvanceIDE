import React, { useContext } from 'react'
import { FolderContext } from '../../context/FolderProvider'
import './FolderTree.css'
import FolderIcon from '../../images/folder.png'
function FolderTree() {
    const { folderVal, setFolderVal } = useContext(FolderContext);
    return (
        <div className='ft-container'>
            <div className='ft-nav'>
                <span></span>FolderView
            </div>
            <div className='ft-name'>
                <span><img src={FolderIcon} /></span>
                <span>{folderVal}</span>

            </div>
            <div className='treeview'>
                <ul id="myUL">
                    <li><span>Beverages</span>
                        <ul >
                            <li>Water</li>
                            <li>Coffee</li>
                            <li><span>Tea</span>
                                <ul >
                                    <li>Black Tea</li>
                                    <li>White Tea</li>
                                    <li><span>Green Tea</span>
                                        <ul >
                                            <li>Sencha</li>
                                            <li>Gyokuro</li>
                                            <li>Matcha</li>
                                            <li>Pi Lo Chun</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default FolderTree
