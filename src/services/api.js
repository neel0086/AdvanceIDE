import axios from 'axios'

export const getOutput = async  (userCode,lang) =>{
    const payload ={
        langauge:lang,
        code:userCode
    }
    const output = await axios.post("http://localhost:5000/runcode",payload);
}