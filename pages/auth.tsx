import { useAppSelector } from "../utils/hooks";
import Profile from "../components/Profile";
import LoginForm from "../components/LoginForm";
import { GetStaticProps } from "next";

export const getStaticProps:GetStaticProps = async () => {
  return {
    props:{title:'Auth'}
  }
}
export const Auth = () => {
  const user = useAppSelector(state=>state.userDetails.user);

  return (
  <div>
    {user ? <Profile user={user}/> : <LoginForm/>};
  </div>
  )
}

export default Auth;