const fs = require('fs')
const parse = require('csv-parse')
const {Genre} = require('./db')


fs.readFile('data.csv', (err, fileData) => {
    if (err) throw err;
    parse(fileData, {columns: true}, (parseErr, rows) => {
        rows.forEach(row => {
            const genre = Genre.build({
                displayName: row.wikiName,
                wikiName: row.wikiName,
                wikiUrl: row.wikiLink,
                isTopLevel: row.topLevel === 'TRUE' ? true : false,
            })
            genre.save()
            // console.log(row)
        })
    })
})