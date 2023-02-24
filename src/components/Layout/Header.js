import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';

const Header = (props) => {
  return (
    <>
      <header class={classes.header}>
        <h1>React Meals</h1>
        <button>Cart</button>
      </header>
      <div class={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </>
  );
};

export default Header;