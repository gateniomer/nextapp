import { useAppSelector } from "../utils/hooks";
import { useRouter } from "next/router";
import {useEffect} from 'react';
const Profile = () =>{
  const user = useAppSelector(state=>state.userDetails.user);
  const router = useRouter();
  useEffect(()=>{
    if(!user) router.replace('/signin');
  },[user])
  return user && (
    <div>
      <h2>Profile</h2>
    </div>
  )
}

export default Profile;