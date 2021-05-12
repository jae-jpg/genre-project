import './App.css'
import React from 'react'

// Import Components
import Page from './Page'
import Graph from './Graph'
import GenreInfo from './GenreInfo'
import Artists from './Artists'

const subgenres = [
    { name: 'Modern', size: 6 },
    { name: 'Alternative', size: 2 },
    { name: 'Jazz', size: 3 },
    { name: 'Neo Soul', size: 7 },
    { name: 'Classic', size: 5 },
]


const Genre = (props) => {
    const genre = props.match.params.genre
    return (
    <Page>
        <div style={{width: '100%', height: '100%', display: 'flex'}}>
            <div style={{width: '25%'}}>
                <GenreInfo genre={genre} />
            </div>
            <div style={{width: '50%'}}>
                <Graph data={subgenres}/>
            </div>
            <div style={{width: '25%'}}>
                <Artists />
            </div>
        </div>

    </Page>
)}

export default Genre