import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from '../../StateProvider'
function CheckoutProduct({id,title,rating,price,image,hiddenButton}) {
    const [{ basket },dispatch] = useStateValue();
    const removeFromBasket = () =>{
         dispatch({
             type:'REMOVE_FROM_CART',
             id:id
         })
    }
    return (
        <div className='checkout__product'>
              <img src={image} className='checkout__image'/>
            <div className='checkout__info'>
               <p className='checkout__title'>{title}</p>
               <div className='checkout__price'>
                    <small>$</small>
                    <strong>{price}</strong>
               </div>
               <div className='product__rating'>
                  {Array(rating).fill().map((_, i) => <p>⭐</p>)}
               </div>
               {!hiddenButton && (<button onClick={removeFromBasket} className='checkout__button'>Remove from Basket</button>)}
            </div>
            
        </div>
    )
}

export default CheckoutProduct;
