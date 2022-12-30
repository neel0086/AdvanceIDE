import React, { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import Box from "@mui/material/Box";
import "ace-builds";
import "ace-builds/webpack-resolver";
import Beautify from "ace-builds/src-noconflict/ext-beautify";
import CodeLens from "ace-builds/src-noconflict/ext-code_lens";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "./acebuilds";
import langForEditor from "./langForEditor";
import { LanguageContext } from "../../context/LanguageProvider";
import { ThemeModeContext } from "../../context/ThemeModeProvider";
import { FontContext } from "../../context/FontProvider";
import './Editor.css'
import { FileContext } from "../../context/FileProvider";
import { height } from "@mui/system";
import { getOutput } from "../../services/api";
const fs = window.require('fs');


const Editor = (props) => {
  const [code, setCode] = useState();
  const { languageMode, setLanguageMode } = useContext(LanguageContext)
  const { themeMode, setThemeMode } = useContext(ThemeModeContext)
  const { fontVal, setFontVal } = useContext(FontContext)
  const { fileVal, setFileVal } = useContext(FileContext);

  const OnChangeHandler = (value) => {
    // fs.readdir("", (err, files) => {
    //   if (err)
    //     console.log(err);
    //   else {
    //     // console.log("Current directory is: "+__dirname)
    //     // console.log("\nCurrent directory filenames:");
    //     files.forEach(file => {
    //       console.log(file);
    //     })
    //   }
    // })
    //   fs.readFile('D:\\SDP\\frontend\\.gitignore', 'utf8', function(err, data){

    //     // Display the file content
    //     console.log(data);
    // });
    setCode(value);
  };

  useEffect(() => {
    // console.log(fileVal['path'])
    if (fileVal['path']) {
      fs.readFile(fileVal['path'], 'utf8', function (err, data) {
        console.log(data);
        setCode(data);
      })
    }
  }, [fileVal])

  const OnBlurHandler = () => {
    setCode(code);
  };

  const handleSubmit = () =>{
    getOutput(code,languageMode);
  }
  return (
  <>
    <Box elevation={3} sx={{ flex: 0.8,height:'82.5vh'}}>
      <AceEditor
        mode={languageMode == "python3" || languageMode == "python2" ? "python" : languageMode}
        theme={themeMode}
        onChange={OnChangeHandler}
        onBlur={OnBlurHandler}
        commands={Beautify.commands}
        name="ace-editor"
        value={code}
        editorProps={{ $blockScrolling: true }}
        style={{ width: "100%",height:'inherit' }}
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
    <Box sx={{height:'2.5vh'}}>
      <button style={{padding:'1rem'}} onClick={handleSubmit}>Submit</button>
    </Box>
    </>
  );
};

export default Editor;
