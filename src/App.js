import './App.css';
import Header from './componenets/header/Header';
import Home from './componenets/home/Home';
import Checkout from './componenets/checkout/Checkout';
import {Routes,Route } from 'react-router-dom'
import Login from './login/Login';
import { useStateValue } from './StateProvider'
import { useEffect } from 'react';
import { auth } from './Firebase';
function App() {
  const[{ user }, dispatch] = useStateValue();

  useEffect(() =>{
      auth.onAuthStateChanged(authUser => {
        console.log('The user is >>>', authUser);
        if(authUser){
            dispatch({
              type:'SET_USER',
              user:authUser
            })
        }else{
         dispatch({
          type:'SET_USER',
          user:null
         })
        }
      }) 
  },[])
  return (
    <div className="App">
      <Routes>
       <Route path ='/' element ={<>
       <Header />
       <Home />
       </>}/>
       <Route path ='/checkout' element ={<>
       <Header />
       <Checkout />
       </>} />
       <Route path ='/login' element ={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
