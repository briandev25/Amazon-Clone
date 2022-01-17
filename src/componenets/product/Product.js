import React from 'react'
import './Product.css'
import {useStateValue} from '../../StateProvider'

function Product({id,title,price,rating,image}) {
    const[state,dispatch] = useStateValue();
    const addToBasket = ()=>{
         dispatch({
             type:'ADD_TO_CART',
             item:{
                 id:id,
                 title:title,
                 price:price,
                 rating:rating,
                 image:image
             }
         })
        
    }
    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <div className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </div>
                <div className='product__rating'>
                  {Array(rating).fill().map((_, i) => <p>⭐</p>)}
                  </div>
                </div>
                <img className="product__img"  src={image} alt='img'/>
                <button onClick={addToBasket}>Add to basket</button>
            
        </div>
    )
}
 
export default Product;
