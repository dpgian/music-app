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
                    <i class="material-icons">music_note</i>
                </Link>
                <h2 className='title'> Music App </h2>
            </nav>

            <React.Suspense fallback={<div class="spinner-border m-5" role="status">
  <span class="sr-only">Loading...</span>
</div>}>
                <Router>
                    <MainPage path='/' />
                    <ArtistPage path='/Artist/:artistId' />
                    <AlbumPage path='/Album' />  
                </Router>        
            </React.Suspense>
            
        </div>
    )
}

export default App;