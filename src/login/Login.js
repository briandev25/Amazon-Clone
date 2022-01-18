import React,{useState} from 'react'
import './Login.css'
import { Link,useNavigate  } from 'react-router-dom';
import { auth } from '../Firebase'
function Login() {
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');

   const navigate = useNavigate();

   const updateEmail = (e) =>{
       setEmail(e.target.value);
   }
   const updatePassword = (e) =>{
       setPassword(e.target.value);
   }
   const submitDetails = (e) =>{
       e.preventDefault();
       auth.signInWithEmailAndPassword(email,password).then(auth =>{
           navigate('/')
       }).catch(err => alert(err.message))
   }
   const register = (e) => {
       e.preventDefault();
       auth.createUserWithEmailAndPassword(email,password)
       .then(
           (auth) => {console.log(auth)
            if(auth){
                navigate('/')
             }
            }
           )
       .catch(err => alert(err.message));
   }
    return (
        <div className='login'>
            <Link to= '/'>
            <img 
            className='login__logo'
             src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
             </Link>
             <div className='login__container'>
                <h2>Sign In</h2>
                <form onSubmit={submitDetails}>
                   <h5>E-mail</h5> 
                   <input type='text' value={email} onChange={updateEmail} />
                   <h5>Password</h5> 
                   <input type='password' value={password} onChange={updatePassword} />
                   <button className='login__signInButton'>Sign In</button>
                </form>
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button className='login__signUpButton' onClick={register}>Create Your Amazon Account</button>
             </div>
        </div>
    )
}

export default Login;
