import {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])


  const handleSubmitUser = e =>{
    const name =nameRef.current.value;
    const email =emailRef.current.value;

    const newUser = {name: name, email: email}



    //send data to server 
    fetch('http://localhost:5000/users',{
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(newUser)
    })


    e.preventDefault();
  }
  return (
    <div className="App">
      <h2>Found user: {users.length}</h2>


      <form onSubmit={handleSubmitUser}>
        <input type="text" ref={nameRef} name="" id="" placeholder="Enter your name" />
        <input type="email"  ref={emailRef} name="" id=""  placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>ID:{user.id}: Name:{user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
