const fs = require('fs')
const parse = require('csv-parse')
const {db, Genre, GenreRelationship} = require('./db');

db.sync({force: true}).then(() => {
    console.log('DB synced my guy. Seeding DB')
    seedDb()
}).catch(() => {
    console.log('Try something else brudda')
})

const ensureParent = (childGenre, parentName, isTopLevel) => {
    // Try to fetch parent Genre
    Genre.findOne({
        where: {
            displayName: parentName
        }
    }).then(parentGenre => {
        // If parent Genre does not exist and should (i.e. child genre in question is not top level), create it
        if (!parentGenre && !isTopLevel) {
            Genre.build({
                displayName: parentName,
                wikiName: parentName,
            }).save().then((parentGenre) => {
                parentGenre.addChildren([childGenre])                         
            })
        // If parent Genre does exist, create/ensure association between parent and child
        } else if (!isTopLevel) {
            // TODO: Check if association already exists before creating (or add db constraint and catch error)
            parentGenre.addChildren([childGenre])            
        }
    })
}

const seedDb = () => {
    fs.readFile('data.csv', (err, fileData) => {
        if (err) throw err;
        parse(fileData, {columns: true}, (parseErr, rows) => {
            rows.forEach(row => {
                // Try to find existing database instance of genre
                Genre.findOne({
                    where: {
                        displayName: row.wikiName
                    }
                }).then(genre => {
                    // If genre doesn't exist, create it with all known properties
                    if (!genre) {
                        genre = Genre.build({
                            displayName: row.wikiName,
                            wikiName: row.wikiName,
                            wikiUrl: row.wikiLink,
                            isTopLevel: row.isTopLevel === 'TRUE' ? true : false,
                        })
                        // Ensure genre has and is associated with parent
                        genre.save().then(genre => {
                            ensureParent(genre, row.parentName, row.isTopLevel)
                        })
                    // If genre does exist (we could have partially built it if it was a parent to another genre), ensure all properties
                    } else {
                        if (!genre.wikiUrl) {
                            genre.wikiUrl = row.wikiLink
                            genre.isTopeLevel = row.isTopLevel === 'TRUE' ? true : false
                            // Ensure genre has and is associated with parent
                            genre.save().then(genre => {
                                ensureParent(genre, row.parentName, row.isTopLevel)
                            })
                        }
                    }
                })
            })
        })
    })
}

