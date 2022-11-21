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
      <h3>User Details</h3>
      <div className={styles.userDetailsContainer}>
        <div className={styles.avatar}>{userData?.displayName[0].toUpperCase()}</div>
        <div>
          <span><strong>Email:</strong> {userData?.email}</span>
          <span><strong>Last sign-in:</strong> {userData?.lastSignIn}</span>
          <span><strong>Created at:</strong> {userData?.createdAt}</span>
        </div>
      </div>
      <h3>Order History : {userData?.orders.length} in total</h3>
      {userData?.orders.map((order:any)=><div key={order.id}>
        <h4>Order #{order.id}</h4>
        {order.products.map((product:any)=><p key={product.name}>{product.name} x {product.quantity} </p>)}
      </div>)}
    </div>
  )
}

export default Profile;