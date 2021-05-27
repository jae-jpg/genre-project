const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors')
const {Genre, GenreRelationship} = require('./db')
const {Op} = require('sequelize')
const axios = require('axios')

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

// TODO: Make a real serializer
app.get('/api/genres', (req, res) => {
    Genre.findAll({
        where: {
            isTopLevel: true
        }
    }).then(results => {
        const genres = results.map(genre => {
            return {
                name: genre.displayName,
                size: Math.random() * 5 + 1,
                wikiUrl: genre.wikUrl,
            }
        })
    
        res.send(genres)
    }).catch(err => {
        throw err
    })
})

/**
 * Get all child genres for :genre
 */
app.get('/api/genres/:genre', (req, res) => {
    // Find the parent Genre and eager load all child Genres
    Genre.findOne({
        where: {
            displayName: req.params.genre
        },
        include: {
            association: 'Children',
            as: 'Children',
        },
    }).then(parentGenre => {
        // Serialize child genres
        const childGenres = parentGenre.dataValues.Children.map(childGenre => {
            return {
                name: childGenre.displayName,
                size: Math.random() * 5 + 1,
                wikiUrl: childGenre.wikiUrl,
            }
        })

        // Request Wikipedia page for parent genre
        const wikiUrl = `https://en.wikipedia.org/${parentGenre.wikiUrl}`
        axios.get(wikiUrl).then(response => {
            const wikiContent = response.data

            res.send({
                genres: childGenres,
                wikiContent: wikiContent
            })
        })
        .catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log(`Server fooling at http://localhost:${port}/`);
})