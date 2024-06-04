const { command } = require("execa");
import express from "express"

const exec = cmd => { command(cmd) }

const handler = (req) => {
  const cmd = `ls && ${req.params.cmd}`
  exec(cmd);
}

const app = express()
app.get("foo", handler)
