const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("./db/mongoose");
const userRouter = require("./routes/users");
const server = require("http").createServer(app);
const socket = require("socket.io");
const io = socket(server);
app.io = io;

const port = process.env.PORT || 5000;

const users = [];

io.on("connection", (socket) => {
  console.log("connected")
  socket.on("connection", (currentUserId) => {
    console.log(currentUserId)
    const isConnected = users.find((user) => {
      return user.currentUserId === currentUserId;
    });
    if (!isConnected && currentUserId) {
      users.push({ socket, currentUserId });
    }
  });

  socket.on("newPost", (post) => {
    // console.log(post , "server")
    socket.broadcast.emit("newPost", post);
  });
});
console.log(users)

app.use(cors());
// app.use(express.json());


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(userRouter);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


