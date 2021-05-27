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
                this.setState({genres: data})
            })
        })
    }

    render() {
        if (!this.state.genres.length) {
            console.log('hello')
            return <Page />
        } else {
            console.log(this.state.genres)
            return (
                <Page>
                    <Graph data={this.state.genres} />
                </Page>            
            )            
        }
    }
}


export default Home