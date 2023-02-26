import classes from './MealMenu.module.css';
import MealItem from './MealItem';
import DUMMY_MEALS from './dummy-meals';
import Card from '../UI/Card';

const MealMenu = (props) => {
  return <Card cardClass={classes.meals}>
    <ul>
      {DUMMY_MEALS.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  </Card>;
};

export default MealMenu;