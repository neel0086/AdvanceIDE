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
    setCode(value);
  };

  //SETCODE ON TERMINAL WHENEVER FILE CHANGES
  useEffect(() => {
    if (fileVal['path']) {
      fs.readFile(fileVal['path'], 'utf8', function (err, data) {
        setCode(data);
      })
    }
  }, [fileVal])
  const OnBlurHandler = () => {
    setCode(code);
  };

  // ON SUBMIT OF CODE
  const handleSubmit = () => {
    getOutput(code, languageMode);
  }
  return (
    <>
      <Box elevation={3} sx={{ height: '100%' }}>
        <AceEditor
          mode={languageMode == "python3" || languageMode == "python2" ? "python" : languageMode}
          theme={themeMode}
          onChange={OnChangeHandler}
          onBlur={OnBlurHandler}
          commands={Beautify.commands}
          name="ace-editor"
          value={code}
          editorProps={{ $blockScrolling: true }}
          style={{ width: "100%", height: 'inherit' }}
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
    </>
  );
};

export default Editor;
