import { useSelector } from 'react-redux';
import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import CartButton from '../UI/CartButton';
import MealsSummary from './MealsSummary';
import Notification from '../UI/Notification';

const Header = (props) => {
  const notification = useSelector(state => state.ui.notification);

  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <CartButton onClick={props.onShowCart} />
      </header>
      {notification && <Notification notification={notification} />}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
      <MealsSummary />
    </>
  );
};

export default Header;