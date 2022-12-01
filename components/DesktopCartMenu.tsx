import { useState,useRef,useEffect } from 'react';
import styles from '../styles/DesktopCartMenu.module.css';
import { useAppSelector } from "../utils/hooks";
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faXmark } from "@fortawesome/free-solid-svg-icons"
import CartList from './CartList';

export const DesktopCartMenu = () => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const [opened,setOpened] = useState(false);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);

  const ref = useRef(null);
  const [clickedOutside] = useOutsideAlerter(ref);
  useEffect(()=>{setOpened(false)},[clickedOutside]);

  
  return (
    <div ref={ref}>
    <div className={styles.button} onClick={()=>setOpened(prev=>!prev)}>
      <FontAwesomeIcon icon={faCartShopping}/>
      <span>{numOfItems}</span>
    </div>

    {opened && 
    <div className={styles.container}>
      <FontAwesomeIcon icon={faXmark} className={styles.closeButton} onClick={()=>setOpened(false)}/>
      
    <CartList closeCallback={setOpened}/>
  </div>}
  </div>)
}

export default DesktopCartMenu;