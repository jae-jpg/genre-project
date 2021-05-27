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

class Genre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genre: props.match.params.genre,
            genres: []
        }
    }

    componentDidMount() {
        console.log('mounted state', this.state)
        fetch(`http://localhost:8080/api/genres/${this.state.genre}`)
        .then(response => {
            response.json().then(data => {
                this.setState({genres: data})
            })
        })
    }

    render() {
        if (!this.state.genres.length) {
            return <Page />
        } else {
            return (
                <Page>
                <div style={{width: '100%', height: '100%', display: 'flex'}}>
                    <div style={{width: '25%'}}>
                        <GenreInfo genre={this.state.genre} />
                    </div>
                    <div style={{width: '50%'}}>
                        {/* TODO: Allow "next" */}
                        <Graph data={this.state.genres.slice(0, 10)}/>
                    </div>
                    <div style={{width: '25%'}}>
                        <Artists />
                    </div>
                </div>
        
            </Page>            
            )
        }
    }
}


export default Genre