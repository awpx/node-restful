const express = require('express');
const Post = require('../models/Post');


const router = express();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


//get back all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts)
  } catch(err) {
    res.json({ message: err })
  }
});

//get specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post)

  } catch (err) {
    res.json({ message: err })
  }
})

//submit post using async
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch(err) {
    res.json({ message: err })
  }
});

//delete post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId }) ;
    res.json(removedPost)

  } catch (err) {
    res.json({ message: err })
  }
})

//update post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
      );
    res.json(updatedPost)

  } catch (err) {
    res.json({ message: err })
  }
})

//post using promise
// router.post('/', (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     description: req.body.description
//   })

//   post.save()
//   .then(data => {
//     res.json(data);
//   })
//   .catch(err => {
//     res.json({ message: err })
//   })
// });

module.exports = router;