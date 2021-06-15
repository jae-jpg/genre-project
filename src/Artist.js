import React from 'react'
import ambre from './ambre-square.png'

import Page from './Page'

class Artist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: props.location.state,
            paragraphs: [],
            genreLineages: [],
        }
    }

    componentDidMount() {
        fetch(
            `http://localhost:8080/api/artists/${this.state.artist.id}`,
            {
                method: 'POST',
                body: JSON.stringify({genres: this.state.artist.genres}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            response.json().then(data => {
                const paragraphs = data.bio.split('  ')
                this.setState({
                    ...this.state,
                    paragraphs: paragraphs,
                    genreLineages: data.genreLineages
                })
            })
        })
    }

    render() {
        const style = {marginRight: 20, fontSize: 20}
        return (
            <Page>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', padding: 100, paddingRight: 0, boxSizing: 'border-box'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '50%', overflow: 'scroll'}}>
                        <img style={{height: 250, width: 250, borderRadius: '50%', marginRight: 36}} src={this.state.artist.images.length ? this.state.artist.images[0].url : ambre} alt="ambré" />
                        <h1 style={{marginBottom: 0, marginTop: 20, fontSize: 72}}>{this.state.artist.name}</h1>
                        <div>
                            {this.state.paragraphs.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{marginTop: 50}}>
                            {this.state.genreLineages.map((lineage, i) => (
                                <div key={i} style={{display: 'flex'}}>
                                    {lineage.map((genre, j) => (
                                        <div key={j}>
                                            <h1  style={style}>{genre}</h1>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <iframe src={`https://open.spotify.com/embed/artist/${this.state.artist.id}`} width="320" height="400" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="ambré"></iframe>
                    </div>
                </div>
            </Page>
        )
    }
}


export default Artist