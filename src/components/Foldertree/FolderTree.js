import React, { useContext, useEffect, useState } from 'react'
import { FolderContext } from '../../context/FolderProvider'
import './FolderTree.css'
import FolderIcon from '../../images/folder.png'
const fs = window.require('fs');
function FolderTree() {
    const [folderActive, setFolderActive] = useState("");
    const { folderVal, setFolderVal } = useContext(FolderContext);
    
    useEffect(() => {
        
        const fileFolder = {}
        


       
        const createDirectoryTree = (fileDir, depth) => {
            let filenames = fs.readdirSync(fileDir);
            var ulHtml=""
            filenames.forEach(async (file) => {
                var stat = fs.lstatSync(fileDir + '\\' + file);
                if (fileDir in fileFolder) {
                    fileFolder[fileDir].push([stat.isFile() ? 'File' : 'Folder', fileDir + '\\' + file, file])
                }
                else {
                    fileFolder[fileDir] = []
                }
                // console.log(stat)
                if (stat.isFile()) {
                    ulHtml+="<li><span>"+file+"</span></li>"
                    // console.log(fileDir + '\\' + file, depth,ulHtml)
                    
                }
                else {
                    ulHtml+="<li><span>"+file+"</span><ul>"+ createDirectoryTree(fileDir + "\\" + file, depth + 1)+"</ul></li>"
                    // console.log(createDirectoryTree(fileDir + "\\" + file, depth + 1))
                }
                

            });
            return ulHtml

        }
        const changeSidebarFolder = (pfiles, folderName) => {
            let filenames = fs.readdirSync(pfiles);
            setFolderActive(folderName.toUpperCase())
            document.querySelector("#myUL").innerHTML=createDirectoryTree(pfiles, 0,"")
            console.log(fileFolder)
        }
        if(folderVal){
            var files = folderVal;
            let cfile = files.webkitRelativePath.replace('/', "\\")
            let pfiles = files.path.replace(cfile, '') + cfile.split("\\")[0]
            changeSidebarFolder(pfiles, cfile.split("\\")[0])
        }

    }, [folderVal])
    return (
        <div className='ft-container'>
            <div className='ft-nav'>
                <span></span>FolderView
            </div>
            <div className='ft-name'>
                <span><img src={FolderIcon} /></span>
                <span>{folderActive}</span>

            </div>
            <div className='treeview'>
                <ul id="myUL">
                    
                </ul>
            </div>


        </div>
    )
}

export default FolderTree
