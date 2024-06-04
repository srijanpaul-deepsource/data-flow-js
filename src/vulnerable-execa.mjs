const { command } = require("execa");
import express from "express";

// calls the `execa.command` function and passes the `cmd` parameter to it.
function unsafeFunction(cmd, callback) {
  if (typeof callback === "function") {
    command(`${cmd} && echo 'done'!`, callback); // <- taint reaches sink
  }
}

// passes the argument to `unsafeFunction`.
const exec = (cmd) => {
  if (Math.random() > 0.5) {
    unsafeFunction(cmd, (err) => {
      // <- taint reaches sink (`unsafeFunction(cmd)`)
      if (err) {
        // handle error
      }
    });
  }
};

// An HTTP request handler.
const handler = (req) => {
  // -> `req` is conditionally tainted (when `handler` is an express.js callback)
  const cmd = `ls && ${req.params.cmd}`; // <- taint propagation via variable assignment
  exec(cmd); // <- taint crosses function boundary
};

const app = express();

// If we change the handler, the issue won't be raised above.
app.get("foo", handler);
