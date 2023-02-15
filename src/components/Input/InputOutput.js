import React, { useEffect, useState } from 'react'
import './InputOutput.css'
const fs = window.require('fs');
function InputOutput({output}) {
    const [outputData,setOutputData] = useState();
    useEffect(()=>{
        fs.readFile("D:\\SDP\\io\\output.txt", 'utf8', function (err, data) {
            setOutputData(data)
          })
    })
    return (
        <div className='' style={{height:'100%',width:'100%'}}> 
            <div className="inp_out" >
                <textarea className='io-area ' spellCheck='false' />
                <textarea className='io-area' spellCheck='false' value={outputData}/>
                
            </div>
        </div>
    )
}

export default InputOutput
