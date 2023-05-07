import React, { useContext, useState } from 'react'
import { ProviderContext } from '../../context/Provider';
import FolderCollapsedIcon from '../../images/folderCollapsed.png'
import { FileIcons } from './FileIcons';
const getFileIcon = (fileName) => {
    if (fileName) {
        const extension = fileName.split('.').pop().toLowerCase()
        if (String(FileIcons[extension]) != "undefined") {

            return FileIcons[extension];

        }
        else {  return FileIcons["default"] }
    }
}
function FolderRecc(props) {
    const [isOpen, setIsOpen] = useState(props.open);
    const { setFileVal } = useContext(ProviderContext);
    console.log(props.folder,props.key)
    const toggleFolder = (e) => {
        if (e.children) {
            let x=0
        }
        else{
            setFileVal({ "path": e["path"], "name":e["name"]  })
        }
        setIsOpen(!isOpen);
    }
    return (
        <div className='recc_tree'>
            <li>
                <span
                    className={props.folder.children ? "t-folder" : "t-file"}
                    onClick={() => toggleFolder(props.folder)}
                    id={props.folder.children ? "null" : props.folder.path}
                >

                    {props.folder.children ? <img src={FolderCollapsedIcon} /> : <img src={getFileIcon(props.folder.name)} />}
                    {props.folder.name}
                </span>
                {props.folder.children && isOpen &&
                    <ul>
                        {props.folder.children.map((child, index) => (
                            <FolderRecc key={index} folder={child} open={false}/>
                        ))}
                    </ul>
                }
            </li>
        </div>
    )
}

export default FolderRecc


