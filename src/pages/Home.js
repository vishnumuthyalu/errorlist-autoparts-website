import React from 'react';
import "../styles/Home.css"
import banner from '../assets/home-banner.png';

export const Home = () => {
    return (
        <div className={"home-container"}>
            <img className={"banner-image"} src={banner} alt={"banner for home page"}/>
        </div>
    );
};