// Cleaned up version of a real use-case requested by one of our customers. 
const mysql = require("db-mysql");
const http = require("http");

let valTom; // skipcq: JS-0119 : irrelevant to this example (variables should be explicitly initialized).
http.request("https://[redacted]", (res) => {
  res.on("data", (chunk) => {
    valTom = chunk;
  });
});

new mysql.Database({
  hostname: "localhost",
  user: "user",
  password: "password",
  database: "test",
}).connect(function (error) {

  if (error) return;

  const query =
    `INSERT INTO Customers (CustomerName, ContactName) VALUES ('Tom',${valTom});`
  
  this.query(query).execute((err, output)  => {
    if (err) return;
    console.assert(output !== null)
  });
});

