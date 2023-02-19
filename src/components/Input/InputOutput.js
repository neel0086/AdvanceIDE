import React, { useContext, useEffect, useRef, useState } from 'react'
import './InputOutput.css'
import Run from "../../images/run.png"
import Save from "../../images/save.png"
import { runCpp, runPy } from '../Editor/run';
import { SuggestionContext } from '../../context/SuggestionProvider';
import { ProviderContext } from '../../context/Provider';
import Cross from "../../images/cross.png"

const fs = window.require('fs');
function InputOutput({ suggestionResult }) {
    const [outputData, setOutputData] = useState();
    const [inputData, setInputData] = useState("");
    
    console.log(suggestionResult)

    const { suggestionVal, setSuggestionVal,closeIo,setCloseIo } = useContext(SuggestionContext)

    const {
        fileVal,
        codeVal,
        setCodeVal,
        languageMode
    } = useContext(ProviderContext)

    const outputFlag = useRef()
    useEffect(() => {
        if (!outputFlag.current) {
            outputFlag.current = true
            return
        }
        fs.readFile(process.env.REACT_APP_OUTPUTFILE, 'utf8', function (err, data) {
            setOutputData(data)
        })
    }, [outputData])
    const errorHandle = () => {
        fs.writeFile(process.env.REACT_APP_OUTPUTFILE, "Error select appropiate language according to your file", (err) => {
            if (err) {
            }
            else {
                setOutputData("Error")
            }
        })
    }
    const handleSubmit = async () => {

        try {
            if (languageMode == "c_pp") {

                if (fileVal['path'].split('.')[1] == "cpp") {
                    setOutputData(await runCpp(fileVal['path']))
                }
                else {
                    errorHandle()
                }

            }
            else if (languageMode == "python3" || languageMode == "python2") {
                if (fileVal['path'].split('.')[1] == "py") {

                    setOutputData(await runPy(fileVal['path']))
                }
                else {
                    errorHandle()
                }
            }
            // setOutputData(await runPy(fileVal['path']))

        }
        catch (e) { console.log(e) }
    }
    const SaveFile = () => {
        if (fs.existsSync(fileVal['path'])) {
            fs.writeFile(fileVal['path'], codeVal, (err) => {
                if (err) {
                }
                else {
                    console.log("Sucess");
                }
            })
        }
    }

    const SaveInput = (e) => {
        setInputData(e.target.value)

        fs.writeFile("D:\\SDP\\io\\input.txt", e.target.value, (err) => {
            if (err) {
            }
            else {
                console.log("Sucess");
            }

        })
    }
    
    const copyHelper = (key) => {
        navigator.clipboard.writeText(suggestionVal[key]);
    }
    return (
        <div className="io-screen" style={{ height: '100%', width: '100%' }}>
            <div className='io-navbar'>
                <div className='suggestion'>
                    {suggestionResult && suggestionResult.map((key, index) => {
                        return <span onClick={() => copyHelper(key.item)}>{key.item}</span>
                    })}

                    {/* <span>hello</span> */}

                </div>
                <div className='runBtn'>
                    <img src={Save} onClick={SaveFile} />
                    <img src={Run} onClick={handleSubmit} />
                    <img src={Cross} onClick={handleSubmit} />

                    {/* <img src={CloseBtn} className="closeBtn"/> */}
                </div>
            </div>
            <div className="inp_out">
                <div className='io-area'>
                    
                    <textarea className='io-area io-area-text' onChange={(e) => SaveInput(e)} value={inputData} spellCheck='false' />
                </div>
                <div className='io-area'>
                    <textarea className='io-area io-area-text' spellCheck='false' value={outputData} />
                </div>
            </div>
        </div>
    )
}

export default InputOutput
