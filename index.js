const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
if (process.env.NODE_ENV != "PRODUCTION") require("dotenv").config();

const { onConnection } = require("./onConnection");

const staticPath = path.join(__dirname, "client", "dist");

app.use(express.static(staticPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

io.on("connection", socket => onConnection(socket, io));

http.listen(process.env.PORT, () => {
  console.log("Server listening in port " + process.env.PORT);
});
