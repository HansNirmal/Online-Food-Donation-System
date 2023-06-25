import { useEffect,useState } from 'react';
import axios from "axios";

function DonorMgmtPage () {

    const [selfDeliveries,setSelfDeliveries] = useState(null);
    const [nonAcceptedVolunteerDeliveries,setNonAcceptedVolunteerDeliveries] = useState(null);
    const [acceptedVolunteerDeliveries,setAcceptedVolunteerDeliveries] = useState(null);
    const [updateDonation,setUpdateDonation] = useState(
        {
          _id:null,
          orgId:"",
          orgName:"",
          requestTitle:"",
          population:"",
          dueDate:"",
          orgOtherDetails:"",
          orgLocation:"",
          orgTelephone:"",
          donorId:"",
          donorName:"",
          donationSize:"",
          deliveryMethod:"",
          donorTelephone:"",
          donorOtherDetails:"",
          donorLocation:""
        }
      );


//useEffect
useEffect(() => {
    fetchSelfDeliveryDonations();
}, []);

useEffect(() => {
    fetchVolunteerDeliveryDonations();
}, []);

useEffect(() => {
    fetchAcceptedVolunteerDeliveryDonations();
}, []);

useEffect(() => {
    console.log(updateDonation);
  }, [updateDonation]);

 //Function to Fetch Self-Delivery Donations
const fetchSelfDeliveryDonations = async () =>{
  
    //Fetch Delivery Requests
    const response = await axios.get("http://localhost:4000/donor/self-delivery");

    console.log(response);
    //Set to State
    setSelfDeliveries(response.data);
  };

   //Function to Fetch Not Accepted Volunteer-Delivery Donations
const fetchVolunteerDeliveryDonations = async () =>{
  
    //Fetch Delivery Requests
    const response = await axios.get("http://localhost:4000/donor/volunteer-delivery");
    console.log(response);
    //Set to State
    setNonAcceptedVolunteerDeliveries(response.data);
  };

   //Function to Fetch Not Accepted Volunteer-Delivery Donations
const fetchAcceptedVolunteerDeliveryDonations = async () =>{
  
    //Fetch Delivery Requests
const response = await axios.get("http://localhost:4000/volunteer/delivery-jobs");
console.log(response);
    //Set to State
    setAcceptedVolunteerDeliveries(response.data);
  };


const toggleDeclineDelivery = async (delivery) => {

    const deleteId = delivery._id;

    //Delete Related Delivery Record
    const deleteResponse = await axios.delete(`http://localhost:4000/donor/${deleteId}`);
    console.log(deleteResponse);

    if (deleteResponse){

        const repostRequest = {
            orgId:delivery.orgId,
            orgName:delivery.orgName,
            requestTitle:delivery.requestTitle,
            population:delivery.population,
            dueDate:delivery.dueDate,
            orgOtherDetails:delivery.orgOtherDetails,
            orgLocation:delivery.orgLocation,
            orgTelephone:delivery.orgTelephone
           
    }
  
    //Send the create request
    const response = await axios.post("http://localhost:4000/org",repostRequest);
    console.log(response); 


     //Update the Donation Lists

     if (response) {

        console.log(response);
        alert("Donation Deleted");
        fetchSelfDeliveryDonations();
        fetchVolunteerDeliveryDonations();
     }
     
  
      }
    
   


}

const toggleDeclineVolunteerDelivery = async (delivery) => {

    const deleteId = delivery._id;

    //Delete Related Delivery Record
    const deleteResponse = await axios.delete(`http://localhost:4000/volunteer/delivery-jobs/${deleteId}`);
    console.log(deleteResponse);

    if (deleteResponse){

        const repostRequest = {
            orgId:delivery.orgId,
            orgName:delivery.orgName,
            requestTitle:delivery.requestTitle,
            population:delivery.population,
            dueDate:delivery.dueDate,
            orgOtherDetails:delivery.orgOtherDetails,
            orgLocation:delivery.orgLocation,
            orgTelephone:delivery.orgTelephone
           
    }
  
    //Send the create donation request
    const response = await axios.post("http://localhost:4000/org",repostRequest);
    console.log(response); 


     //Update the Donation Lists

     if (response) {
        console.log(response);
        alert("Donation Deleted");
        fetchAcceptedVolunteerDeliveryDonations();
     }
     
  
      }
    
   


}

//Toggle Edit Delivery
const toggleUpdateDelivery = (donation) =>{

    setUpdateDonation({
      _id:donation._id,
      orgId:donation.orgId,
      orgName:donation.orgName,
      requestTitle:donation.requestTitle,
      population:donation.population,
      dueDate:donation.dueDate,
      orgOtherDetails:donation.orgOtherDetails,
      orgLocation:donation.orgLocation,
      orgTelephone:donation.orgTelephone,
      donorId:donation.donorId,
      donorName:donation.donorName,
      donationSize:donation.donationSize,
      deliveryMethod:donation.deliveryMethod,
      donorTelephone:donation.donorTelephone,
      donorOtherDetails:donation.donorOtherDetails,
      donorLocation:donation.donorLocation
    })
  };

//Handle Update Field Change
const handleUpdateFieldChange = (e) =>{
    const {value,name} = e.target
  
    setUpdateDonation({
      ...updateDonation,
      [name]:value,
    })
    console.log(updateDonation);
  
  };

// Update Delivery
const updateDonationRecord = async (e) => {
    e.preventDefault();
  
    const donationUpdateDetails = {
      orgId:updateDonation.orgId,
      orgName:updateDonation.orgName,
      requestTitle:updateDonation.requestTitle,
      population:updateDonation.population,
      dueDate:updateDonation.dueDate,
      orgOtherDetails:updateDonation.orgOtherDetails,
      orgLocation:updateDonation.orgLocation,
      orgTelephone:updateDonation.orgTelephone,
      donorId:updateDonation.donorId,
      donorName:updateDonation.donorName,
      donationSize:updateDonation.donationSize,
      deliveryMethod:updateDonation.deliveryMethod,
      donorTelephone:updateDonation.donorTelephone,
      donorOtherDetails:updateDonation.donorOtherDetails,
      donorLocation:updateDonation.donorLocation};
  
      //Send the update request
      const response = await axios.patch(`http://localhost:4000/donor/${updateDonation._id}`,donationUpdateDetails)
      console.log(response);
  
      //Update the Delivery Jobs List

      if(response){
        console.log(response);
        alert("Donation Details Updated")
        fetchSelfDeliveryDonations();
        fetchVolunteerDeliveryDonations();
  
      //Update the updateDelivery State
      setUpdateDonation({
        _id:null,
        orgId:"",
        orgName:"",
        requestTitle:"",
        population:"",
        dueDate:"",
        orgOtherDetails:"",
        orgLocation:"",
        orgTelephone:"",
        donorId:"",
        donorName:"",
        donationSize:"",
        deliveryMethod:"",
        donorTelephone:"",
        donorOtherDetails:"",
        donorLocation:""
      });
    }
  };


return (
<div>
    <h2 id="page-title">Donation Management</h2>    
    <div className="home home-margin">
        
        <div className="workouts">
            <h3>Self-Delivery Donations</h3>
            {selfDeliveries && selfDeliveries.map(selfDelivery => (
            <div className="workout-details" key={selfDelivery._id}>
                <h4>{selfDelivery.requestTitle}</h4>
                <p><strong>Organization Name : </strong>{selfDelivery.orgName}</p>
                <p><strong>Population : </strong>{selfDelivery.population}</p>
                <p><strong>Due Date : </strong>{selfDelivery.dueDate}</p>
                <p><strong>Location : </strong>{selfDelivery.orgLocation}</p>
                <p><strong>Organization Contact No. : </strong>{selfDelivery.orgTelephone}</p>
                <p><strong>Extra Details : </strong>{selfDelivery.orgOtherDetails}</p>
                <hr/>
                <p><strong>Donor Name : </strong>{selfDelivery.donorName}</p>
                <p><strong>Donation Size : </strong>{selfDelivery.donationSize}</p>
                <p><strong>Your Contact No. : </strong>{selfDelivery.donorTelephone}</p>
                <p><strong>Donation Details : </strong>{selfDelivery.donorOtherDetails}</p>
                <p><strong>Donor Location : </strong>{selfDelivery.donorLocation}</p>
                <span>
                    <div><button onClick={() =>toggleDeclineDelivery(selfDelivery)}>Delete Donation</button></div>
                    <div><button onClick={() =>toggleUpdateDelivery(selfDelivery)}>Edit</button></div>
                </span>
            </div>
            ))}
        

            <h3>Unaccepted Volunter Deliveries</h3>
            {nonAcceptedVolunteerDeliveries && nonAcceptedVolunteerDeliveries.map(nonAcceptedVolunteerDelivery => (
            <div className="workout-details ongoing-donation" key={nonAcceptedVolunteerDelivery._id}>
                <h4>{nonAcceptedVolunteerDelivery.requestTitle}</h4>
                <p><strong>Organization Name : </strong>{nonAcceptedVolunteerDelivery.orgName}</p>
                <p><strong>Population : </strong>{nonAcceptedVolunteerDelivery.population}</p>
                <p><strong>Due Date : </strong>{nonAcceptedVolunteerDelivery.dueDate}</p>
                <p><strong>Location : </strong>{nonAcceptedVolunteerDelivery.orgLocation}</p>
                <p><strong>Organization Contact No. : </strong>{nonAcceptedVolunteerDelivery.orgTelephone}</p>
                <p><strong>Extra Details : </strong>{nonAcceptedVolunteerDelivery.orgOtherDetails}</p>
                <hr/>
                <p><strong>Donor Name : </strong>{nonAcceptedVolunteerDelivery.donorName}</p>
                <p><strong>Donation Size : </strong>{nonAcceptedVolunteerDelivery.donationSize}</p>
                <p><strong>Your Contact No. : </strong>{nonAcceptedVolunteerDelivery.donorTelephone}</p>
                <p><strong>Donation Details : </strong>{nonAcceptedVolunteerDelivery.donorOtherDetails}</p>
                <p><strong>Donor Location : </strong>{nonAcceptedVolunteerDelivery.donorLocation}</p>
                <span>
                    <div><button onClick={() =>toggleDeclineDelivery(nonAcceptedVolunteerDelivery)}>Delete Donation</button></div>
                    <div><button onClick={() =>toggleUpdateDelivery(nonAcceptedVolunteerDelivery)}>Edit</button></div>
                </span>
            </div>
            ))}

            <h3>Accepted Volunteer Deliveries</h3>
            {acceptedVolunteerDeliveries && acceptedVolunteerDeliveries.map(acceptedVolunteerDelivery => (
            <div className="workout-details ongoing-delivery" key={acceptedVolunteerDelivery._id}>
            <h4>{acceptedVolunteerDelivery.requestTitle}</h4>
                <p><strong>Organization Name : </strong>{acceptedVolunteerDelivery.orgName}</p>
                <p><strong>Population : </strong>{acceptedVolunteerDelivery.population}</p>
                <p><strong>Due Date : </strong>{acceptedVolunteerDelivery.dueDate}</p>
                <p><strong>Location : </strong>{acceptedVolunteerDelivery.orgLocation}</p>
                <p><strong>Organization Contact No. : </strong>{acceptedVolunteerDelivery.orgTelephone}</p>
                <p><strong>Request Extra Details : </strong>{acceptedVolunteerDelivery.orgOtherDetails}</p>
                <hr/>
                <p><strong>Donor Name : </strong>{acceptedVolunteerDelivery.donorName}</p>
                <p><strong>Donation Size : </strong>{acceptedVolunteerDelivery.donationSize}</p>
                <p><strong>Your Contact No. : </strong>{acceptedVolunteerDelivery.donorTelephone}</p>
                <p><strong>Donation Details : </strong>{acceptedVolunteerDelivery.donorOtherDetails}</p>
                <p><strong>Donor Location : </strong>{acceptedVolunteerDelivery.donorLocation}</p>
                <span>
                    <div><button onClick={() =>toggleDeclineVolunteerDelivery(acceptedVolunteerDelivery)} >Delete Donation</button></div>
                    
                </span>
            </div>
            ))}
        </div>

        <div>
            <form className="create" onSubmit={updateDonationRecord}> 
                <h3>Update a Donation</h3>
                <h4>Request Title : {updateDonation.requestTitle}</h4>

                <label>Donor Name</label>
                <input 
                type="text"
                name="donorName" 
                onChange={handleUpdateFieldChange}
                value={updateDonation.donorName}
                required
                />

                <div className="select-div">
                <label className="select-label" htmlFor="donation-size">Delivery Size</label>
                    <select 
                        className="select-group"
                        id="donation-size"
                        name="donationSize"
                        onChange={handleUpdateFieldChange}
                        value={updateDonation.donationSize}
                        required
                        >
                        <option value="">Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                <div className="select-div">
                <label className="select-label" htmlFor="delivery-method">Delivery Method</label>
                    <select 
                        className="select-group" 
                        id="delivery-method"
                        name="deliveryMethod"
                        onChange={handleUpdateFieldChange}
                        value={updateDonation.deliveryMethod}
                        required
                        >
                        <option value="">Method</option>
                        <option value="self-delivery">Self-Delivery</option>
                        <option value="volunteer-delivery">Volunteer-Delivery</option>
                    </select>
                </div>
        
                <label>Telephone</label>
                <input 
                type="number"  
                name="donorTelephone"
                onChange={handleUpdateFieldChange}
                value={updateDonation.donorTelephone}
                required
                />

                <div>
                <label>Other Details</label>
                <textarea 
                className="form-text-area"
                type="text"
                name="donorOtherDetails"
                onChange={handleUpdateFieldChange}
                value={updateDonation.donorOtherDetails}
                required
                />
                </div>

                <label>Donor Location</label>
                <input
                type="text"
                name="donorLocation"
                onChange={handleUpdateFieldChange}
                value={updateDonation.donorLocation}
                required
                />

                <button>Update Donation</button>
            </form>
        </div>
    </div>
</div>

);
}

export default DonorMgmtPage;