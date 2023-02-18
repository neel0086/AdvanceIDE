import { useContext, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { ProviderContext } from "../../context/Provider";

export default function SelectLabels() {

  // USESTATE
  const [lang, setLang] = useState("Python3")
  const [theme, setTheme] = useState("Dracula")

  //CONTEXT PROVIDERS


  const {
    languageMode,
    setLanguageMode,
    themeMode,
    setThemeMode,
    fontVal,
    setFontVal } = useContext(ProviderContext)
  //HANDLE THE LANGUAGE CHANGE
  const langHandleChange = (event) => {
    setLanguageMode(event.target.value);
    setLang(event.target.value)
  };

  //HANDLE THEME CHANGE
  const themeHandleChange = (event) => {
    localStorage.setItem('theme', JSON.stringify(event.target.value))
    setThemeMode(event.target.value)
    setTheme(event.target.value);
  };

  //HANDLE FONT CHANGE
  const FontHandleChange = (event) => {
    localStorage.setItem('fontSize', JSON.stringify(event.target.value))
    setFontVal(event.target.value)
  }

  //HANDLE REGAINING OF USER STATE THORUGH LOCALSTORAGE
  const themeFirstUpdate = useRef(true)
  if (themeFirstUpdate.current) {
    if (localStorage.getItem('theme') != null)
      setThemeMode(JSON.parse(localStorage.getItem('theme')))
    if (localStorage.getItem('fontSize') != null)
      setFontVal(JSON.parse(localStorage.getItem('fontSize')))
    themeFirstUpdate.current = false
  }

  // useEffect(() => {
  //   // setMode(theme);
  //   setLang(lang);
  // },[lang]);

  return (
    <>
      {/* LANGAUGE CONTROLLER */}
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-helper-label" >Lang </InputLabel>
        <Select
          sx={{ color: 'white', fontSize: '1rem', height: '35px' }}

          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={languageMode}
          label="Lang"
          onChange={langHandleChange}
        >
          <MenuItem value={"python3"}>Python 3</MenuItem>
          <MenuItem value={"python2"}>Python 2</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
          <MenuItem value={"c_pp"}>C++</MenuItem>
          <MenuItem value={"cpp14"}>C++ 14</MenuItem>
          <MenuItem value={"cpp17"}>C++ 17</MenuItem>
          <MenuItem value={"ruby"}>Ruby</MenuItem>
          <MenuItem value={"php"}>PHP</MenuItem>
          <MenuItem value={"go"}>Go Lang</MenuItem>
          <MenuItem value={"kotlin"}>Kotlin</MenuItem>
        </Select>
      </FormControl>

      {/* THEME CONTROLLER*/}
      <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Theme</InputLabel>
        <Select
          sx={{ color: 'white', fontSize: '1rem', height: '35px' }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={themeMode}
          label="Theme"
          onChange={themeHandleChange}
        // onMouseOver={themeHandleChange}
        >
          <MenuItem value={"dracula"}>Dracula</MenuItem>
          <MenuItem value={"ambiance"}>Ambiance</MenuItem>
          <MenuItem value={"github"}>Github</MenuItem>
          <MenuItem value={"eclipse"}>Eclipse</MenuItem>
          <MenuItem value={"monokai"}>Monokai</MenuItem>
          <MenuItem value={"cobalt"}>Cobalt</MenuItem>
          <MenuItem value={"solarized_light"}>Solarized Light</MenuItem>
          <MenuItem value={"solarized_dark"}>Solarized Dark</MenuItem>
          <MenuItem value={"gob"}>GOB</MenuItem>
          <MenuItem value={"terminal"}>Terminal</MenuItem>
          <MenuItem value={"tomorrow_night"}>tomorrow_night</MenuItem>
        </Select>
      </FormControl>

      {/* FONT CONTROLLER*/}
      <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Fonts</InputLabel>
        <Select
          sx={{ color: 'white', fontSize: '1rem', height: '35px' }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={fontVal}
          label="fonts"
          onChange={FontHandleChange}
        >
          <MenuItem value={"10px"}>10</MenuItem>
          <MenuItem value={"12px"}>12</MenuItem>
          <MenuItem value={"14px"}>14</MenuItem>
          <MenuItem value={"16px"}>16</MenuItem>
          <MenuItem value={"18px"}>18</MenuItem>
          <MenuItem value={"20px"}>20</MenuItem>
          <MenuItem value={"22px"}>22</MenuItem>
          <MenuItem value={"24px"}>24</MenuItem>
          <MenuItem value={"26px"}>26</MenuItem>
          <MenuItem value={"28px"}>28</MenuItem>
          <MenuItem value={"30px"}>30</MenuItem>
          <MenuItem value={"32px"}>32</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
