const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

var id = 0;
const posts = {};

app.get('/posts', (_, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const { title } = req.body;

    posts[id] = {
        id, title
    };
    
    res.status(201).send(posts[id]);
    id = id + 1;
});

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});