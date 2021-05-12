import './App.css'
import React from 'react'

// Import Components
import Page from './Page'
import Graph from './Graph'

const data = [
    { name: 'R&B', size: 5 },
    { name: 'Hip-hop', size: 10 },
    { name: 'Jazz', size: 2 },
    { name: 'Funk', size: 3 },
    { name: 'Rock', size: 7 },
    { name: 'Country', size: 6 },
    { name: 'Electronic', size: 4 },
    { name: 'Pop', size: 8 },
    { name: 'Avant-garde', size: 1 },
    { name: 'Vocal', size: 1 },
]

const Home = () => (
    <Page>
        <Graph data={data} />
    </Page>
)

export default Home