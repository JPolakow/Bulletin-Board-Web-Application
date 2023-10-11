const express = require("express");
const router = require("express").Router();
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post_model");

//Print all posts to webpage
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Internal Server Error");
  }
});

//Print a single post to webpage
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.send(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Internal Server Error");
  }
});

//Save the post to the DB
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    req.body.datePosted = new Date().toISOString();

    const post = new Post(req.body);
    await post.save();

    res.status(201).send(post);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

//Delete a post from the DB
router.delete("/:id", auth, async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send("Post not found");
    }
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
