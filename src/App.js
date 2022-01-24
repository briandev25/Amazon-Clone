import './App.css';
import Header from './componenets/header/Header';
import Home from './componenets/home/Home';
import Checkout from './componenets/checkout/Checkout';
import Orders from './orders/Orders';
import Login from './login/Login';
import Payment from './payment/Payment';

import {Routes,Route } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { useEffect } from 'react';
import { auth } from './Firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KJcvBHCHeFhhElQZ3x8XfL1sXMY262bQw7v0tY2k4pTDoCJF3yjWAaOGdpZkzZN6CPXAohZmxIgmXvnPPMTBmSl00wwCwhyZI');
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
       <Route path ='/payment' element ={<>
       <Header />
       <Elements stripe={promise}>
        <Payment />
       </Elements>
       </>} />
       <Route path ='/login' element ={<Login />} />
       <Route path ='/orders' element ={ <>
       <Header />
       <Orders />
       </>}/>
      </Routes>
    </div>
  );
}

export default App;
