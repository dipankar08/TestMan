export const helper_function = `
const exec = require('child_process').exec
// execute function
async function execute(command) {
  return new Promise((resolve, reject) => {
    try {
      exec(command, (error, stdout, stderr) => {
        resolve(stdout+'\\n'+stderr+'\\n'+error)
      })
    } catch (e) {
      reject(e.message)
    }
  })
}

`
