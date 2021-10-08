import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from "./Firebase/firebase.init";



initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);

  const auth = getAuth();


  const handleEmaiChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleUser = () => {
    if (password.length < 6) {
      setError('Password should be at least 6 characters')
      return;
    }
    login ? loginUser() : createNewUser();

  }

  const createNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setError('Account create successfully')

      })
      .catch(error => {
        setError(error.message);
      })
  }

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        setError('Login successfully')
      })
      .catch(error => {
        setError(error.message)
      })
  }


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }
  return (
    <div className="App">

      <div className="container bg-light p-4">
        <h2>Please {login ? 'Login' : 'Register'}</h2>
        <div className="mb-4">
          <span className="py-2 px-3 text-white rounded-start bg-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg></span>
          <input required onBlur={handleEmaiChange} className="w-50 p-1 rounded-end" type="email" placeholder="Your Email" />
        </div>
        <div className="">
          <span className="py-2 px-3 text-white rounded-start bg-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg></span>
          <input required onBlur={handlePasswordChange} className="w-50 p-1 rounded-end" type="password" placeholder="Your Password" name="" id="" />
        </div>
        <p className="text-danger p-2">{error}</p>
        <div className="mt-4">
          <button onClick={handleUser} className="bg-success text-white py-2 px-4 rounded">{login ? 'Login' : 'Register'}</button>
        </div>
        <div className="mt-4">
          {login ? <p onClick={() => setLogin(false)} className="text-primary custome">Don't have a account.</p>
            :
            <p onClick={() => setLogin(true)} className="text-primary custome">I have a account.</p>}
        </div>
        <div className="mt-5">
          <button onClick={handleGoogleSignIn} className="bg-success text-white py-2 px-4 rounded"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg></span> Google Sign In</button>
          <button className="bg-success text-white py-2 px-4 rounded ms-3"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg></span> Facebook Sign In</button>
        </div>
      </div>
    </div >
  );
}

export default App;
