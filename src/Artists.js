import React from 'react'
import ambre from './ambre-square.png'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


const Artists = () => {
    return (
    <div style={{height: '100%', paddingTop: '80%', paddingRight: '10%', boxSizing: 'border-box'}}>
        <motion.h1
            initial={{y: 600}}
            animate={{y: 0}}
            transition={{duration: 2, delay: .25}}
            style={{marginTop: 0, marginBottom: 12, fontSize: '48px'}}
        >Artists</motion.h1>
        {[0, 1, 2, 3].map(i => <Artist delay={i / 2.75} key={i}/>)}
    </div>
)}

export default Artists

const Artist = ({delay}) => (
    <Link to="/artist/ambre">
        <motion.div
            initial={{y: 600}}
            animate={{y: 0}}
            transition={{duration: 2, delay: .25 + delay}}
            style={{display: 'flex', marginBottom: '24px'}}
        >
            <img style={{borderRadius: '50%', height: '100px', marginRight: '8px'}} src={ambre} alt="ambré"/>
            <p style={{fontSize: '12px', marginTop: 0}}>India Ambré Perkins, known mononymously as Ambré, is an American singer and songwriter. She is currently signed to Roc Nation. She first gained recognition after collaborating with Kehlani on a cover of Drake's "Preach" in 2015.</p>
        </motion.div>
    </Link>
)