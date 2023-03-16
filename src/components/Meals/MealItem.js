import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const { name, description, price } = props.meal;

  return <li className={classes.meal}>
    <div>
      <h3>{name}</h3>
      <div className={classes.description}>{description}</div>
      <div className={classes.price}>{price}</div>
    </div>
    <MealItemForm meal={props.meal} />
  </li>;
};

export default MealItem;