const mysql = require("db-mysql");
const options = require("./options")
const http = require("http");

let valTom; // skipcq (unrelated to the vulnerability)
http.request(options, (res) => {
  res.on("data", (chunk) => {
    valTom = chunk; // <- taint starts here.
  });
});

new mysql.Database({
  hostname: "localhost",
  user: "user",
  password: "password",
  database: "test",
}).connect(function () {
  // example callback passed to `execute`
  function callback () { /*sample  */}
  const query = `INSERT INTO Customers (CustomerName, ContactName) VALUES ('Tom', ${valTom})`; // <- propagates to DB Query
  this.query(query).execute(callback); // <- taint reaches sink
});
