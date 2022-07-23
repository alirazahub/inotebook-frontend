import React from 'react'
import { useHistory } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom'

function Navbar(props) {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
    props.showAlert('You have been logged out', 'success');
  }
  return (
    <>

      <nav className="navbar custom__bg navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to='/'>iNoteBook</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
              {localStorage.getItem('token') ? <ul className="navbar-nav me-auto mb-2 mb-lg-0"> <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/yournotes'>Your Notes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/about'>About</NavLink>
              </li></ul>: <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>}
            

            {!localStorage.getItem("token") ? (
            <>
              <Link className="mx-1 btn btn-outline-primary" to="/login">
                Login
              </Link>
              <Link className="mx-1 btn btn-outline-primary" to="/signup">
                SignUp
              </Link>
            </>
          ) : (
            <button
            onClick={handleLogout}
              className="mx-1 btn btn-outline-danger"
            >
              Logout
            </button>
          )}
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar;