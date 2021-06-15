const express = require('express')
const path = require('path')
const app = express()
const port = 8080;
const cors = require('cors')
const {Genre} = require('./db')
const {Op} = require('sequelize')
const axios = require('axios')
const {spotify} = require('../secrets')
const bodyParser = require('body-parser')
const _ = require('lodash')

app.use(express.static('public', {index: false}))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendStatus(200);
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const serializeGenres = (results, spotifyOnly) => {
    const genres = results.filter(genre => {
        // if (spotifyOnly) return !!genre.spotifyName
        return true
    }).map(genre => {
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
        res.send(serializeGenres(results, false))
    }).catch(err => {
        throw err
    })
})

// TODO: Make these promises Promise.all, rather than nested
// TODO: Modularize further
// TODO: Add logging
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
        const toSend = serializeGenres(parentGenre.dataValues.Children, true)

        // Request Wikipedia page for parent genre
        const wikiUrl = `https://en.wikipedia.org/${parentGenre.wikiUrl}`
        axios.get(wikiUrl).then(response => {
            const wikiContent = response.data
            toSend.wikiContent = wikiContent
            const url = `https://api.spotify.com/v1/search?q=genre%3A"${encodeURIComponent(parentGenre.spotifyName)}"&type=artist`
            console.log('Requesting', url)

            axios.get(
                url,
                {headers: {'Authorization': `Bearer ${spotify.accessToken}`}}
            ).then(response => {
                const artists = response.data.artists.items.map(artist => {
                    return {
                        name: artist.name,
                        popularity: artist.popularity,
                        images: artist.images,
                        genres: artist.genres,
                        followers: artist.followers.total,
                        id: artist.id,
                    }
                })
                toSend.artists = artists
                res.send(toSend)                
            }).catch(err => {
                console.log(err)
            })

        })
        .catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

app.post('/api/artists/:artistId', (req, res) => {
    const artistId = req.params.artistId
    const url = `https://open.spotify.com/artist/${artistId}`

    const genres = req.body.genres

    const getParents = (child, lineage) => {
        return child.getParents().then(parents => {
            return parents.map(currParent => {
                const myLineage = _.cloneDeep(lineage)
                myLineage.unshift(currParent.displayName)
                if (!currParent.isTopLevel) {
                    return getParents(currParent, lineage)
                } else {
                    return myLineage
                }
            })
        })
    }

    axios.get(url).then(response => {
        // Capture text between `"biography":{"text":"` and `"}`
        let bioText = response.data.match(/(?<=\"biography\":\{\"text\":\")(.+?)(?=\"\})/g)[0]
        bioText = bioText.replace(/<.*?>/g, '').replace(/\\r/g, '  ').replace(/\\n|\\/g, '')

        let lineages = []
        Genre.findAll({
            where: {
                spotifyName: {
                    [Op.in]: genres
                }
            },
            include: {
                association: 'Parents',
            },
        }).then(childGenres => {
            childGenres.forEach(childGenre => {
                if (childGenre.isTopLevel) {
                    lineages.push([childGenre.displayName])
                } else {
                    childGenre.Parents.forEach(parentGenre => {
                        const lineage = [parentGenre.displayName, childGenre.displayName]
                        if (!parentGenre.isTopLevel) {
                            getParents(parentGenre, lineage).then(result => {
                                lineages = lineages.concat(result)
                            })
                        } else {
                            lineages.push(lineage)
                        }
                    })
                }
            })

            res.send({
                bio: bioText,
                genreLineages: lineages
            })
        }).catch(err => {
            throw err
        })

    }).catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log(`Server fooling at http://localhost:${port}/`);
})