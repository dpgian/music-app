import React from 'react'
import './App.css'
import { Router, Link } from '@reach/router'

let ArtistPage = React.lazy(() => import ('./ArtistPage'))
let AlbumPage = React.lazy(() => import('./AlbumPage'))
let MainPage = React.lazy(() => import('./MainPage'))

const App = () => {
 
    return (
        <div className='app'>
            <nav className='navbar navbar-light bg-light sticky-top'>
                <Link to='/'>
                    <i className="material-icons">music_note</i>
                </Link>
                <h2 className='title'> Music App </h2>
            </nav>

            <React.Suspense fallback={<div className="spinner-border m-5" role="status">
  <span className="sr-only">Loading...</span>
</div>}>
                <Router>
                    <MainPage path='/' />
                    <ArtistPage path='/Artist/:artistId' />
                    <AlbumPage path='/Album' />  
                </Router>        
            </React.Suspense>
            
            <p>NOTE: The App needs an API token to fetch data. A fix is to implement an Authorization Flow but this has not been done yet.  </p>
        </div>
    )
}

export default App;