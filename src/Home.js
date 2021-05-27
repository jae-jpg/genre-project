import './App.css'
import React from 'react'

// Import Components
import Page from './Page'
import Graph from './Graph'


class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            genres: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/genres')
        .then((response) => {
            response.json().then(data => {
                this.setState({
                    genres: data.genres,
                    minChildren: data.minChildren,
                    maxChildren: data.maxChildren,
                })
            })
        })
    }

    render() {
        if (!this.state.genres.length) {
            return <Page />
        } else {
            return (
                <Page>
                    <Graph genres={this.state.genres} minChildren={this.state.minChildren} maxChildren={this.state.maxChildren} />
                </Page>            
            )            
        }
    }
}


export default Home