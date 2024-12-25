const http = require("http");

const httpserver = http.createServer((req, res) => {
    console.log("we have received a request");
})

httpserver.listen(8080, () =>
    console.log("server listening on port 8080")
);