import React from 'react';
import './Breadcrum.css';
import { Link } from 'react-router-dom';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
  const { product } = props;

  return (
    <div className="breadcrum">
      <Link className="link" to="/">HOME</Link> 
      <img src={arrow_icon} alt="arrow" /> 
      <Link className="link" to="/">SHOP</Link> 
      <img src={arrow_icon} alt="arrow" /> 
      <Link className="link" to={`/`}>{product.category}</Link> 
      <img src={arrow_icon} alt="arrow" /> 
      {product.name}
    </div>
  );
};


export default Breadcrum;

