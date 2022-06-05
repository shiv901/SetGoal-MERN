import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const {user} = useSelector(state=> state.auth)

  // useEffect(() => {
  //  if(!user){
  //   return navigate('/login')
  //   }
  // }, [user, navigate]);
 
  return (
    <div>
      <h1>
        Homepage
      </h1>
      <h3>Welcome to Goal Setter App, Made with MERN technologies, ie. MangoDB for Database, React for Frontend, NodeJs & Epress for backend of this app.</h3>
      <div style={{'display':'flex', 'justify-content':'center', 'gap':'1rem'}}>
        {user ? (
          <Link to={'/'} className='btn'>Goal DashBoard</Link>
        ) : (<>
          <Link to='/login' className='btn'> <FaSignInAlt />Login</Link>
          <Link to='/register' className='btn'> <FaUser />Register</Link>
        
        </>)}
      </div>
    </div>
  );
}

export default Home;
