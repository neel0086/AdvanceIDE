const { exec } = window.require('child_process');
const path = require("path")
const fs = require("fs")

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const outputCodes = path.join(__dirname,"outputs")

// if(!fs.existsSync(outputCodes)){
//     fs.mkdirSync(outputCodes,{recursive:true})
// }
const runCpp = (filepath) => {
  const inputFile = "D:\\SDP\\io\\input.txt"
  const outputFile = "D:\\SDP\\io\\output.txt"

  const directoryName = filepath.substring(0, filepath.lastIndexOf("\\"))
  const fileName = filepath.substring(filepath.lastIndexOf("\\")+1,filepath.length)
  const jobId = fileName.split('.')[0]
  const outputPath = path.join(filepath.substring(0,filepath.lastIndexOf("\\") + 1), `${jobId}.out`)
  return new Promise((resolve, reject) => {
    exec(
      `cd ${directoryName} && g++ ${fileName} -o ${jobId}.out && ${jobId}.out < ${inputFile} > ${outputFile}`,

      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  })

}

export default runCpp