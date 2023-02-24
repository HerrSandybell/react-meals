import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Has submitted");
  };
  return <form className={classes.form} onSubmit={handleSubmit}>
    <div className={classes.input}>
      <label htmlFor="quantity">Amount</label>
      <input type="number" name="quantity" placeholder="0" />
    </div>
    <button type="submit">+ Add</button>
  </form>;
};

export default MealItemForm;