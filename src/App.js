import { useState } from "react";
import Editor from "./components/Editor/Editor";
import Output from "./components/Output/Output";
import ResponsiveAppBar from "./components/MainNavigation/ResponsiveAppBar";
import Input from "./components/Input/Input";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Grid, CircularProgress } from "@mui/material";
import NavBar from "./components/Navbar/NavBar";
import SideBar from "./components/Sidebar/SideBar";
import LanguageProvider from "./context/LanguageProvider";
import ThemeModeProvider from "./context/ThemeModeProvider";
import FontProvider from "./context/FontProvider";
import './App.css'
import FileProvider from "./context/FileProvider";
import FileSlider from "./components/fileslider/FileSlider";
import SidebarExpandable from "./components/Sidebar/SidebarExpandable";
import SideBarProvider from "./context/SideBarProvider";
import FolderProvider from "./context/FolderProvider";
import InputOuput from "./components/bottombar/InputOuput";
import Tree from "./components/treeTesting/Tree";
const axios = require("axios");

const theme = createTheme({
  palette: {
    mode: "dark"
  }
});

function App() {
  const [mode, setMode] = useState("dracula");
  const [lang, setLang] = useState("python3");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("");

  const loading = <CircularProgress color="success" />;

  const onClickHandler = async () => {
    try {
      let program = {
        script: code,
        stdin: input,
        language: lang,
        versionIndex: "0"
      };

      setOutput(loading);

      await axios({
        method: "GET",
        url: process.env.REACT_APP_BACKEND_URL,
        params: {
          data: program
        }
      }).then((response) => {
        let out = response.data.output;
        out = out.split("\n").map((line) => <p key={line}>
          {line}</p>);
        setOutput(out);
      }).catch((err) => {
        setOutput("");
        console.log("Error in axios request: ", err);
      });
    } catch (err) {
      console.log("Error occured in onClickHandler function in App.js: ", err);
      setOutput("");
    }
  };

  return (
    <div class="App">
      <LanguageProvider>
        <ThemeModeProvider>
          <FontProvider>
            <FileProvider>
              <FolderProvider>
                <NavBar />
                <div className="handleMainUi">
                  <SideBarProvider>
                    <SideBar />
                    <SidebarExpandable />
                    <Tree />
                  </SideBarProvider>
                  <div className="editor-Area" >
                    <FileSlider />
                    <Editor />
                    {/* <InputOuput /> */}
                  </div>

                </div>

                {/* <Editor mode={mode} lang={lang} setCode={setCode} /> */}
              </FolderProvider>
            </FileProvider>
          </FontProvider>
        </ThemeModeProvider>
      </LanguageProvider>

    </div>
    
  );
}

export default App;
