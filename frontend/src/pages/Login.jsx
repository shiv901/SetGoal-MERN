import {useState, useEffect} from 'react'
import {FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: [e.target.value]
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return ( 
  <>
    <section className="heading">
      <h1><FaSignInAlt /> Login</h1>
      <p>Login into your account</p>
    </section>

    <section className="form">
      <form action="" onSubmit={onSubmit}>
        
        <div className="form-group">
          <input type="email" id="email" className="form-control" name="email" value={email} placeholder="Enter an Email" onChange={onChange}/>
        </div>

        <div className="form-group">
          <input type="password" id="password" className="form-control" name="password" value={password} placeholder="Enter Password" onChange={onChange}/>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>

      </form>
    </section>
  </> 
  );
}

export default Login;