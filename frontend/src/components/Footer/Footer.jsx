import React from 'react'
import './Footer.css'
import { facebook_icon, linkedin_icon, logo, twitter_icon } from '../../assets/asset'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
               <img src={logo} alt=''/>
               <p> Follow Us</p>
               <div className="footer-social-icons">
                  <img src={facebook_icon} alt=''/>
                  <img src={linkedin_icon} alt=''/>
                  <img src={twitter_icon} alt=''/> 
                    
               </div>
            </div>
            
            <div className="footer-content-center">
                  <h2>QUICK LINKS</h2>
                  <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                  </ul>
            </div>
            <div className='footer-content-right'>
            <h2 >GET IN TOUCH</h2>
                <ul>
                    <li>+254 796623541</li>
                    <li>agribazaar@gmail.com</li>
                </ul>
            </div>
           
            

        </div>
        <hr></hr>
        <p className="footer-copyright">
           Copyright 2020 @Agribazaar.com - All Right Reserved 
        </p>
      
    </div>
  )
}

export default Footer
