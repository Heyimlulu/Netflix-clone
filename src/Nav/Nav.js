import React, { useState, useEffect } from 'react'
import './Nav.css'

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener('scroll')
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            {/* Netflix logo */}
            <img className="nav_logo" src="./images/Netflix-logo.png" alt="Netflix logo"/>

            {/* Avatar logo */}
            <img className="nav_avatar" src="./images/netflix-avatar.png" alt="Netflix avatar"/>

        </div>
    )
}

export default Nav
