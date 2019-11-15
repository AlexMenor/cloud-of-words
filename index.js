const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
if (process.env.NODE_ENV != "PRODUCTION") require("dotenv").config();

const { onConnection } = require("./onConnection");

app.get("/", (req, res) => {
  res.send("Hey");
});

io.on("connection", socket => onConnection(socket, io));

http.listen(process.env.PORT, () => {
  console.log("Server listening in port " + process.env.PORT);
});
