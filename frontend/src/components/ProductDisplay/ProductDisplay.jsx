import React from 'react'
import './ProductDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItem/ProductItem'

const ProductDisplay = ({category}) => {
    const {item_list}= useContext(StoreContext)
  return (
    <div className='item-display' id='item-display'>
        <h2>Top picks for you</h2>
        <div className="product-display-list">
            {item_list.map((item,index)=>{
                if (category==="All" || category===item.category){
                    return <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>

                }
             
            }
            )

            }
        </div>
      
    </div>
  )
}

export default ProductDisplay
