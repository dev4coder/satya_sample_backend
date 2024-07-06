const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: '*', // Allow all origins. For more security, specify the allowed origins.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

let posts = [
    { id: 1, title: "Post 1", body: "This is the body of post 1" },
    { id: 2, title: "Post 2", body: "This is the body of post 2" },
    { id: 3, title: "Post 3", body: "This is the body of post 3" }
];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Get a single post by ID
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

// Create a new post
app.post('/posts', (req, res) => {
    const post = {
        id: posts.length + 1,
        title: req.body.title,
        body: req.body.body
    };
    posts.push(post);
    res.status(201).json(post);
});

// Update a post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');

    post.title = req.body.title;
    post.body = req.body.body;
    res.json(post);
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');

    const deletedPost = posts.splice(postIndex, 1);
    res.json(deletedPost);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
