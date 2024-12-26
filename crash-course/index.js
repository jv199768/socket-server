const http = require("http");
const WebSokcetServer = require("websocket").server
let connection = null; //global var for connection, that will be changes later

const httpserver = http.createServer((req, res) => {
    console.log("we have received a request");//first breakpoint, not really necessary just to check connection
})

const websocket = new WebSokcetServer({
    "httpServer": httpserver //Pass in the http server that we made,
})

// On-Request Event where raw http server requests the websocket server connection
// http server sends a UPGRADE 1.1 header that requests the websocket server to switch protocol to http 1.1 for TCP connection
websocket.on("request", request => {
    connection = request.accept(null, request.origin) //the websocket server can choose weather to accept the request or not , 
    //accepting sends back swithing protocol 101 response , which opens up the full duplex communication between client & server
    //1st parameter is a custom protocol , could be for chatting , gaming, null means we'll accept anything, no specific protocol needed
    //2nd paramter - we can check the origin of the request, generally the url the request was sent from , to checck if it's atrusted source
    //Below are the events that we can use , open, close, message etc.The main point of WebSockets is having these events.
    //When each event occurs we can get a certain response from server automatically without the client needing to initiate a request
    connection.on("open", () => console.log("OPEN"))
    connection.on("close", () => console.log("CLOSE"))
    connection.on("message", message => { // Fucntion to do something if server receives a message
        console.log(`Received message ${message.utf8Data}`)
    })
})

httpserver.listen(8080, () =>
    console.log("server listening on port 8080")
);