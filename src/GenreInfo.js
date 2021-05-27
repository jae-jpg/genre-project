import React from 'react'
import {motion} from 'framer-motion'

const GenreInfo = ({ genre, genreInfo }) => {
    return (
    <motion.div
        initial={{y: -1000}}
        animate={{y: 0}}
        transition={{duration: 2.5, delay: .25}}
        style={{
            height: '100%',
            paddingTop: '72px',
            paddingLeft: '32px',
            boxSizing: 'border-box',
        }}
    >
        <h1 style={{marginTop: 0, marginBottom: 20, fontSize: '72px'}}>{genre}</h1>
        <div style={{fontSize: '14px', overflow: 'scroll', height: '80%'}}>
            {genreInfo.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))} 
        </div>
    </motion.div>
)}

export default GenreInfo