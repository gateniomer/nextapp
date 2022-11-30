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

  let renderedComponent;

  switch(user){
    case null:
      renderedComponent = <h1>Loading..</h1>;
      break;
    case undefined:
      renderedComponent = <LoginForm/>;
      break;
    default:
      renderedComponent = <Profile user={user}/>
  }
  
  return (
  <div className="page-container">
    {renderedComponent}
  </div>
  )
}

export default Auth;