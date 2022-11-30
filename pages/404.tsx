import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import { GetStaticProps } from 'next';

export const getStaticProps:GetStaticProps = async () => {
  return {
    props:{title:'404'}
  }
}

export const Page404 = () => {
  const [count,setCount] = useState(5);
  const router = useRouter();
  
  //count 5 seconds then redirect to homepage
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
  <div className={'page-container'}>
    <h2>Woops.. nothing to see here!</h2>
    <h3>Redirecting to home page in {count}</h3>
  </div>
  )
}
export default Page404;