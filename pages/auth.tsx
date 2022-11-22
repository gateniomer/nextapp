import { useAppSelector } from "../utils/hooks";
import Profile from "../components/Profile";
import LoginForm from "../components/LoginForm";

export const Auth = () => {
  const user = useAppSelector(state=>state.userDetails.user);

  return (
  <div>
    {user ? <Profile user={user}/> : <LoginForm/>};
  </div>
  )
}

export default Auth;