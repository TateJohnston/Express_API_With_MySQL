"use strict";
const User = require("./user"); //require the model
const Post = require("./post");

async function init() {
  await User.sync(); // sync the model
  // also sync any extra models here
}
async function init() {
  await Post.sync(); // sync the model
  // also sync any extra models here
}
init();

module.exports = {
  Post,
  User, // export the model
  // also export any extra models here
};
