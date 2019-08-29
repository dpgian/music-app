import React, { useState, useEffect } from 'react'
import './MainPage.css'
import { Link } from '@reach/router'

import { API_KEY } from './options'

const MainPage = () => {
    const [artist, setArtist] = useState([])

    const renderArtist = artist ? artist.map(x => 
        <Link to={`Artist/${x.id}`} state={{artistName: x.name, artistImages: x.images}} key={x.id} className='list-group-item list-group-item-action'>
            <img alt='' src={`${x.images[0].url}`} className='img-fluid thumbnail'/>
            {x.name}
        </Link>
        ) : <div className="spinner-border m-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>

    useEffect(() => {
        fetch('https://api.spotify.com/v1/artists/?ids=6eUKZXaKkcviH0Ku9w2n3V,1uNFoZAHBGtllmzznpCI3s,246dkjvS1zLTtiykXe5h60,6qqNVTkY8uBg9cP3Jd7DAH,6jJ0s89eD6GaHleKKya26X', {
            method: 'GET',
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${API_KEY}`
            })
        }).then(response => response.json()).then(result => setArtist(result.artists))
    }, [])

    return (
        <div className='MainPage'>
            <div className='list-group'>
                {renderArtist}
            </div>
        </div>
    )
}

export default MainPage;