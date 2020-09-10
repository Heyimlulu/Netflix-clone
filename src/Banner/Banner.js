import React, {useEffect, useState} from 'react';
import axios from '../axios';
import requests from "../requests";
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[ // This pick a random movie to display on the banner
                Math.floor(Math.random() * request.data.results.length -1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);
    //console.log(movie)

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header className="banner"
                style={{backgroundSize:'cover',
                    backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                    backgroundPosition:'center center'}}> {/* <-- Background Image */}
            <div className="banner_contents">
                {/* Title */}
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                {/* div > 2 buttons */}
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                {/* Description */}
                <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner-fadeBottom"></div> {/* <-- This add a fade at the bottom of the banner content */}
        </header>
    )
}

export default Banner
