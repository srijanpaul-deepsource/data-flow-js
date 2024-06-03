const { command } = require("execa");
import express from "express"
const app = express()

const exec = cmd => { command(cmd) }

const handler = (req) => {
  const cmd = `ls && ${req.params.cmd}`
  exec(cmd);
}

app.get("foo", handler)
