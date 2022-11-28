import {FormEvent,useState,MouseEvent} from 'react';
import { 
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
  signInUserWithGooglePopup,
 } from '../utils/firebase';
import styles from '../styles/LoginForm.module.css';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
        <h2>Hello stranger 👋</h2>
        <label>
          Your Email:
          <input 
          required
          type="email" 
          name='email' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label>
          Your Password:
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
        <button className={'btn'} type="submit">{`Sign ${isNewUser ? 'Up' : 'In'}`}</button>
        <button className={'btn'} onClick={(e)=>onGoogleHandler(e)}><FontAwesomeIcon icon={faGoogle}/>{` Sign ${isNewUser ? 'up' : 'in'} with Google`}</button>
        <span onClick={()=>setIsNewUser(prev=>!prev)}>{
          isNewUser ?
          'Existing user? Click here to sign in' :
          'New user? Click here to register'
        }</span>
      </form>
    </div>
  )
}

export default LoginForm;