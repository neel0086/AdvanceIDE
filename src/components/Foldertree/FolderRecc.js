import React, { useState } from 'react'
import FolderCollapsedIcon from '../../images/folderCollapsed.png'

function FolderRecc(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFolder = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className='recc_tree'>
            <li>
                <span className={`${props.folder.children} ? t-folder : t-file`} onClick={toggleFolder}>
                    {props.folder.children && <img src={FolderCollapsedIcon} />}
                    {props.folder.name}
                </span>
                {props.folder.children && isOpen &&
                    <ul>
                        {props.folder.children.map((child, index) => (
                            <FolderRecc key={index} folder={child} />
                        ))}
                    </ul>
                }
            </li>
        </div>
    )
}

export default FolderRecc


