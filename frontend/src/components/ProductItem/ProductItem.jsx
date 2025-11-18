import React, { useContext, useState } from 'react'
import './ProductItem.css'
import { add_icon_green, add_icon_white, rating_starts, remove_icon_red } from '../../assets/asset'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({id,name,price,description,image}) => {
    /* const [itemCount,setItemCount]=useState(0)*/
     const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)

  return (
    <div className='products-item'>
        <div className="product-item-img-container">
            <img className='product-item-img' src={url +"/images/"+image} alt=''/>
               {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={add_icon_white} alt=''/>
               
                 :<div className='product-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={remove_icon_red} alt=''/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={add_icon_green} alt=''/>
                 
                 </div>
                }
                </div>
           
        <div className="product-item-info">
            <div className="product-item-name-rating">
                <p>{name}</p>
                <img src={rating_starts} alt=''/>
            </div>
            <p className="product-item-desc">
               {description}
            </p>
            <p className="product-item-price">
                ${price}
            </p>
        </div>
      
    </div>
  )
}

export default ProductItem
