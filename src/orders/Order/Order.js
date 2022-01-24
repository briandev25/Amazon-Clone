import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from '../../componenets/CheckoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
    return (
        <div className='order'>
           <p> {moment.unix(order.data.created).format('MMMM Do YYYY, h:mm:ss a')} </p>  
           <p className='order__id'>
               <small>{order.id}</small>
           </p>
           {order.data.basket.map(item =>(
               <CheckoutProduct title={item.title} price={item.price} rating={item.rating} image={item.image} id={item.id} hiddenButton={true} />
           ))}
           <CurrencyFormat 
              renderText ={(value) =>(
                  <h3 className='order__total'>Order Total: {value}</h3>
              )}
              decimalScale ={2}
              value ={order.data.total/100}
              displayType='text'
              thousandSeparator={true}
              prefix='$'
           />
        </div>
    )
}

export default Order
