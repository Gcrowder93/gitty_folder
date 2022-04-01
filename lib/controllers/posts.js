const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/api/v1/posts', authenticate, async (req, res, net) => {
    try {
      const posts = [
        {
          id: '1',
          title: 'this is post',
        },
      ];

      res.send(posts);
    } catch (error) {
      next(error);
    }
  })

  .post('/api/v1/posts', async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);
      res.send(post);
    } catch (error) {
      next(error);
    }
  });
