const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors')
const {db, Genre} = require('./db')

app.use(express.static('public', {index: false}))
app.use(cors())

// db.sync().then(() => {
//     console.log('DB synced my guy')
// }).catch(() => {
//     console.log('Try something else brudda')
// })

app.get('/', (req, res) => {
    res.sendStatus(200);
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/api/genres', (req, res) => {
    Genre.findAll({
        where: {
            isTopLevel: true
        }
    }).then(results => {
        console.log(results.toString())
        const genres = results.map(genre => {
            return {
                name: genre.displayName,
                size: Math.random() * 5 + 1
            }
        })
    
        res.send(genres)
    }).catch(err => {
        throw err
    })

})

app.listen(port, () => {
    console.log(`Server fooling at http://localhost:${port}/`);
})