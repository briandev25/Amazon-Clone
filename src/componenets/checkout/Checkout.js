import React from 'react'
import './Checkout.css';
import Subtotal from '../subtotal/Subtotal';
import { useStateValue } from '../../StateProvider'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import FlipMove from 'react-flip-move';
function Checkout() {
    const [{ basket}, dispatch] = useStateValue();
    return (
        <div className='checkout'>
            <div className='=checkout__left'>
                <img className='checkout__ad' src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' alt='img'/>
                <div>
                    <h3 className='checkout__title'>Your Shopping Basket</h3>
                    <div className="checkout__items">
                        <FlipMove>
                        {basket.map(item => <div className="checkout__item">
                             <CheckoutProduct title={item.title} price={item.price} rating={item.rating} image={item.image} id={item.id} />
                        </div>)}
                        </FlipMove>
                    </div>
                </div>
            </div>
            <div className='checkout__right'>
               <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
