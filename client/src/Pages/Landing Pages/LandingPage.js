import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage () {


    return(
   
       <div >
           <h2 id="page-title">Food Pals</h2>
           <div className="homepage home-margin">

            <div>
                <Link to="/login">
                <button className="homepagebutton">Login</button>
                </Link>
            </div>
            <div>
            <Link to="/signup">
                <button className="homepagebutton">Sign Up</button>
                </Link>
                </div>
           
            
           </div>
       </div>
   
    )   
   
   }
   
   
   export default LandingPage;