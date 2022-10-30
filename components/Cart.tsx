import styles from '../styles/Cart.module.css';
import { useAppSelector } from "../utils/hooks";

export const Cart = () => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts?.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);

  return (
    <>
    <h4>Cart ({numOfItems}) Total: {totalPrice}$</h4>
  <div className={styles.container}>
    {cartProducts && cartProducts.map(product => 
    <div key={product.id} className={styles.cartItem}>
      <img src={product.image} alt={product.title} />
      <span className={styles.cartItemTitle}>{product.title}: {Math.floor(product.price * product.quantity)}$</span>
      <span className={styles.cartItemQuantity}>{product.quantity}</span>
    </div>
    )}
  </div>
  </>)
}

export default Cart;