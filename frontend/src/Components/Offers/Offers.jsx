import React from 'react'
import '../Offers/Offers.css';
import special_img from '../Assets/special_img.png';

export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Special</h1>
            <h1>Deals Awaiting You</h1>
            <p>DON'T MISS OUT ON OUR TOP PICKS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={special_img} alt="" />
        </div>
    </div>
  )
}

export default Offers