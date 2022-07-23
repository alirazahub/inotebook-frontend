import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function SignUp(props) {
  let history = useHistory();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push('/');
            props.showAlert("Account Created Successfully","success");
        }else{
          props.showAlert("Invalid Details","danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  return (
    <>
      <h2 className='text-center my-3'>Sign Up to iNoteBook</h2>
      <form className='col-md-3 col-10 mx-auto' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" name='name' />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password'minLength={5} required/>
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword'minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-outline-primary">Sign Up</button>
      </form>
    </>
  )
}

export default SignUp;