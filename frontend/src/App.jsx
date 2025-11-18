import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


//component sets up the basic structure and routing for the React application
//It offers conditional rendering of the Login component based on the showLogin state.

const App = () => {
  const[showLogin,setShowLogin]= useState(false)
  
  
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>

        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/cart' element={<Cart />} />
         

          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>


        </Routes>

      </div>
      <Footer />
    </>

  )
}

export default App
