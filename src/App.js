import './App.css';
import Header from './componenets/header/Header';
import Home from './componenets/home/Home';
import Checkout from './componenets/checkout/Checkout';
import {Routes,Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
       <Route path ='/' element ={<Home />}/>
       <Route path ='/checkout' element ={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
