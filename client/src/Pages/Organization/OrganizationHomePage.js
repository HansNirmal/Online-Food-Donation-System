import React from 'react';
import { Link } from 'react-router-dom';

function OrganizationHomePage () {


    return(
   
       <div >
           <h2 id="page-title">Organization Home</h2>
           <div className="homepage home-margin">

            <div>
                <Link to="/foodaidrequest">
                <button className="homepagebutton">Create Food Aid Request</button>
                </Link>
            </div>
            <div>
            <Link to="/organization-mgmt">
                <button className="homepagebutton">Manage Requests</button>
                </Link>
                </div>
           
            
           </div>
       </div>
   
    )   
   
   }
   
   
   export default OrganizationHomePage;