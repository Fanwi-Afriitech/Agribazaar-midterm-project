import React, { useContext, useState } from 'react'
import './Navbar.css'
import { bag_icon, basket_icon, logo, logout_icon, profile_icon, search_icon } from '../../assets/asset'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({setShowLogin}) => {

      const [Products,setProduct]= useState("Home");

      const {getTotalCartAmount,token,setToken}=useContext(StoreContext);
 
      const navigate= useNavigate();
      const logout = ()=>{
          localStorage.removeItem("token");
          setToken("");
          navigate("/")

      }
  return (
    <div className='navbar'>
     <Link to='/'> <img src={logo} alt='' className='logo'/></Link>
      <ul className='navbar-prod'>
        <Link to='/' onClick={()=>setProduct("Home")} className={Products==="Home"?"active":""}>Home</Link>
        <a href='#explore-prod' onClick={()=>setProduct("Products")} className={Products==="Products"?"active":""}>Products</a>
        <a href='' onClick={()=>setProduct("About Us")} className={Products==="About Us"?"active":""}>About Us</a>
        
      <a href='#footer' onClick={()=>setProduct("Contact Us")} className={Products==="Contact Us"?"active":""}>Contact Us</a>
      
        
      </ul>
      <div className='navbar-right'>
        <img src={search_icon} alt=''/>
        <div className='navbar-search-icon'>
           <Link to='/cart'> <img src={basket_icon} alt=''/></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
             <img src={profile_icon} alt=''/>
             <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={bag_icon} alt=''/><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={logout_icon} alt=''/><p>Logout</p></li>
             </ul>
          </div>}
        
        
      </div>
    </div>
  )
}

export default Navbar
