import React, { useContext, useEffect, useState } from 'react'
import { FolderContext } from '../../context/FolderProvider'
import './FolderTree.css'
import FolderIcon from '../../images/folder.png'
const fs = window.require('fs');
function FolderTree() {
    const [folderActive, setFolderActive] = useState("");
    const { folderVal } = useContext(FolderContext);

    useEffect(() => {

        const fileFolder = {}
        const createDirectoryTree = (fileDir, depth) => {
            let filenames = fs.readdirSync(fileDir);
            var ulHtml = ""
            filenames.forEach(async (file) => {
                var stat = fs.lstatSync(fileDir + '\\' + file);
                if (fileDir in fileFolder) {
                    fileFolder[fileDir].push([stat.isFile() ? 'File' : 'Folder', fileDir + '\\' + file, file])
                }
                else {
                    fileFolder[fileDir] = []
                }
                if (stat.isFile()) {
                    ulHtml += "<li><span className='caret' onclick='eventHandle()'>" + file + "</span></li>"
                }
                else {
                    ulHtml += "<li><span class='caret' onclick='eventHandle()'>" + file + "</span><ul className='nested'>" + createDirectoryTree(fileDir + "\\" + file, depth + 1) + "</ul></li>"
                }
            });
            return ulHtml
        }

        // RESPOND TO CHANGE IN SIDEBAR FOLDER
        const changeSidebarFolder = (pfiles, folderName) => {
            let filenames = fs.readdirSync(pfiles);
            setFolderActive(folderName.toUpperCase())
            document.querySelector("#myUL").innerHTML = createDirectoryTree(pfiles, 0, "")
        }

        //CONTROLLING FOLDER VIEW (IN PROCESS)
        const folderView = async () => {
            var files = folderVal;
            let cfile = files.webkitRelativePath.replace('/', "\\")
            let pfiles = files.path.replace(cfile, '') + cfile.split("\\")[0]
            changeSidebarFolder(pfiles, cfile.split("\\")[0])
        }
        if (folderVal)
            folderView()
    }, [folderVal])

    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", "#myUL", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }

    // HTML SCRIPTS STARTS
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
