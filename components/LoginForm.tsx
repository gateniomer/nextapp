import {FormEvent,useState,MouseEvent} from 'react';
import { useAppSelector } from '../utils/hooks';
import { 
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
  signInUserWithGooglePopup,
 } from '../utils/firebase';
import styles from '../styles/LoginForm.module.css';


export const LoginForm = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isNewUser,setIsNewUser] = useState(false);

  const onSubmitHandler = (e:FormEvent) => {
    e.preventDefault();
    if(isNewUser){
      if(password !== confirmPassword){
        alert('Error: Passwords does not match.\nPlease write the same password for both inputs.');
        return;
      }
      signUpUserWithEmailAndPassword(email,password);
    }else{
      signInUserWithEmailAndPassword(email,password);
    }
  }

  const onGoogleHandler = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInUserWithGooglePopup();
  }
  return (
    <div className={styles.container}>
      <form onSubmit={(e)=>onSubmitHandler(e)}>
        <h2>👤Sign {isNewUser ? 'Up' : 'In'}</h2>
        <label>
          Email:
          <input 
          required
          type="email" 
          name='email' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input 
          required
          type="password" 
          name='password' 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        {isNewUser && 
        <label>
          Confirm Password:
          <input 
          required
          type="password" 
          name='confirm_password' 
          value={confirmPassword} 
          onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </label>}
        <input type="submit" value={`Sign ${isNewUser ? 'Up' : 'In'}`} />
        <button onClick={(e)=>onGoogleHandler(e)}>{`Sign ${isNewUser ? 'Up' : 'In'} with Google`}</button>
        <span onClick={()=>setIsNewUser(prev=>!prev)}>{
          isNewUser ?
          'Existing user? Click here to sign-in' :
          'New user? Click here to register'
        }</span>
      </form>
    </div>
  )
}

export default LoginForm;