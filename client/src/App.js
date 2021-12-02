
import './App.css';
import { useState } from "react";
import Axios from "axios";


function App() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loginStatus, setLoginStatus] = useState("");
const [userNotes, setUserNotes] = useState("");


const addUser = () => {
      Axios.post('http://localhost:3001/create', {
        name: name, 
        email: email, 
        password: password
      }).then(() => {
        console.log("success");
      });
}

const login = () => {
  Axios.post('http://localhost:3001/login', {
    email: loginEmail, 
    password: loginPassword
  }).then((response) => {
    if(response.data.message) {
      setLoginStatus(response.data.message)
    }
    else{
      notes();
    setLoginStatus("Hello, "+response.data[0].name);
    }
  });
}

const notes = () => {
  Axios.post('http://localhost:3001/notes', {
    email: loginEmail, 
  }).then((response) => {
    if(response.data.message) {
      setUserNotes(response.data.message)
    }
    else{
    setUserNotes(response.data[0].userNotes);
    }
  });
}

const updateNote = () => {
  Axios.post('http://localhost:3001/update', {
    email: loginEmail,
    userNotes: userNotes, 
  }).then((response) => {
     setUserNotes(response.data.message)
  });
}

const deleteUser = () => {
  Axios.post('http://localhost:3001/delete', {
    email: loginEmail,
  }).then((response) => {
     setUserNotes(response.data.message)
  });
}

const notesStatus = () => {
  if(userNotes){
  return <div>
    <div>
        <h4>{userNotes}</h4>
        <input 
          type="text"
          size="30" 
          placeholder= "Update current Notes"
          onChange={(event) => {
            setUserNotes(event.target.value);
          }}
        />
        <button onClick = {updateNote} >Update!</button>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <button onClick = {deleteUser} >Delete User</button>
  </div>;
  }
  else{
    return <div></div>;
  }
}

  return (
    <div className="App">
      <div className="Information">
        <h2>Create New User</h2>
        <label>Name: </label>
        <input 
          type="text" 
          onChange={(event) => {
            setName(event.target.value);
          }
        }
        />
        
        <label>Email: </label>
        <input 
          type="email" 
          onChange={(event) => {
            setEmail(event.target.value);
          }
        }
        />

        <label>Password: </label>
        <input 
          type="password" 
          onChange={(event) => {
            setPassword(event.target.value);
          }
        }
        />

        <button onClick = {addUser} >Add User</button>

        <h2>Login</h2>
        
        <label>Email: </label>
        <input 
          type="email" 
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }
        }
        />

        <label>Password: </label>
        <input 
          type="password" 
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }
        }
        />

        <button onClick = {login} >Log In!</button>
        <h2>{loginStatus}</h2>
        {notesStatus()}
        
      </div>
    </div>
  );
}

export default App;
