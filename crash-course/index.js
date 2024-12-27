const http = require("http");
const WebSocketServer = require("websocket").server
let connection = null; //global var for connection, that will be changes later

const httpserver = http.createServer((req, res) => {
    console.log("we have received a request");//first breakpoint, not really necessary just to check connection
})

const websocket = new WebSocketServer({
    "httpServer": httpserver //Pass in the http server that we made,
})


httpserver.listen(8080, () =>
    console.log("server listening on port 8080") //server starts listening for client connection
);


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
        //connection.send("message") from the debug console will send a message to the browser client
        //on the browser console we can send a reply via : ws.send("Hello! I'm client")
        //utf8 is the data type, after sending reply from client we can check the data using this breakpoint
        console.log(`Received message ${message.utf8Data}`)
    })
    // to view message from the server using the browser client we can use this inside the browser console
    //ws.onmessage = message => console.log(`We received server message: ${message.data}`)
    sendevery5seconds(); //calling the function to send msg from server to client  every 5 sec
})



// A new function that sends a message to the client every 5 seconds
// This is specially useful for stuff like video game streaming
function sendevery5seconds() {
    if (connection) {
        connection.send(`Message ${Math.random()}`);
        setTimeout(sendevery5seconds, 5000);
    }

}