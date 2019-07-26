import React, {useState, useEffect} from 'react'
import { Link } from '@reach/router'
import './ArtistPage.css'

const ArtistPage = ({location, artistId}) => {
    let artistImages = location.state.artistImages;
    let artistName = location.state.artistName;
    
    const API_KEY = 'BQB1khW3IALqLB2fUSJ413AqF4Crrcub6Y9p6mHaAQsLfKxSaqCbNsov8saApXSeMA2R79Q3RW3MIvWe4l0N37vbmJtC2UD_vOXiAzbW6eoTOFZaaol_k4R1dMcj5FP9jeQdp5u4D1qiJNYg3q1fyPHDDd6xkr_lSQ'
    const country = 'GB'
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);

    const renderSongs = songs ? 
        songs.map(x => 
        <Link to={x.uri} state={{}} key={x.external_ids.isrc} className='list-group-item list-group-item-action'>
            {x.name}
        </Link>
        ) : <div class="spinner-border m-5" role="status">
        <span class="sr-only">Loading...</span>
      </div>

    const renderAlbums = albums ? albums.map(x => 
            <div className='card'>
                <img src={x.images[0].url} className='card-img' alt=''></img>
                <p>{x.name}</p>
            </div>
       
        ) : <div className='list-group-item list-group-item-action'>
        Loading...
    </div>

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${API_KEY}`
            })
        }).then(response => response.json()).then(result => setSongs(result.tracks.slice(0,5)))
    
        fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${API_KEY}`
            })
        }).then(response => response.json()).then(result => reduceAlbums(result.items))
    }, [])

    let reduceAlbums = (arr) => { 
        let result = arr.reduce((unique, o) => {
        if(!unique.some(obj => obj.name === o.name && obj.value === o.value)) {
          if(o.album_type !== 'single') {
              unique.push(o);
          }
        }
        return unique;
    },[]);
    setAlbums(result)
    }


    return (
        <div className='artistPage'>

            <h2 className='section'>{artistName}</h2>
            <img className='img-fluid main-thumbnail' alt='' src={artistImages[0].url} />
            
            <h2 className='section'>Top Songs</h2>
            <div className='list-group'>
                {renderSongs}
            </div>

            <h2 className='section'>Albums</h2>
            <div className='album-container'>
                {renderAlbums}
            </div>

        </div>
    )
}

export default ArtistPage