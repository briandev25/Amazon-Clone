export const initialState ={
    basket:[]
}

export const getTotalPrice = (basket) => basket?.reduce((amount,item) => amount+item.price,0);

const reducer = (state,action) =>{
      switch(action.type){
          case'ADD_TO_CART':
          return{
              ...state,
              basket:[...state.basket,action.item]  
          }
          case'REMOVE_FROM_CART':
          const index = state.basket.findIndex((item) => item.id === action.id);
          let newBasket =[...state.basket]
            if(index>=0){
               newBasket.splice(index,1); 
            }else{
                console.warn(`Cant remove item of id:${action.id} from cart,not in cart`);
            }
          return{
            ...state,
            basket:newBasket 
          }
          default:
              return state;
      }
}
export default reducer;