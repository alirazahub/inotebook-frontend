import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import YourNotes from './components/YourNotes';
import Footer from './components/Footer';
import Error from './components/Error';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserState from './context/user/UserState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }

  return (
    <>
      <NoteState>
        <UserState>
          <Router>
            <div className="container">
              <Navbar showAlert={showAlert} />
              <Alert alert={alert} />
              <Switch>
                <Route exact path="/">
                  <Home showAlert={showAlert} />
                </Route>
                <Route path="/about">
                  <About showAlert={showAlert}/>
                </Route>
                <Route path="/yournotes">
                  <YourNotes showAlert={showAlert} />
                </Route>
                <Route path="/login">
                  <Login showAlert={showAlert} />
                </Route>
                <Route path="/signup">
                  <SignUp showAlert={showAlert} />
                </Route>
                <Route path="/:opt1">
                  <Error />
                </Route>
              </Switch>
              <Footer />
            </div>
          </Router>
        </UserState>
      </NoteState>
    </>
  );
}

export default App;
