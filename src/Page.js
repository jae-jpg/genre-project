import './App.css';
import React from 'react';
import {motion} from 'framer-motion'
import {pageVariants} from './transitions'

const Page = ({children}) => (
    <motion.div 
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{duration: 1.5}}
        style={{height: "100vh"}}
    >
        {children}
    </motion.div>
)

export default Page;
