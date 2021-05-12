import './App.css';
import {AnimatePresence} from 'framer-motion'
import React from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'

// Import Components
import Home from './Home'
import Genre from './Genre'

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/genre/:genre" component={Genre} />
        <Route path="/" component={Home} />
      </Switch>
    </AnimatePresence>
  )

}

export default App;
