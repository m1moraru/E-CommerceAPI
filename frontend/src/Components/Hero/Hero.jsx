import React from 'react'
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';

const Hero = () => {
  return (
    <div className="hero-container">
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS</h2>
                <div>
                    <div className='hero-hand-icon'>
                        <p>Explore</p>
                        
                    </div>
                    <p>trending <span style={{ color: 'rgb(139, 0, 0)'}}>outfits</span></p>
                    <p>& <span style={{color: 'rgb(139, 0, 0)'}}>latest</span> collections</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collections</div>
                    <img src={arrow_icon} alt=""/>
                </div>
            </div>
            <div className="hero-right">
            </div>
        </div>
    </div>
  )
}

export default Hero