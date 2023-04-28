import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';

export default function AllOrders() {

    let userData=localStorage.getItem('userData')
    userData=(JSON.parse(userData));

const [allOrders, setallOrders] = useState(null)
   async function getAllOrders(){
    try {

        let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userData?.id}`)
        console.log(data);
        setallOrders(data)
    } catch (error) {
        console.log('Err',error);
    }
   }
           
 useEffect(function(){
    getAllOrders()
 },[])


  return (
   <>
   {allOrders? <div className="container py-5">
        <h2 className='text-main'>Hello, {userData.name}</h2>
        <div className="row">
           {allOrders.map(function(order,index){
            return <div key={index} className="col-md-4">
            <div className="order border-main rounded-4 p-4">
              
                <h5 className='text-muted'>Price: {order.totalOrderPrice} EGP</h5>
                <p className='text-main'>This order was delivered to ({order.shippingAddress.details}) in ({order.shippingAddress.city})
                    with this number:{order.shippingAddress.phone}
                </p>
                <div className="container">
                    <div className="row">
                       
                        {order.cartItems.map(function(item,index){
                    return <div key={index} className="col-sm-6">
                            <div className="item">
                            <img src={item.product.imageCover} className='w-100' alt={item.title}/>    
                            <h5 className='text-muted'>Count: {item.count}</h5>
                            <h5 className='text-muted'>Price: {item.price}EGP</h5>
                        </div>
                    </div>})}
                    </div>
                </div>
            </div>
        </div>
           })}
        </div>
    </div>:<Loading/>}
   
   </>
  )
}
