const fs = require('fs')
const parse = require('csv-parse')
const {Genre, GenreRelationship} = require('./db');


fs.readFile('data.csv', (err, fileData) => {
    if (err) throw err;
    parse(fileData, {columns: true}, (parseErr, rows) => {
        rows.forEach(row => {
            // Try to find the genre
                // If we find it, look  up its parent(s)
                    // If we find its parent(s), move on
                    // If we don't find its parent(s), create them
                // If we don't find it, create it
            Genre.findOne({
                where: {
                    displayName: row.wikiName
                }
            }).then(genre => {
                if (!genre) {
                    genre = Genre.build({
                        displayName: row.wikiName,
                        wikiName: row.wikiName,
                        wikiUrl: row.wikiLink,
                        isTopLevel: row.topLevel === 'TRUE' ? true : false,
                    })
                    genre.save()
                } else {
                    if (!genre.wikiUrl) {
                        genre.wikiUrl = row.wikiLink
                        genre.isTopeLevel = row.topLevel === 'TRUE' ? true : false
                        genre.save()
                    }
                }
    
                const parentName = row.parent
                Genre.findOne({
                    where: {
                        displayName: parentName
                    }
                }).then(parent => {
                    if (!parent) {
                        genre = Genre.build({
                            displayName: parentName,
                            wikiName: parentName,
                        })
                        genre.save()
                    }
        
                    const relationship = GenreRelationship.findOne({
                        where: {
                            parentId: parent.id,
                            childId: genre.id,
                        }
                    }).then(relationship => {
                        if (!relationship) {
                            console.log(parent.id, genre.id)
                            relationship = GenreRelationship.build({
                                parentId: parent.id,
                                childId: genre.id,                    
                            })
                            relationship.save()
                        }
                    })
                })
    

            })


            
            // console.log(row)
        })
    })
})