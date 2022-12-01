import styles from '../styles/CartList.module.css';
import { useAppSelector } from "../utils/hooks";
import { useRouter } from 'next/router';
import { useAppDispatch } from '../utils/hooks';
import { Product } from '../utils/types';
import { addProductToCartThunk } from '../utils/thunk';
import Image from 'next/image';

export const CartList = ({closeCallback}:{closeCallback:(open:boolean)=>void}) => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts?.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const addProductQuantity = (product:Product)=>{
    dispatch(addProductToCartThunk({...product,quantity:1}));
  } 
  const subtractProductQuantity = (product:Product)=>{
    dispatch(addProductToCartThunk({...product,quantity:-1}));
  } 

  const navigateToProduct = (id:number)=>{
    router.push('/products/'+id);
    closeCallback(false);
  }
  const onCheckoutButtonHandler = () => {
    closeCallback(false);
    router.push('/checkout')
  }

  return (
    <div className={styles.container}>
      <h2>Cart Items: ({numOfItems})</h2>
      <div className={styles.itemsContainer}>
      {cartProducts && cartProducts.map(product => 
        <div key={''+product.id+product.size} className={styles.cartItem} onClick={()=>navigateToProduct(product.id)}>
          <div className={styles.imageContainer}>
            <Image src={product.image} layout={'fill'} objectFit={'cover'} placeholder={'blur'} blurDataURL={product.image}/>
          </div>
          <div>
            <span className={styles.cartItemTitle}>{product.title}</span>
            {product.size && <span className={styles.cartItemTotal}>Size: {product.size}</span>}
            <span className={styles.cartItemTotal}>Total: {Math.floor(product.price * product.quantity)}₪</span>
          </div>
          <button onClick={(e)=>{
            e.stopPropagation();
            subtractProductQuantity(product);
          }} className={'btn'}>-</button>
          <span className={styles.cartItemQuantity}>{product.quantity}</span>
          <button onClick={(e)=>{
            e.stopPropagation();
            addProductQuantity(product);
          }} className={'btn'}>+</button>
        </div>
    )}
    </div>

    {cartProducts.length > 0 ? 
    <>
      <span className={styles.total}><strong>Cart Total: {totalPrice}₪</strong></span>
      <button className={styles.checkoutButton + ' btn'} onClick={onCheckoutButtonHandler}>Proceed to Checkout</button>
    </> : 
    <span>There are no items in cart</span>}

  </div>)
}

export default CartList;