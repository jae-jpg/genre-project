import './App.css'
import React from 'react'
import sanitizeHtml from 'sanitize-html'

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
            genres: [],
            genreInfo: [],
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/genres/${this.state.genre}`)
        .then(response => {
            response.json().then(data => {
                // TODO: Separate this out
                var html = document.createElement('html');
                html.innerHTML = data.wikiContent
                const content = html.getElementsByClassName('mw-parser-output')[0].children

                // Look for paragraphs
                const paragraphs = []
                let startParagraphs = false
                for (let i = 0; i < content.length; i++) {
                    const el = content[i]
                    if (el.localName != 'p') {
                        if (startParagraphs) break
                        continue
                    } else {
                        if (el.innerHTML.length <= 2) continue
                        startParagraphs = true
                        paragraphs.push(sanitizeHtml(el.innerHTML, {allowedTags: []}))
                    }
                }
                
                this.setState({
                    ...this.state,
                    genres: data.genres,
                    genreInfo: paragraphs,
                })
            })
        })
    }

    render() {
        if (!this.state.genres.length && !this.state.genreInfo.length) {
            return <Page />
        } else {
            return (
                <Page>
                <div style={{width: '100%', height: '100%', display: 'flex'}}>
                    <div style={{width: '25%'}}>
                        <GenreInfo genre={this.state.genre} genreInfo={this.state.genreInfo} />
                    </div>
                    <div style={{width: '50%'}}>
                        {/* TODO: Allow "next" */}
                        {this.state.genres && <Graph data={this.state.genres.slice(0, 10)}/>}
                        
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