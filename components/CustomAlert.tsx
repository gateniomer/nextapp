type CustomAlert = {
  title:string,
  message:string,
  color?:string
}

export const CustomAlert = ({title,message,color='#333'}:CustomAlert) => {
  return (
    <div className={'custom-alert'} style={{backgroundColor:color}}>
      <span>{title}:<strong></strong> {message}</span>
    </div>
  )
}

export const StripeErrorAlert = () => <CustomAlert title='Error' message='Purchase failed to complete, please try again.'/>;
export const PurchaseSuccussAlert = () => <CustomAlert 
title='Success' 
message='Purchase successfully completed, new order was added to your account.'
color='#FFBD59'/>;

export default CustomAlert;