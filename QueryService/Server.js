const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (_, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
        console.log(posts);
    }

    if(type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }

    if(type === 'CommentUpdated') {
        const { id, postId, status } = data;
        posts[postId].comments[id].status = status;
    }
}

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on port 4002');
    try {
        const res = await axios.get("http://event-bus-serv:4005/events");
     
        for (let event of res.data) {
          console.log("Processing event:", event.type);
          handleEvent(event.type, event.data);
        }
      } catch (error) {
        console.log(error.message);
    };
});