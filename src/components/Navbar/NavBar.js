import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  Box
} from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './NavBar.css'
import Logo from '../../images/logo.png'
import SelectLabels from '../Dropdown/SelectLabels';
import { FileContext } from '../../context/FileProvider';
import { FolderContext } from '../../context/FolderProvider';
const fs = window.require('fs');


function NavBar() {
  const { fileVal, setFileVal } = useContext(FileContext);
  const {folderVal,setFolderVal} = useContext(FolderContext);
  const fileFolder = {}
  const EditorSpace = (e) => {
    setFileVal(e.target.files[0])
    console.log(e.target.files[0])
  }

  const selectFolder = (e) => {
    console.log("Hello")

    var files = e.target.files[0];

    let cfile = files.webkitRelativePath.replace('/', "\\")
    let pfiles = files.path.replace(cfile, '') + cfile.split("\\")[0]
    changeSidebarFolder(pfiles,cfile.split("\\")[0])


  }
  const createDirectoryTree = (fileDir,depth) =>{
    let filenames = fs.readdirSync(fileDir);
    filenames.forEach((file) => {
      var stat = fs.lstatSync(fileDir+'\\'+file);
      if(fileDir in fileFolder){
        fileFolder[fileDir].push([stat.isFile()?'File':'Folder',fileDir+'\\'+file,file])
      }
      else{
        fileFolder[fileDir]=[]
      }
      
      // console.log(stat)
      if(stat.isFile()){
        console.log(fileDir+'\\'+file,depth)
      }
      else{
        createDirectoryTree(fileDir+"\\"+file,depth+1)
      }
    });
    
  }
  const changeSidebarFolder = (pfiles,folderName) => {
    let filenames = fs.readdirSync(pfiles);
    setFolderVal(folderName.toUpperCase())
    createDirectoryTree(pfiles,0)
    console.log(fileFolder)
    
    

    // if (pfiles) {
    //   fs.readFile(pfiles, 'utf8', function (err, data) {
    //     console.log(data);

    //   })
    // }
  }



  return (
    <div className='n-container'>

      <AppBar position="static" style={{ backgroundColor: 'rgb(50, 50, 51)' }}>

        <Toolbar variant="dense" sx={{ width: 'inherit' }}>

          <IconButton edge="start" color="inherit" aria-label="menu"
            sx={
              { mr: 1 }
            }>
            <img src={Logo} width="50px" />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 'inherit' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" color="inherit" component="div">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    File
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                        New File
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={EditorSpace}

                      />

                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <label htmlFor="folder" style={{ cursor: 'pointer' }}>Open folder
                      </label>
                      <input
                        type="file"
                        directory=""
                        webkitdirectory="" multiple
                        id="folder"
                        style={{ display: "none" }}
                        onChange={selectFolder} /></Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Save As</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Typography>

              <Typography variant="h6" color="inherit" component="div">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Edit
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Typography>

              <Typography variant="h6" color="inherit" component="div">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Help
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Typography>
            </Box>
            <Box sx={{ mr: 2 }}>
              <Typography>
                <SelectLabels />
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>


    </div>
  )
}

export default NavBar
