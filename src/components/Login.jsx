import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In Successfully","success");
            history.push('/');
        }else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='cutom_margin'>
            <h2 className='text-center my-3'>Login to iNoteBook</h2>
            <form className='col-md-3 col-10 mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange = {onChange} value={credentials.email} id="email" name='email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange = {onChange} value={credentials.password} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-outline-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;