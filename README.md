# Data flow analysis - JavaScript

A sample repository showcasing the data flow analysis capabilities of the DeepSource JavaScript analyzer.
There are three examples, and each one is a security rule, since these are one of the best use cases for DFA.

## Command injection

Some data passed as the URL parameter in an express route is eventually passed to a `cp.exec`, where `cp` is
the `"child_process"` module is Node
DeepSource is able to follow the tainted variable through function boundaries.

## Vulnerable `execa`.

Similar to the command injection rule, we now see the tainted data pass through multiple aliases.
If the `handler` function is not used in an `express.js` callback, DeepSource will not raise the issue.

##  SQL injection

A real use case from one of our customers, where some data is fed into a query from the `db-mysql` function.
