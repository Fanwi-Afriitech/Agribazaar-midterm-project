import React from 'react'
import './ExploreProducts.css'
import  { prod_list } from '../../assets/asset'

const ExploreProducts = ({category,setCategory}) => {
  return (
    <div className='explore-prod' id='explore-prod'>
        <h1>Discover Our Products</h1>
          
        <p className='explore-prod-text'>Discover the exceptional quality and freshness of our products, handpicked and delivered directly to you, ensuring you enjoy the best nature has to offer in every bite.</p>
        <div className="explore-prod-list">
           {prod_list.map((item,index)=>{
             return(
                <div onClick={()=>setCategory(prev=>prev===item.prod_name?"All":item.prod_name)} key={index} className="explore-prod-list-item">
                  <img className={category===item.prod_name?"active":""} src={item.prod_image} alt=''/>
                  <p>{item.prod_name}</p>
               </div>
             )

})}
            

           
        </div>
      <hr/>
    
    </div>
  )
}

export default ExploreProducts
