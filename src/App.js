import Editor from "./components/Editor/Editor";
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
import Tree from "./components/treeTesting/Tree";
import Settings from "./components/settings/Settings";
import CodeProvider from "./context/CodeProvider";
import InputOutput from "./components/Input/InputOutput";
import SuggestionProvider from "./context/SuggestionProvider";
import Provider from "./context/Provider";
import LeetcodeExtension from "./components/LeetcodeExtension/LeetcodeExtension";
import MatrixTesting from "./components/matrixTesting/MatrixTesting";
import SidebarDisplay from "./SidebarDisplay";


function App() {


  // const onClickHandler = async () => {
  //   try {
  //     let program = {
  //       script: code,
  //       stdin: input,
  //       language: lang,
  //       versionIndex: "0"
  //     };

  //     setOutput(loading);

  //     await axios({
  //       method: "GET",
  //       url: process.env.REACT_APP_BACKEND_URL,
  //       params: {
  //         data: program
  //       }
  //     }).then((response) => {
  //       let out = response.data.output;
  //       out = out.split("\n").map((line) => <p key={line}>
  //         {line}</p>);
  //       setOutput(out);
  //     }).catch((err) => {
  //       setOutput("");
  //       console.log("Error in axios request: ", err);
  //     });
  //   } catch (err) {
  //     console.log("Error occured in onClickHandler function in App.js: ", err);
  //     setOutput("");
  //   }
  // };

  return (
    <div className="App">
      {/* <LanguageProvider>
        <ThemeModeProvider>
          <FontProvider>
            <FileProvider>
              <FolderProvider>
                <CodeProvider>
                  <SideBarProvider> */}
                    <SuggestionProvider>
                      <Provider>
                        <NavBar />

                        <div className="handleMainUi">

                          <SideBar />
                          <div style={{ width: '100%', display: 'flex' }}>
                            <SidebarDisplay />
                            
                            


                            <div className="editor-Area" >
                              <FileSlider />
                              <Editor />

                            </div>
                          </div>
                        </div>

                        {/* <Editor mode={mode} lang={lang} setCode={setCode} /> */}
                      </Provider>
                     </SuggestionProvider>
                 {/* </SideBarProvider>
                </CodeProvider>
              </FolderProvider>
            </FileProvider>
          </FontProvider>
        </ThemeModeProvider>
      </LanguageProvider> */}

    </div>

  );
}

export default App;
