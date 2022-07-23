import React, { useState, useEffect,useContext, useRef } from 'react'
import userContext from '../context/user/userContext';
import AboutUser from './AboutUser';
import { useHistory } from 'react-router-dom';

function About(props) {
  const context = useContext(userContext);
  const {users ,getUser,editUser } = context;
  
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
    else{
      history.push("/login");
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const [user, setUser] = useState({ ename: "", eemail: "", epassword: "" })

  const updateUser = (currentUser) => {
    ref.current.click();
    setUser({ id: currentUser._id, ename: currentUser.name, eemail: currentUser.email, epassword: currentUser.password });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(user.id, user.ename, user.eemail, user.epassword);
    props.showAlert("User updated Successfully", "success");
    refClose.current.click();
  }


  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  return (
    <>
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Info</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className='mx-4'>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="ename" name='ename' value={user.ename} onChange={onChange} required minLength={5} />
                  <div className="form-text text-danger">*Minimum Length 5 Characters</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="eemail" name='eemail' value={user.eemail} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input className="form-control" id="epassword" name="epassword" value={user.epassword} onChange={onChange}  required minLength={5}></input>
                  <div className="form-text text-danger">*Minimum Length 5 Characters</div>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  onClick={handleSubmit} className="btn btn-outline-primary">Update Info</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className='text-center my-3'>Your Information</h2>
      <div className="row my-4">
      <AboutUser users={users} updateUser={updateUser} showAlert={props.showAlert} />
       {/* {
          users.map((user) => {
            return 
          })
        }  */}
      </div>

    </>
  )
}

export default About;