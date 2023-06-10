const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

var id = 0;
const posts = {};

app.get('/posts', (_, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const { title } = req.body;
    const currentId = id;
    id = id + 1;
    posts[currentId] = {
        id: currentId, title
    };
    
    await axios.post('http://event-bus-serv:4005/events', {
        type: 'PostCreated',
        data: {
            id: currentId,
            title
        }
    });

    res.status(201).send(posts[currentId]);
});

app.post('/events', (req, res) => {
    console.log('received event: ', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('ver 1.1');
    console.log('Listening on port 4000!')
});