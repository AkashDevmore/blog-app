const express = require('express');
const router = express.Router();

let posts = [];

router.get('/', (req, res) => {
  res.render('index', { posts });
});

router.get('/new', (req, res) => {
  res.render('new-post');
});

router.post('/new', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

router.get('/edit/:id', (req, res) => {
  const post = posts[req.params.id];
  res.render('edit-post', { post, id: req.params.id });
});

router.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  posts[req.params.id] = { title, content };
  res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect('/');
});

module.exports = router;
