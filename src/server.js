import express from "express";
const app = express() 
import codeFile from './codeFile.js' 
import runFile from './runFile.js'

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({hello:"World"})
})

app.post("/runcode",async (req,res) =>{
    try {
        const {langauge="cpp", code} =req.body
    if(code==undefined){
        return res.status(400).json({success:false,error:"Empty code body"})
    }

    const filepath = await codeFile(langauge,code);
    const output = await runFile(filepath)
    return res.json({filepath,output})
    } catch (error) {
        res.status(500).json({error})
    }
    
})
app.listen(5000, () =>{
    console.log("Hello Neel");
})