import React from 'react'
import ambre from './ambre-square.png'
import {motion} from 'framer-motion'


const Artists = () => {
    return (
    <div style={{height: '100%', paddingTop: '100%', paddingRight: '10%', boxSizing: 'border-box'}}>
        {[0, 1, 2, 3].map(i => <Artist delay={i / 2.75}/>)}
    </div>
)}

export default Artists

const Artist = ({delay}) => (
    <motion.div
        initial={{y: 400}}
        animate={{y: 0}}
        transition={{duration: 2, delay: delay}}
        style={{display: 'flex', marginTop: '24px'}}
    >
        <img style={{borderRadius: '50%', height: '100px', marginRight: '8px'}} src={ambre} />
        <p style={{fontSize: '12px', marginTop: 0}}>India Ambré Perkins, known mononymously as Ambré, is an American singer and songwriter. She is currently signed to Roc Nation. She first gained recognition after collaborating with Kehlani on a cover of Drake's "Preach" in 2015.</p>
    </motion.div>
)