const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors')
const {Genre} = require('./db')
const {Op} = require('sequelize')
const axios = require('axios')

app.use(express.static('public', {index: false}))
app.use(cors())

app.get('/', (req, res) => {
    res.sendStatus(200);
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const serializeGenres = (results) => {
    const genres = results.map(genre => {
        const numChildren = genre.Children.length
        return {
            name: genre.displayName,
            size: numChildren + 1,
            wikiUrl: genre.wikUrl,
            numChildren: numChildren
        }
    }).sort((a, b) => {
        if (a.numChildren > b.numChildren) return -1
        else return 1 
    })

    const stats = genres.reduce((acc, genre) => {
        if (!acc.minChildren || genre.numChildren < acc.minChildren) acc.minChildren = genre.numChildren
        if (!acc.maxChildren || genre.numChildren > acc.maxChildren) acc.maxChildren = genre.numChildren
        return acc
    }, {minChidren: null, maxChildren: null})

    return {
        genres: genres,
        minChildren: stats.minChidren,
        maxChildren: stats.maxChildren,
    }
}

// TODO: Make a real serializer
app.get('/api/genres', (req, res) => {
    Genre.findAll({
        where: {
            isTopLevel: true
        },
        include: {
            association: 'Children',
        },
    }).then(results => {
        res.send(serializeGenres(results))
    }).catch(err => {
        throw err
    })
})

/**
 * Get all child genres for :genre
 */
app.get('/api/genres/:genre', (req, res) => {
    // Find the parent Genre and eager load all of its children
    Genre.findOne({
        where: {
            displayName: req.params.genre
        },
        include: {
            association: 'Children',
            // For sorting purposes we need to count the number of children that each child has, so eager load all children's children
            include: {
                association: 'Children',
            }
        },
    }).then(parentGenre => {
        // Serialize child genres
        const serializedGenres = serializeGenres(parentGenre.dataValues.Children)

        // Request Wikipedia page for parent genre
        const wikiUrl = `https://en.wikipedia.org/${parentGenre.wikiUrl}`
        axios.get(wikiUrl).then(response => {
            const wikiContent = response.data

            res.send(
                Object.assign(
                    serializedGenres, {wikiContent: wikiContent}
                )
            )
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