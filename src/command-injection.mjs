/**
 * COMMAND INJECTION
 * ------------------
 * A sample showcasing our call graph and taint tracking. 
 * This is a dummy express.js server that receives input from URL parameters,
 * and passes it through multiple functions, making the tainted data eventually reach
 * a `cp.exec`.
 */

import express from "express"
import cp from "child_process"

const app = express()
app.get("/execute", (req) => {
  const cmd = req.params.command
  if (typeof cmd === "string") {
    // This code path eventually ends up calling "cp.exec".
    // calls_unsafeFunction -> unsafeFunction -> cp.exec.
    calls_unsafeFunction(cmd)
  }
})

function calls_unsafeFunction(cmd) {
  const modifiedCmd = `ls && ${cmd}`;
  if (cmd) {
   unsafeFunction(modifiedCmd, console.log) 
  }
}

function unsafeFunction(cmd, callback) {
  if (typeof callback === "function") {
    cp.exec(`${cmd} && echo 'done'!`, callback)
  }
}

