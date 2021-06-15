import './App.css'
import React from 'react'
import sanitizeHtml from 'sanitize-html'

// Import Components
import Page from './Page'
import Graph from './Graph'
import GenreInfo from './GenreInfo'
import Artists from './Artists'


class Genre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genre: props.match.params.genre,
            genres: [],
            genreInfo: [],
            maxChildren: 0,
            minChildren: 0,
            artists: [],
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
                    if (el.localName !== 'p') {
                        if (startParagraphs) break
                        continue
                    } else {
                        if (el.innerHTML.length <= 2) continue
                        startParagraphs = true
                        paragraphs.push(sanitizeHtml(el.innerHTML, {allowedTags: []}).replace(/\[\d+\]/g, ''))
                    }
                }
                
                this.setState({
                    ...this.state,
                    genres: data.genres,
                    minChildren: data.minChildren,
                    maxChildren: data.maxChildren,
                    genreInfo: paragraphs,
                    artists: data.artists
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
                        {this.state.genres && <Graph genres={this.state.genres.slice(0, 10)} minChildren={this.state.minChildren} maxChildren={this.state.maxChildren}/>}
                        
                    </div>
                    <div style={{width: '25%'}}>
                        <Artists artists={this.state.artists}/>
                    </div>
                </div>
        
            </Page>            
            )
        }
    }
}


export default Genre