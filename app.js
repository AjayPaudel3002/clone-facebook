const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("./db/mongoose");
const userRouter = require("./routes/users");
const server = require("http").createServer(app);
const socket = require("socket.io");
const { disconnect } = require("process");
const User = require("./models/users");
const moment = require("moment");
const io = socket(server);
app.io = io;

const port = process.env.PORT || 5000;

const users = [];
const messagerUser = [];

io.on("connection", (socket) => {
  socket.on("connection", async (currentUserId) => {
    const isConnected = users.find((user) => {
      return user.currentUserId === currentUserId;
    });
    const isMessengerConnected = messagerUser.find((user) => {
      return user.currentUserId === currentUserId;
    });
    if (!isConnected && currentUserId) {
      users.push({ socket, currentUserId });
    }
    if (isMessengerConnected && currentUserId) {
      messagerUser.forEach((user) => {
        if (user.currentUserId === currentUserId) {
          user.socket = socket;
          user.isActive = true;
          user.lastActive = "current";
        }
      });
    }
    if (!isMessengerConnected && currentUserId) {
      messagerUser.push({
        socket,
        currentUserId,
        lastActive: "current",
        isActive: true,
      });

      try {
        const user = await User.findById(currentUserId);

        const onlineUsers =
          messagerUser &&
          user &&
          messagerUser.filter((item) => {
            return (
              item.currentUserId !== currentUserId &&
              user.friends.includes(item.currentUserId)
            );
          });

        if (onlineUsers && onlineUsers.length) {
          const friends = onlineUsers.map((item) => {
            let data = {
              currentUserId: item.currentUserId,
              lastActive: item.lastActive,
            };
            return data;
          });
          socket.emit("getOnlineUsers", friends);
        }
      } catch (err) {
        console.log(err);
      }

      User.findById(currentUserId)
        .then((user) => {
          const friendSocket =
            user &&
            user.friends &&
            messagerUser.filter((friend) =>
              user.friends.includes(friend.currentUserId)
            );

          const data = messagerUser.map((ele) => {
            return {
              currentUserId: ele.currentUserId,
              lastActive: ele.lastActive,
            };
          });

          if (friendSocket) {
            friendSocket.forEach((friend) => {
              socket.broadcast.to(friend.socket.id).emit("connection", data);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  socket.on("createMessage", (message) => {
    const receiverSocket = messagerUser.filter((user) => {
      return user.currentUserId === message.to._id;
    });

    if (receiverSocket.length) {
      socket.broadcast
        .to(receiverSocket[0].socket.id)
        .emit("newMessage", message);
      const data = {
        message,
        userId: message.from._id,
      };
      socket.broadcast
        .to(receiverSocket[0].socket.id)
        .emit("recentMessage", data);
    }
  });

  socket.on("getOnlineUsers", async (currentUserId) => {
    const user = await User.findById(currentUserId);

    const onlineUsers =
      messagerUser &&
      user &&
      messagerUser.filter((item) => {
        return (
          item.currentUserId !== currentUserId &&
          user.friends.includes(item.currentUserId)
        );
      });

    if (onlineUsers && onlineUsers.length) {
      const friends = onlineUsers.map((item) => {
        let data = {
          currentUserId: item.currentUserId,
          lastActive: item.lastActive,
        };
        return data;
      });
      socket.emit("getOnlineUsers", friends);
    } else {
      socket.emit("getOnlineUsers", onlineUsers);
    }

    User.findById(currentUserId)
      .then((user) => {
        const friendSocket =
          user &&
          user.friends &&
          messagerUser.filter((friend) =>
            user.friends.includes(friend.currentUserId)
          );
        const data = messagerUser.map((ele) => {
          return {
            currentUserId: ele.currentUserId,
            lastActive: ele.lastActive,
          };
        });

        if (friendSocket) {
          friendSocket.forEach((friend) => {
            socket.broadcast.to(friend.socket.id).emit("connection", data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  socket.on("deleteMessage", (data) => {
    const userDetails = messagerUser.filter((user) => {
      return user.currentUserId === data.toUser;
    });
    if (userDetails && userDetails[0] && userDetails.length) {
      socket.broadcast.to(userDetails[0].socket.id).emit("deleteMessage", data);
    }
  });

  socket.on("likeMessage", (data) => {
    const userDetails = messagerUser.filter((user) => {
      return user.currentUserId === data.to;
    });
    if (data && userDetails && userDetails[0] && userDetails.length) {
      socket.broadcast.to(userDetails[0].socket.id).emit("likeMessage", data);
    }
  });

  socket.on("checkScreen", (data) => {
    const { location, toUser } = data;
    const receiverSocket = messagerUser.filter((user) => {
      return user.currentUserId === message.to._id;
    });
    if (location === `/chat/${toUser}`) {
      socket.emit("checkScreen", "onScreen");
    } else {
      socket.emit("checkScreen", null);
    }
  });

  socket.on("newPost", (post) => {
    socket.broadcast.emit("newPost", post);
  });

  socket.on("typing", (data) => {
    const userDetails = messagerUser.filter((user) => {
      return user.currentUserId === data.receiver;
    });
    if (data && userDetails && userDetails[0] && userDetails.length) {
      socket.broadcast.to(userDetails[0].socket.id).emit("typing", data);
    }
  });

  socket.on("disconnect", () => {
    if (socket.id) {
      messagerUser.forEach((user) => {
        if (user.socket.id === socket.id) {
          user.isActive = false;
          user.lastActive = moment.utc().format();

          const data = {
            lastActive: user.lastActive,
            currentUserId: user.currentUserId,
          };

          User.findById(user.currentUserId)
            .then((user) => {
              const friendSocket =
                user &&
                user.friends &&
                messagerUser.filter((friend) =>
                  user.friends.includes(friend.currentUserId)
                );
              if (friendSocket) {
                friendSocket.forEach((friend) => {
                  socket.broadcast
                    .to(friend.socket.id)
                    .emit("disconnectedUser", data);
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  });
});

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
