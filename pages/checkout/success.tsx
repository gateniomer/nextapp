import styles from '../../styles/Success.module.css';
import {useEffect,useState} from 'react';
import { useRouter } from 'next/router';
const Success = () => {
  const router = useRouter();
  const [time,setTime] = useState(3);
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      if(time>1){
        setTime(prev=>prev-1);
      }else{
        router.push('/auth');
      }
    },1000);
    return ()=>clearTimeout(timeout);
  },[time]);
  return (
    <div className={styles.container}>
      <h2>Purchased Complete!</h2>
      <h3>Redirecting to profile page in {time}</h3>
    </div>
  )
}

export default Success;