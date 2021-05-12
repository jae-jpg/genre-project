import React from 'react'

const GenreInfo = ({ genre }) => {
    return (
    <div style={{height: '100%', paddingTop: '15%', paddingLeft: '10%', boxSizing: 'border-box'}}>
        <h1 style={{marginTop: 0, marginBottom: 20, fontSize: '80px'}}>{genre}</h1>
        <div style={{fontSize: '14px'}}>
            <p>Country (also called country and western) is a genre of popular music that originated with blues, old-time music, and various types of American folk music including Appalachian, Cajun, Creole, and the cowboy Western music styles of New Mexico, Red Dirt, Tejano, and Texas country. Its popularized roots originate in the Southern and Southwestern United States of the early 1920s.</p>
            <p>Country music often consists of ballads and dance tunes with generally simple forms, folk lyrics, and harmonies mostly accompanied by string instruments such as banjos, electric and acoustic guitars, steel guitars (such as pedal steels and dobros), and fiddles as well as harmonicas. Blues modes have been used extensively throughout its recorded history.</p>
            <p>The term country music gained popularity in the 1940s in preference to hillbilly music; it came to encompass Western music, which evolved parallel to hillbilly music from similar roots, in the mid-20th century. In 2009, in the United States, country music was the most listened to rush hour radio genre during the evening commute, and second most popular in the morning commute.</p>
            <p>The term country music is used today to describe many styles and subgenres. The origins of country music are found in the folk music of working class Americans and blue-collar American life. It has been inspired by American popular music, and American folk music which had its roots in Celtic music, early music of the British Isles, singing cowboys, corrido, ranchera, norteño, French folk music, African-American music, and other traditional folk music traditions.</p>
        </div>
    </div>
)}

export default GenreInfo