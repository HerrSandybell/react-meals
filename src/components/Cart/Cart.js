import classes from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';

const Cart = (props) => {
  const DUMMY_CART = [
    {
      name: "schnitzel",
      summary: "Tasty",
      price: 22,
      amount: 3
    }
  ];

  const addHandler = () => {
    console.log("added");
  };

  const removeHandler = () => {
    console.log("removed");
  };

  return <Modal onClose={props.onHideCart}>
    <ul className={classes["cart-items"]}>
      {
        DUMMY_CART.map((item) => <CartItem
          key={item.name}
          name={item.name}
          summary={item.summary}
          price={item.price}
          amount={item.amount}
          onAdd={addHandler}
          onRemove={removeHandler}
        />)
      }
    </ul>
    <div className={classes.total}>
      <div>Total Amount</div>
      <div>$33.00</div>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      <button className={classes.button}>Order</button>
    </div>
  </Modal>;
};

export default Cart;