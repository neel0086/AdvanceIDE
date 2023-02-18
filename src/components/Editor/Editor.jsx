import React, { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import Box from "@mui/material/Box";
import "ace-builds";
import "ace-builds/webpack-resolver";
import Beautify from "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "./acebuilds";
import './Editor.css'
import { useRef } from 'react';
import Fuse from "fuse.js"
import InputOutput from "../Input/InputOutput";
import { SuggestionContext } from "../../context/SuggestionProvider";
import LeetcodeExtension from "../LeetcodeExtension/LeetcodeExtension";
import { ProviderContext } from "../../context/Provider";
const fs = window.require('fs');
const Editor = () => {
  const { suggestionVal, setSuggestionVal } = useContext(SuggestionContext)
  const [currWord, setCurrWord] = useState("")
  const [suggestionResult,setSuggestionResult] =useState([])

  const { languageMode,
    themeMode,
    fontVal,
    fileVal,
    codeVal,
    setCodeVal } = useContext(ProviderContext)
  // const [suggestionFunctions, setSuggestionFunctions] = useState({});
  const OnChangeHandler = (value) => {
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

  useEffect(() => {

  }, [codeVal])

  // ON SUBMIT OF CODE
  const editorRef = useRef(null);

  window.oncontextmenu = function () {

    const editor = editorRef.current.editor;
    const selectedText = editor.getCopyText();
    const functionNameMatch = selectedText.match(/int\s+(\w+)\s*\(/);

    if (functionNameMatch) {
      const functionName = functionNameMatch[1];
      setSuggestionVal((prevFunctions) => {
        return { ...prevFunctions, [functionName]: selectedText };
      });
      console.log("Added function:", functionName, suggestionVal);
    } else {
      console.log("Selected text does not include a valid function name");
    }
    fs.writeFile("D:\\SDP\\io\\suggestion.json", JSON.stringify({ ...suggestionVal, [functionNameMatch[1]]: selectedText }
    ), err => {

      // Checking for errors
      if (err) throw err;

      console.log("file writing"); // Success

    })
  }
  const fuse = useRef(null);

  useEffect(() => {
    if (suggestionVal) {
      const suggestionFunctionsName = Object.keys(suggestionVal)
      fuse.current = new Fuse(suggestionFunctionsName);
    }
  }, [suggestionVal])

  useEffect(() => {
    if (null !== fuse.current) {
      const result = fuse.current.search(currWord)
      setSuggestionResult(result)
    }
  }, [currWord])
  window.onkeypress = function (event) {
    if (event.key >= 'a' && event.key<='z') {
      setCurrWord(prev => {
        return (prev + event.key)
      })
    } else {
      setCurrWord('');
    }
  }

  return (
    <div style={{ height: '88%' }}>
      <Box elevation={3} sx={{ height: '100%' }}>
        <AceEditor
          ref={editorRef}
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
      <InputOutput suggestionResult={suggestionResult}/>
      <LeetcodeExtension questionId="two-sum" />
    </div>
  );
};

export default Editor;
