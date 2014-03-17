webpack-injectable
==================

A webpack loader that turns a commonjs module into one whose dependencies can be injected

Let's say we have a file called src/lib/db.js
```javascript
var retrieveHello = require("db/retrieveHello")
module.exports = function db() {
    return retrieveHello("pgsql://mypgserver")
}
```

and that hello.js uses that:
```javascript
var db = require("./db");
function hello() {
    return db();
}

module.exports = hello;
```
Then you're tests will fail because (a) you're missing the javascript module
that implements retrieveHello and even if you would npm install it, your test
would be dependant on `pgsql://mypgserver`.

Instead your test should inject a shim for db.js

```javascript
/**globals console*/
function dbShim() {
    return "Hello tested and injected world!";
}
var helloMaker = require("jester-tester/src/injectable!./hello");
var hello = helloMaker({"./db": dbShim})

describe("Greetings", function() {
    it("returns `hello world`", function() {
        expect(hello()).toBe("Hello tested and injected world!");
    });
});
```
I encourage you to log the helloMaker function to the console so you can see
what happens under the hood. It's not really magical.
