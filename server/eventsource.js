const express = require('express');
const cors = require('cors');
const events = require('events');

const emitter = new events.EventEmitter();

const PORT = 5000;

const app = express();

// corseMiddleWare
app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    })
    emitter.on('newMessage', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})

app.post('/new-messages', (req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    res.status(200);
})

app.listen(PORT, () => console.log(`server started ${PORT}`));