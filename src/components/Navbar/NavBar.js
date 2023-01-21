import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './NavBar.css'
import Logo from '../../images/logo.png'
import SelectLabels from '../Dropdown/SelectLabels';
import { FileContext } from '../../context/FileProvider';
import { FolderContext } from '../../context/FolderProvider';
import { CodeContext } from '../../context/CodeProvider';


function NavBar() {
  const { fileVal,setFileVal } = useContext(FileContext);
  const { setFolderVal } = useContext(FolderContext);
  const {codeVal,setCodeVal} = useContext(CodeContext)
  const fs = window.require('fs')
  //TRIGGER A EVENT FILE ADDITION 
  const EditorSpace = (e) => {
    setFileVal({ "path": e.target.files[0]["path"], "name": e.target.files[0]["name"] })
  }

  //TRIGGER A EVENT FOR FOLDER CHANGE
  const selectFolder = (e) => {
    setFolderVal(e.target.files[0])
  }

  const SaveFile = () => {
    if (fs.existsSync(fileVal['path'])) {
      console.log(codeVal,fileVal)
      fs.writeFile(fileVal['path'],codeVal,(err)=>{
        if(err){
          console.log(err)
        }
        else{
          console.log("Sucess");
        }
      })
    }
  }

  const SaveAsFile = () =>{
    
  }

  return (
    <div className='n-container'>

      <AppBar position="static" style={{ backgroundColor: 'rgb(50, 50, 51)' }}>

        <Toolbar variant="dense" sx={{ width: 'inherit' }}>

          <IconButton edge="start" color="inherit" aria-label="menu"
            sx={
              { mr: 1 }
            }>
            <img src={Logo} width="50px" alt='' />
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

                    <Dropdown.Item href="#/action-2">
                      <label onClick={SaveFile}>Save</label>
                    </Dropdown.Item>

                    <Dropdown.Item href="#/action-3">
                      <label onClick={{SaveAsFile}}>Save As</label>
                      </Dropdown.Item>
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
