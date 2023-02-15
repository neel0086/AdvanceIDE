
import React, { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import Box from "@mui/material/Box";
import "ace-builds";
import "ace-builds/webpack-resolver";
import Beautify from "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "./acebuilds";
import { LanguageContext } from "../../context/LanguageProvider";
import { ThemeModeContext } from "../../context/ThemeModeProvider";
import { FontContext } from "../../context/FontProvider";
import './Editor.css'
import { FileContext } from "../../context/FileProvider";
import { getOutput } from "../../services/api";
import { CodeContext } from "../../context/CodeProvider";
import { useRef } from 'react';

import runCpp from "./run";
import InputOutput from "../Input/InputOutput";
// import { TRUE } from "node-sass";
const fs = window.require('fs');
const { exec } = window.require('child_process');

const ipcRenderer = window.require('electron')


const Editor = (props) => {
  const [code, setCode] = useState();
  const [output,setOutput] = useState();

  const { languageMode, setLanguageMode } = useContext(LanguageContext)
  const { themeMode, setThemeMode } = useContext(ThemeModeContext)
  const { fontVal, setFontVal } = useContext(FontContext)
  const { fileVal, setFileVal } = useContext(FileContext);
  const { codeVal, setCodeVal } = useContext(CodeContext)
  const OnChangeHandler = (value) => {
    const suggestions = document.querySelector('.ace_text-layer')
    // fs.readdir("", (err, files) => {
    //   if (err)
    //     
    //   else {
    //     // 
    //     // 
    //     files.forEach(file => {
    //       
    //     })
    //   }
    // })
    //   fs.readFile('D:\\SDP\\frontend\\.gitignore', 'utf8', function(err, data){

    //     // Display the file content
    //     
    // });
    setCodeVal(value);
  };

  //SETCODE ON TERMINAL WHENEVER FILE CHANGES
  useEffect(() => {
    if (fileVal['path']) {
      fs.readFile(fileVal['path'], 'utf8', function (err, data) {
        setCodeVal(data);
      })
    }
  }, [fileVal])
  const OnBlurHandler = () => {
    setCodeVal(codeVal);
  };

  // ON SUBMIT OF CODE
  const handleSubmit = async () => {

    // Synchronous message emmiter and handler
    //  console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping')) 
    try {
      await runCpp(fileVal['path'])
      setOutput("changed state")
      // console.log(output)
      // setOutput(output)
    }
    catch (e) { console.log(e) }
  }


  const [formattedCode, setFormattedCode] = useState('');
  const codeRef = useRef(null);

 




  return (
    <div style={{ height: '50%' }}>
      <button onClick={handleSubmit}>Hello</button>
      <Box elevation={3} sx={{ height: '100%' }}>
        <AceEditor
          mode={languageMode == "python3" || languageMode == "python2" ? "python" : languageMode}
          theme={themeMode}
          onChange={OnChangeHandler}
          onBlur={OnBlurHandler}
          commands={Beautify.commands}
          name="ace-editor"
          value={codeVal}
          editorProps={{ $blockScrolling: true }}
          style={{ width: "100%", height: '100%' }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            highlightActiveLine: true,
            showGutter: true,
            autoScrollEditorIntoView: true,
            showPrintMargin: false,
            fontSize: `${fontVal}`,
            fontFamily: "Consolas, 'Courier New', monospace",
          }}
        />
        
      </Box>
      <InputOutput output={output}/>
    </div>
  );
};

export default Editor;
