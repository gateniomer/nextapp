import {useState,useEffect} from 'react';

type CustomAlert = {
  title:string,
  message:string,
  timeout?:number
}

export const CustomAlert = ({title,message,timeout=3}:CustomAlert) => {
  const [finished,setFinished] = useState(false);
  useEffect(()=>{
    let count = timeout;
    const interval = setInterval(()=>{
      if(count === 1){
        //del
        console.log('boom!',count);
        setFinished(true);
        clearInterval(interval);
      }else{
        count-=1;
      }
    },1000);
    return ()=>clearInterval(interval);
  },[]);

  return (
    <div className={'custom-alert' + (finished ? ' custom-alert-finished' : '')}>
      <span>{title}:<strong></strong> {message}</span>
    </div>
  )
}

export const StripeErrorMessage = <CustomAlert title='Error' message='Purchase failed to complete, please try again.'/>;

export default CustomAlert;