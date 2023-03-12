import { useState, useEffect } from 'react';
import classes from './MealMenu.module.css';
import MealItem from './MealItem';
import Card from '../UI/Card';
import useHttp from '../hooks/use-http';

const MealMenu = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    sendRequest({ url: 'https://react-test-9ffb7-default-rtdb.firebaseio.com/meals.json' })
      .then((response) => {
        setMeals(Object.entries(response).map(([key, value]) => {
          return {
            id: key,
            ...value
          };
        }));
      });
  }, [sendRequest]);

  return <Card cardClass={classes.meals}>
    <ul>
      {!isLoading && error && error.message}
      {isLoading && "Loading..."}
      {meals.length > 0 && meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  </Card>;
};

export default MealMenu;