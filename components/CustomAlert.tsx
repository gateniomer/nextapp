type CustomAlert = {
  title:string,
  message:string,
  timeout?:number
}

export const CustomAlert = ({title,message,timeout=3}:CustomAlert) => {
  return (
    <div className={'custom-alert'}>
      <span>{title}:<strong></strong> {message}</span>
    </div>
  )
}

export const StripeErrorMessage = () => <CustomAlert title='Error' message='Purchase failed to complete, please try again.'/>;

export default CustomAlert;