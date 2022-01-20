import React,{useState,useEffect} from 'react';
import './Payment.css';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../componenets/CheckoutProduct/CheckoutProduct';
import FlipMove from 'react-flip-move';
import { CardElement, useStripe,useElements} from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import { getTotalPrice } from '../reducer'
import axios from '../axios';
import { useNavigate} from 'react-router-dom'

function Payment() {
    const [{ basket,user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [succeeded,setSucceeded] = useState(false);
    const[processing,setProcessing] = useState(false);
    const [clientSecret,setClientSecret] = useState('');

    useEffect(() =>{
        // generate a special stripe secret which allowa us to charge a customer
      const getClientSecret = async () =>{
             const response = await axios({
                 method:'post',
                 //Stripe expects the total in currencies subunits
                 url:`/payments/create?total=${getTotalPrice(basket) * 100}`
             })
            setClientSecret(response.data.clientSecret)
      }
      getClientSecret();
    },[basket])
    console.log("The Client Secret >>>",clientSecret);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement) 
            }
        }).then(({ paymentIntent}) =>{
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate('/orders', {replace:true});

            //empty the basket
            dispatch({
                type:'EMPTY_THE_CART'
            })
        })
    }
    const handleChange = e =>{
        setDisabled(e.empty);
       setError(e.error ? e.error.message : '');
    }
    return (
        
        <div className='payment'>   
           <div className='payment__container'>
               <h1>Checkout ({basket.length}) Items</h1>
               <div className='payment__section'>
                   <div className='payment__title'>
                       <h3>Delivery Address</h3>
                   </div>
                   <div className='payment__address'>
                         <p>Users Email: {user?.email}</p>
                         <p>123 Nairobi,Kitengela</p>
                         <p>Nairobi,Kenya</p>
                   </div>
               </div>
               <div className='payment__section'>
                   <div className='payment__title'>
                       <h3>Review Items and Delivery</h3>
                   </div>
                   <div className='payment__items'>
                   <FlipMove>
                        {basket.map(item => <div className="checkout__item">
                             <CheckoutProduct title={item.title} price={item.price} rating={item.rating} image={item.image} id={item.id} />
                        </div>)}
                   </FlipMove>
                   </div>
               </div>
               <div className='payment__section'>
                   <div className='payment__title'>
                       <h3>Payment Method</h3>
                   </div>
                   <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat 
                                    renderText={value =><>
                                    <h3>Order Total : {value}</h3>
                                    </>}
                                    decimalScale={2}
                                    value={getTotalPrice(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix='$'
                                    />
                            <button disabled={ processing || disabled || succeeded}>
                                <span>{processing ? "Processing": "Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                        </form>
                        
                   </div>
               </div>
           </div> 
        </div>
    
    )
}

export default Payment
