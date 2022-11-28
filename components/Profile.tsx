import {useEffect,useState} from 'react';
import styles from '../styles/Profile.module.css';
import { getUserData } from "../utils/firebase";
import { User } from "firebase/auth";

const Profile = ({user}:{user:User}) =>{
  const [userData,setUserData] = useState<any>(undefined);

  useEffect(()=>{
    user && getUserData(user).then(data=>setUserData(data));
  },[]);

  return user && (
    <div className={styles.container}>
      <h2>Hello {userData?.displayName} 👋</h2>
      <div className={styles.userDetailsContainer}>
        <div className={styles.avatar}>{userData?.displayName && userData.displayName[0].toUpperCase()}</div>
        <div>
          <span><strong>Email:</strong> {userData?.email}</span>
          <span><strong>Last sign-in:</strong> {userData?.lastSignIn}</span>
          <span><strong>Created at:</strong> {userData?.createdAt}</span>
        </div>
      </div>
      <h3>Order History : {userData?.orders?.length | 0} in total</h3>
      <div className={styles.orderHistoryContainer}>
        {userData?.orders?.map((order:any)=>
        <div key={order.id} className={styles.orderHistoryItem}>
          <div>
            <h4>Order #{order.id}</h4>
            <span className={styles.createdAt}>{order.createdAt}</span>
          </div>
          {order.products.map((product:any,index:number)=>
          <div key={index}>
            <span><strong>{product.name} x {product.quantity} </strong></span>
            <span>price: {product.price/product.quantity}₪ x {product.quantity} = {product.price}₪</span>
          </div>
          )}
          {order.total && <span className={styles.orderTotal}><strong>Order Total: {order.total}₪</strong></span>}
        </div>)}
      </div>
      
    </div>
  )
}

export default Profile;