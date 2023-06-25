import React from 'react';
import { Link } from 'react-router-dom';


function VolunteerHomePage () {


    return(
   
       <div>
           <h2 id="page-title">Volunteer Home</h2>
           <div className="homepage home-margin">

                <div>
                    <Link to="/volunteer-delivery-accept">
                    <button className="homepagebutton">Delivery Acceptance</button>    
                    </Link>
                </div>
                <div>
                    <Link to="/volunteer-mgmt">
                    <button className="homepagebutton">Manage Deliveries</button>
                    </Link>
                </div>
            </div>
       </div>
   
    )   
   
   }
   
   
   export default VolunteerHomePage;