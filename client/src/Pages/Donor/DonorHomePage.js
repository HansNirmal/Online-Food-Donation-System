import React from 'react';
import { Link } from 'react-router-dom';

function DonorHomePage () {


 return(

    <div>
        <h2 id="page-title">Donor Home</h2>
        <div className="homepage home-margin">
            <div>
                <Link to="/donor-accept-request">
                <button className="homepagebutton">Donation Acceptance</button>
                </Link>
                </div>
            <div>
                <Link to="/donor-mgmt">
                <button className="homepagebutton">Manage Donations</button>
                </Link>
                </div>
        </div>
    </div>

 )   

}


export default DonorHomePage;