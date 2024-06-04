/**
 * COMMAND INJECTION
 * ------------------
 * This is a dummy express.js server that receives input from URL parameters,
 * and passes it through multiple functions, making the tainted data eventually reach
 * a `cp.exec`.
 */

import express from "express"
import cp from "child_process"

const app = express()
app.get("/execute", (req) => { // <- `req`: Taint source
  const cmd = req.params.command // <- taint propagated via variable assignment
  if (typeof cmd === "string") {
    // This code path eventually ends up calling "cp.exec".
    // calls_unsafeFunction -> unsafeFunction -> cp.exec.
    calls_unsafeFunction(cmd) // <- taint sent into function call.
  }
})

function calls_unsafeFunction(cmd) {
  const modifiedCmd = `ls && ${cmd}`; // <- taint propagated via an alias.
  if (cmd) {
   unsafeFunction(modifiedCmd, console.log)  // <- taint crosses function boundary
  }
}

function unsafeFunction(cmd, callback) {
  if (typeof callback === "function") {
    cp.exec(`${cmd} && echo 'done'!`, callback) // <- taint reaches sink
  }
}

