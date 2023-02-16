const { exec } = window.require('child_process');
const path = require("path")
const fs = require("fs")
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const outputCodes = path.join(__dirname,"outputs")

// if(!fs.existsSync(outputCodes)){
//     fs.mkdirSync(outputCodes,{recursive:true})
// }
export const runCpp = (filepath) => {

  const directoryName = filepath.substring(0, filepath.lastIndexOf("\\"))
  const fileName = filepath.substring(filepath.lastIndexOf("\\")+1,filepath.length)
  const jobId = fileName.split('.')[0]
  const outputPath = path.join(filepath.substring(0,filepath.lastIndexOf("\\") + 1), `${jobId}.out`)
  console.log("Process started")
  return new Promise((resolve, reject) => {
    exec(
      `cd ${directoryName} && g++ ${fileName} -o ${jobId}.out && ${jobId}.out < ${process.env.REACT_APP_INPUTFILE} > ${process.env.REACT_APP_OUTPUTFILE}`,

      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        console.log("process ended")
        resolve(stdout);
      }
    );
  })

}

export const runPy = (filepath) => {
  const inputFile = "D:\\SDP\\io\\input.txt"
  const outputFile = "D:\\SDP\\io\\output.txt"

  const directoryName = filepath.substring(0, filepath.lastIndexOf("\\"))
  const fileName = filepath.substring(filepath.lastIndexOf("\\")+1,filepath.length)
  const jobId = fileName.split('.')[0]
  const outputPath = path.join(filepath.substring(0,filepath.lastIndexOf("\\") + 1), `${jobId}.out`)
  console.log("Process started")
  return new Promise((resolve, reject) => {
    exec(
      `cd ${directoryName} && python ${fileName} < ${process.env.REACT_APP_INPUTFILE} > ${process.env.REACT_APP_OUTPUTFILE}`,

      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        console.log("process ended")
        resolve(stdout);
      }
    );
  })

}

// export default runCpp