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
import { ProviderContext } from "../../context/Provider";
import { Range } from 'ace-builds';
import backArrow from '../../images/backArrow.png'
import ace from 'ace-builds';
import { Alert } from "react-bootstrap";
const fs = window.require('fs');
const Editor = () => {
  const { suggestionVal, setSuggestionVal } = useContext(SuggestionContext)
  const [currWord, setCurrWord] = useState("")
  const [suggestionResult, setSuggestionResult] = useState([])
  const [openTools, setOpenTools] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [AlertText, setAlertText] = useState("")

  function handleShowAlert(alertMssg) {
    setAlertText(alertMssg)
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500); // Hide alert after 5 seconds
  }

  const { languageMode,
    themeMode,
    fontVal,
    fileVal,
    codeVal,
    setCodeVal } = useContext(ProviderContext)
  const { closeIo } = useContext(SuggestionContext)
  // const [suggestionFunctions, setSuggestionFunctions] = useState({});
  const OnChangeHandler = (value) => {
    setCodeVal(value);


  };

  //SETCODE ON TERMINAL WHENEVER FILE CHANGES
  useEffect(() => {
    if (fileVal && fileVal['path']) {
      fs.readFile(fileVal['path'], 'utf8', function (err, data) {
        setCodeVal(data);
      })
    }
    else {
      setCodeVal("")
    }
  }, [fileVal])
  const OnBlurHandler = () => {
    setCodeVal(codeVal);
  };

  useEffect(() => {

  }, [codeVal])

  // ON SUBMIT OF CODE
  const editorRef = useRef(null);



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
    if (event.key >= 'a' && event.key <= 'z') {
      setCurrWord(prev => {
        return (prev + event.key)
      })
    } else {
      setCurrWord('');
    }
  }

  const [searchValue, setSearchValue] = useState('');



  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

  const handleSearch = () => {
    const editor = ace.edit('ace-editor');
    editor.find(searchValue);
  };

  const handleReplace = () => {
    const editor = ace.edit('ace-editor');
    editor.replace(searchValue);
  };

  const handleReplaceAll = () => {
    const editor = ace.edit('ace-editor');
    editor.replaceAll(searchValue);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    console.log("Hello")
  };
  const addSuggestionFunction = (event) => {
    event.preventDefault();

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
    console.log('clicked')
  }
  const copyOnClick = (event) => {
    event.preventDefault();

    const editor = editorRef.current.editor;
    const selectedText = editor.getCopyText();
    navigator.clipboard.writeText(selectedText)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }
  const pasteOnClick = (event) => {
    event.preventDefault();
    navigator.clipboard.readText()
      .then((text) => {
        console.log('Text pasted from clipboard:', text);
        const cursorPosition = editorRef.current.editor.getCursorPosition();
        const range = new Range(cursorPosition.row, cursorPosition.column, cursorPosition.row, cursorPosition.column);
        editorRef.current.editor.selection.setRange(range);
        editorRef.current.editor.insert(text);
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }
  const inputStyle = { border: 'none', outline: 'none', width: '80%', height: "1.8rem", color: "var(--white)", background: "var(--black)" }
  const inputStyle_button = { border: 'none', outline: 'none', width: "5.8%", height: "1.5rem", marginRight: '5px' }
  return (
    <div style={{ height: `${closeIo}`, position: 'relative' }} onContextMenu={handleContextMenu}>


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
        >


        </AceEditor>


      </Box>
      <InputOutput suggestionResult={suggestionResult} closeIo={closeIo} />
      {/* <LeetcodeExtension questionSlug="two-sum" /> */}
      <Alert variant="primary" style={{ position: 'absolute', top: "-50px", left: '650px', width: 'fit-content', fontSize: '18px', color: 'black', fontFamily: 'Roboto' }} show={showAlert} onClose={() => setShowAlert(false)} >
        <span style={{ fontWeight: 'bold', letterSpacing: "1.5px" }}>{AlertText}</span>
      </Alert>
      <div className="context-options">
        {openTools ?
          <><span className="btn-tool" onClick={(e)=>{addSuggestionFunction(e);handleShowAlert("Function added to snippet")}} title='Select a whole function and click'>Add</span>
            <span className="btn-tool" onClick={(e)=>{copyOnClick(e);handleShowAlert("Text copied to clipboard")}}>Copy</span>
            <span className="btn-tool" onClick={pasteOnClick}>Paste</span>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search"
              spellCheck="false"
            />
            <span className="btn-tool" onClick={handleSearch}>Find</span>
            <span className="btn-tool" onClick={handleReplace}>Replace</span>
            <span className="btn-tool" onClick={handleReplaceAll}>ReplaceAll</span>
            <span className="btn-tool" onClick={() => setOpenTools(false)}><img src={backArrow} /></span>
          </>
          :
          <div className="btn-tool" onClick={() => setOpenTools(true)}>
            <span>
              Open Tools
            </span>
          </div>
        }
      </div>
    </div>
  );
};

export default Editor;
