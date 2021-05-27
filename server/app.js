const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors')
const {Genre, GenreRelationship} = require('./db')
const {Op} = require('sequelize')

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

// TODO: Add error handling
app.get('/api/genres/:genre', (req, res) => {
    // Find the parent Genre
    Genre.findOne({
        where: {
            displayName: req.params.genre
        }
    }).then(genre => {
        // Find the genre relationships with parent genre as parent
        GenreRelationship.findAll({
            where: {
                parentId: genre.id
            }
        }).then(relationships => {
            // Take relationships, and fetch the children
            childIds = relationships.map(r => r.childId)
            Genre.findAll({
                where: {
                    id: {
                        [Op.in]: childIds
                    }
                }
            }).then(results => {
                const genres = results.map(genre => {
                    return {
                        name: genre.displayName,
                        size: Math.random() * 5 + 1
                    }
                })            
                res.send(genres)
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Server fooling at http://localhost:${port}/`);
})