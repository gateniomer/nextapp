import { useAppSelector } from "../utils/hooks";
import { useRouter } from "next/router";
import {useEffect,useState} from 'react';
import styles from '../styles/Profile.module.css';
import { Timestamp } from "firebase/firestore";
import { getUserData } from "../utils/firebase";

export const getServerSideProps = async () => {
  return {props:{title:'User Profile'}}
}
const Profile = () =>{
  const [userData,setUserData] = useState<any>(undefined);
  const user = useAppSelector(state=>state.userDetails.user);
  const router = useRouter();
  console.log(userData);
  
  useEffect(()=>{
    user && getUserData(user).then(data=>setUserData(data));
  },[user]);

  //redirect to login page if user not signed in
  useEffect(()=>{
    if(!user) router.replace('/signin');
  },[user])

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
      <h3>Order History</h3>
    </div>
  )
}

export default Profile;