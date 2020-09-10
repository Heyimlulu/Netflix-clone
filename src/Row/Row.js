import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row ({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        // if empty [], run once when the row loads and doesnt run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // Tell useEffect that we use this dependencies
    }, [fetchUrl]);

    //console.log(movies);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    // https://www.youtube.com/watch?v=XtMThy8QKqU <-- will only get the value at the end
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {/* row_posters */}
                {/* container -> posters */}
                {movies.map((movie) => (
                    <img key={movie.id}
                         onClick={() => handleClick(movie)}
                         className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                         src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                         alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;