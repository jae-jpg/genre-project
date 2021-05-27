import React from 'react'
import ambre from './ambre-square.png'

import Page from './Page'

const Artist = (props) => {
    const style = {marginRight: 20, fontSize: 20}
    return (
    <Page>
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', padding: 100, paddingRight: 0, boxSizing: 'border-box'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', overflow: 'scroll'}}>
                <img style={{height: 250, width: 250, borderRadius: '50%', marginRight: 36}} src={ambre} alt="ambré" />
                <h1 style={{marginBottom: 0, marginTop: 20, fontSize: 72}}>Ambré</h1>
                <div>
                    <p>India Ambré Perkins, known mononymously as Ambré, is an American singer and songwriter. She is currently signed to Roc Nation. She has released two full-length projects with Wanderlust (2015) and 2090's (2016). Her debut major label EP, Pulp, was released in November 2019, by Roc Nation. She first gained recognition after collaborating with Kehlani on a cover of Drake's "Preach" in 2015. She also co-wrote two tracks ("Changes" and "U") off of H.E.R.'s 2017 self-titled album, which was nominated for multiple Grammy Awards.</p>
                    <p>India Ambré Perkins was born and raised in New Orleans, Louisiana. At age 4, she entered into the foster care system and went in and out of multiple homes and schools as a child. As a teenager, she joined a church choir and also performed at various talent competitions. At age 17 in 2014, she met producer Erick Bardales and began making music with him.</p>
                    <p>In April 2016, she released her second mixtape, 2090's, which featured 15 tracks. In October of that year, she released a collaborative single with Kehlani called "No Service in the Hills". Ambré again appeared alongside Kehlani at the latter's "Tsunami Christmas" event in December 2016. In March 2017, Ambré performed at the BUKU Music + Art Project in New Orleans. In August 2017, she released the single, "Must Be The Fall". The following month, she was featured alongside Isaiah Rashad and Joey Purp on the TOKiMONSTA track, "No Way". Also that year, two tracks she co-wrote ("Changes" and "U") appeared on H.E.R.'s self-titled album, which would go on to win the Grammy Award for Best R&B Album in 2019.</p>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{marginTop: 50}}>
                    <div style={{display: 'flex'}}>
                        <h1 style={style}>R&B & Soul</h1>
                        <h1 style={style}>=&#62;</h1>
                        <h1 style={style}>Contemporary R&B</h1>
                    </div>
                    <div style={{display: 'flex'}}>
                        <h1 style={style}>R&B & Soul</h1>
                        <h1 style={style}>=&#62;</h1>
                        <h1 style={style}>Soul</h1>
                        <h1 style={style}>=&#62;</h1>
                        <h1 style={style}>Neo-Soul</h1>
                    </div>
                    <div style={{display: 'flex'}}>
                        <h1 style={style}>R&B & Soul</h1>
                        <h1 style={style}>=&#62;</h1>
                        <h1 style={style}>Vocal</h1>
                    </div>
                </div>
                <iframe src="https://open.spotify.com/embed/album/5QgT71gBaAQGuBO8MEF9XK" width="320" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media" title="ambré"></iframe>
            </div>
        </div>
    </Page>
)}

export default Artist