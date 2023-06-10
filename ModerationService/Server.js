const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if(type === 'CommentCreated') {
        await new Promise(r => setTimeout(r, 5000));

        const status = data.content.includes('duck') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-serv:4005/events', {
            type : 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content, 
                status
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on Port 4003');
});