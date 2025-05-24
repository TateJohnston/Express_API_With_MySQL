"use strict";
const { where } = require("sequelize");
const Models = require("../models");

const getPosts = (res) => {
  Models.Post.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createPost = (data, res) => {
  Models.Post.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updatePost = (req, res) => {
  Models.Post.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const incrementLike = (req, res) => {
  const postId = req.params.id;
  Models.Post.increment("likes", {
    where: { id: postId },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deletePost = (req, res) => {
  Models.Post.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const postView = (req, res) => {
  let postId = req.params.postId;
  Models.Post.findOne({
    where: { id: postId },

    attributes: ["title", "description", "createdAt", "likes"],
    include: [
      {
        model: Models.User,
        attributes: ["firstName", "lastName"],
      },
      {
        model: Models.Comment,
        attributes: ["comment", "createdAt", "updatedAt"],
        include: [
          {
            model: Models.User,
            as: "commenter",
            attributes: ["firstName", "lastName"],
          },
        ],
      },
    ],
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  incrementLike,
  deletePost,
  postView,
};
