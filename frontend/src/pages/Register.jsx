import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state=> state.auth)

  useEffect(()=>{
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      // toast('User Signed in...')
      navigate('/')
    }
    dispatch(reset())


  },[user, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== password2) {
      toast.error('passwords do not match')
    } else {
      const userData = {name, email, password}
      
      dispatch(register(userData))
    }
  }

  if (isLoading){
    return <Spinner />
  }

  return ( 
  <>
    <section className="heading">
      <h1><FaUser /> Register</h1>
      <p>Please create a new account</p>
    </section>

    <section className="form">
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" id="name" className="form-control" name="name" value={name} placeholder="Enter a Name" onChange={onChange}/>
        </div>
        
        <div className="form-group">
          <input type="email" id="email" className="form-control" name="email" value={email} placeholder="Enter an Email" onChange={onChange}/>
        </div>

        <div className="form-group">
          <input type="password" id="password" className="form-control" name="password" value={password} placeholder="Enter Password" onChange={onChange}/>
        </div>

        <div className="form-group">
          <input type="password" id="password2" className="form-control" name="password2" value={password2} placeholder="Confirm passowrd" onChange={onChange}/>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>

      </form>
    </section>
  </> 
  );
}

export default Register;