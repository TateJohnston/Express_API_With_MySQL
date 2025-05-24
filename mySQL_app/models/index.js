"use strict";
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, { foreignKey: "userID" });
Post.belongsTo(User, { foreignKey: "userID" });
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(User, { foreignKey: "userID", as: "commenter" });

async function init() {
  await User.sync();
  await Post.sync();
  await Comment.sync();
}

init();

module.exports = {
  Post,
  User,
  Comment,
};
