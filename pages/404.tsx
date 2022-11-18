import {useState,useEffect} from 'react';
import styles from '../styles/Page404.module.css';
import {useRouter} from 'next/router';

export const Page404 = () => {
  const [count,setCount] = useState(5);
  const router = useRouter();
  
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      if(count>1){
        setCount(prev=>prev-1);
      }else{
        router.push('/');
      }
    },1000);
    return ()=>clearTimeout(timeout);
  },[count])
  return (
  <div className={styles.container}>
    <h2>Woops.. nothing to see here!</h2>
    <h3>Redirecting to home page in {count}</h3>
  </div>
  )
}
export default Page404;