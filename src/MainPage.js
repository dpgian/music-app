import React, { useState, useEffect } from 'react'
import './MainPage.css'
import { Link } from '@reach/router'

const MainPage = () => {
    const [artist, setArtist] = useState([])
    const API_KEY = 'BQB1khW3IALqLB2fUSJ413AqF4Crrcub6Y9p6mHaAQsLfKxSaqCbNsov8saApXSeMA2R79Q3RW3MIvWe4l0N37vbmJtC2UD_vOXiAzbW6eoTOFZaaol_k4R1dMcj5FP9jeQdp5u4D1qiJNYg3q1fyPHDDd6xkr_lSQ'
    
    const renderArtist = artist ? artist.map(x => 
        <Link to={`Artist/${x.id}`} state={{artistName: x.name, artistImages: x.images}} key={x.id} className='list-group-item list-group-item-action'>
            <img alt='' src={`${x.images[0].url}`} className='img-fluid thumbnail'/>
            {x.name}
        </Link>
        ) : <div class="spinner-border m-5" role="status">
        <span class="sr-only">Loading...</span>
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