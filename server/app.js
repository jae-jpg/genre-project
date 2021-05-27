const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const {db} = require('./db')

app.use(express.static('public', {index: false}));

db.sync({force: true}).then(() => {
    console.log('DB synced my guy')
}).catch(() => {
    console.log('Try something else brudda')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server fooling at http://localhost:${port}/`);
})