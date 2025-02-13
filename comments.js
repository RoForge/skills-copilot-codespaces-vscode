// Create web server
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Data
const comments = [
  { id: 1, comment: 'Comment 1' },
  { id: 2, comment: 'Comment 2' },
  { id: 3, comment: 'Comment 3' }
];

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/comments', (req, res) => {
  res.send(comments);
});

app.get('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');
  res.send(comment);
});

app.post('/api/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    comment: req.body.comment
  };
  comments.push(comment);
  res.send(comment);
});

app.put('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');
  comment.comment = req.body.comment;
  res.send(comment);
});

app.delete('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.send(comment);
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));