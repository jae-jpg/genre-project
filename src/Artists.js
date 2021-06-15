import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import ambre from './ambre-square.png'


const Artists = ({artists}) => {
    return (
    <div style={{height: '100%', paddingTop: '80%', paddingRight: '10%', boxSizing: 'border-box', overflow: 'scroll'}}>
        <motion.h1
            initial={{y: 600}}
            animate={{y: 0}}
            transition={{duration: 2, delay: .25}}
            style={{marginTop: 0, marginBottom: 12, fontSize: '48px'}}
        >Artists</motion.h1>
        {artists.map((artist, i) => <Artist artist={artist} delay={i / 2.75} key={i}/>)}
    </div>
)}

export default Artists

const Artist = ({delay, artist}) => (
    <motion.div
        initial={{y: 600}}
        animate={{y: 0}}
        transition={{duration: 2, delay: .25 + delay}}
        style={{display: 'flex', marginBottom: '24px'}}
    >
        <Link to={{
            pathname: `/artist/${artist.name}`,
            state: artist,
        }}>
        {/* TODO: Don't just show a picture of ambré lol */}
        <img style={{borderRadius: '50%', height: 100, width: 100, minWidth: 100, marginRight: '8px'}} src={artist.images.length ? artist.images[0].url : ambre} alt={artist.name}/>
        </Link>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <h3 style={{marginBottom: 0, marginTop: 0, fontSize: 16}}>{artist.name}</h3>
            <p style={{fontSize: '12px', marginTop: 0, marginBottom: 5}}>
                <strong>Followers: </strong><span>{new Intl.NumberFormat().format(artist.followers)}</span>
            </p>
            <div style={{paddingRight: '15%'}}>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {artist.genres.slice(0, 5).map((genre, i) => (
                        <div key={i} style={{fontSize: 12, display: 'inline', backgroundColor: 'grey', borderRadius: 10, marginRight: 5, marginBottom: 5, paddingRight: 10, paddingLeft: 10, whiteSpace: 'nowrap'}}>{genre}</div>
                    ))}
                </div>

            </div>
            {/* <p style={{fontSize: '12px', marginTop: 0}}>India Ambré Perkins, known mononymously as Ambré, is an American singer and songwriter. She is currently signed to Roc Nation. She first gained recognition in 2015.</p> */}
        </div>
    </motion.div>
)