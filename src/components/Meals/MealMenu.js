import classes from './MealMenu.module.css';
import MealItem from './MealItem';
import DUMMY_MEALS from './dummy-meals';
import Card from '../UI/Card';

const MealMenu = (props) => {
  return <Card className={classes.meals}>
    <ul>
      {DUMMY_MEALS.map((meal) => <MealItem key={meal.id} {...meal} />)}
    </ul>
  </Card>;
};

export default MealMenu;