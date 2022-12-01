import {useEffect,useState} from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { PurchaseSuccussAlert } from '../../components/CustomAlert';

export const getStaticProps:GetStaticProps = async () => {
  return {
    props:{title:'Success'}
  }
}

const Success = () => {
  const router = useRouter();
  const [time,setTime] = useState(5);

  //count time then redirect to profile page (auth)
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
    <div>
      <PurchaseSuccussAlert/>
      <h3>Redirecting to profile page in {time}</h3>
    </div>
  )
}

export default Success;