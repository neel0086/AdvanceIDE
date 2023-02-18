import React, { createContext, useState } from 'react'
export const ProviderContext = createContext()
function Provider({ children }) {
    const [data, setData] = useState({
        codeVal: '',
        fileVal: {},
        folderVal: '',
        fontVal: '16px',
        languageMode: 'python3',
        sideBarVal: '',
        themeMode: 'dracula',
        fontStyle: 'Monaco',
    })
    const { codeVal, fileVal, folderVal, fontVal, languageMode, sideBarVal, themeMode, fontStyle } = data;

    const setCodeVal = val => setData(prev => ({ ...prev, codeVal: val }));
    const setFileVal = val => setData(prev => ({ ...prev, fileVal: val }));
    const setFolderVal = val => setData(prev => ({ ...prev, folderVal: val }));
    const setFontVal = val => setData(prev => ({ ...prev, fontVal: val }));
    const setLanguageMode = val => setData(prev => ({ ...prev, languageMode: val }));
    const setSideBarVal = val => { setData(prev => ({ ...prev, sideBarVal: val })); console.log(val) }
    const setThemeMode = val => setData(prev => ({ ...prev, themeMode: val }));
    const setFontStyle = val => setData(prev => ({ ...prev, fontStyle: val }))

    return (
        <ProviderContext.Provider value={{
            codeVal, fileVal, folderVal, fontVal, languageMode, sideBarVal, themeMode, fontStyle,
            setCodeVal, setFileVal, setFolderVal, setFontVal, setLanguageMode, setSideBarVal, setThemeMode, setFontStyle
        }}>
            {children}
        </ProviderContext.Provider>
    )
}

export default Provider