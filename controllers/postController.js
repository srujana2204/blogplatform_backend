const Post = require('../models/postModel');

exports.getPosts = (req, res) => {
  Post.getAllPosts((err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
};

exports.addPost = (req, res) => {
  const { title, content } = req.body;
  Post.createPost({ title, content }, (err) => {
    if (err) return res.status(500).send('Failed to add post');
    res.send('Post created');
  });
};
