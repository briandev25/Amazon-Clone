import React,{useEffect, useState} from 'react'
import './Orders.css'
import { db } from '../Firebase';
import { useStateValue } from '../StateProvider'
import Order from './Order/Order';
import { collection,query,orderBy, QuerySnapshot } from 'firebase/firestore'
function Orders() {
    const [{ basket,user }, dispatch] = useStateValue();
   const [orders,setOrders] = useState([]);
   useEffect(() =>{
      if(user){
    //      db.collection('users').doc(user.id).collection('orders').orderBy('created','desc').onSnapshot(snapshot =>{
    //         setOrders(snapshot.docs.map(doc =>
    //              ( {
    //                  id:doc.id,
    //                  data:doc.data()
    //              })
    //         ))
    //    });
    //    console.log("The order data is >>>",orders.id)

    db.collection('users').doc(user.id).collection('orders').get().then((QuerySnapshot) =>{
        QuerySnapshot.forEach(element =>{
            var order = {
                id:element.id,
                data:element.data()}
            setOrders([order])
        })
    })
   }else
     {
          setOrders([]);
      }
   }, [user])
    return (
        <div className='orders'>
            <h1>Orders Page</h1>
            <div className='orders__order'>
            {orders.map(order =>(
                <Order order= {order}/>
            ))}
            </div>
        </div>
    )
}

export default Orders;


