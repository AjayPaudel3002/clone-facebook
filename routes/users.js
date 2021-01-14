const express = require("express");
const User = require("../models/users");
const auth = require("../auth");
const router = new express.Router();
const userController = require("../controller/userController");
const postController = require("../controller/postController");
const friendRequestController = require("../controller/friendRequestController");
const messageController = require("../controller/messageController");

router.post("/api/sign-up", userController.signUp);

router.post("/api/login", userController.login);

router.post("/api/logout", auth, userController.logout);

router.get("/api/user/:id", userController.getUser);

router.post("/api/add-post", auth, postController.addNewPost);

router.post(
  "/api/friend-request/:toUser",
  auth,
  friendRequestController.sendFriendRequest
);
router.put(
  "/api/accept-request/:toUser",
  auth,
  friendRequestController.acceptFriendRequest
);
router.delete(
  "/api/decline-request/:toUser",
  auth,
  friendRequestController.declineFriendRequest
);

router.get("/api/all-users", userController.getAllUsers);

router.get("/api/all-posts", auth, postController.getAllPosts);

router.get("/api/user/posts/:id", auth, postController.getUsersPost);

router.get("/api/post/:id", auth, postController.getSinglePost);

router.post("/api/add-comment/:id", auth, postController.addComment);

router.post("/api/add-reactions/:id", auth, postController.addReactions);

router.get("/api/non-friends-list", auth, userController.getFriendsSuggestions);

router.get("/api/user-details", auth, userController.getUserFullDetails);

router.get("/api/users/search", auth, userController.searchPeople);

router.put("/api/users/edit", auth, userController.editUsers);

router.get(
  "/api/users/request/:toUser",
  auth,
  friendRequestController.getAllUsersRequest
);

router.get(
  "/api/users/received-request",
  auth,
  friendRequestController.getReceivedRequest
);

router.delete(
  "/api/delete/reaction/:postId",
  auth,
  postController.deleteReactions
);

router.post("/api/add-message/:toUser", auth, messageController.sendMessage);

router.get(
  "/api/private-message/:toUser",
  auth,
  messageController.getAllMessages
);

router.post("/api/message/delete", auth, messageController.deleteForMe);

router.post(
  "/api/message/deleteForAll",
  auth,
  messageController.deleteForEveryone
);

router.post(
  "/api/add/message-reactions/:messageId",
  auth,
  messageController.addMessageReactions
);

router.delete(
  "/api/delete/message-reactions/:messageId",
  auth,
  messageController.deleteMessageReactions
);

router.put("/api/message-status/edit", auth, messageController.editMessage);

module.exports = router;
