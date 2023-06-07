const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const commentsByPostId = {};
var commentId = 0;

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
    console.log(req.params.id);
});

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const currentId = commentId;
    commentId = commentId + 1;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: currentId, content, status: 'pending' });
    commentsByPostId[req.params.id] = comments;
    console.log(req.params.id);
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data : {
            id: currentId,
            content,
            status: 'pending',
            postId: req.params.id
        }
    });
    
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type === 'CommentModerated') {
        const { id, postId, status, content } = data;
        commentsByPostId[postId][id].status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data : {
                id,
                status,
                postId,
                content
            }
        });
    }
    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});