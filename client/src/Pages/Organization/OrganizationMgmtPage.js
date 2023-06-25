import { useEffect, useState } from 'react';
import axios from "axios";

function OrganizationMgmt () {



    // #1 - create foodAidRequests state
    // #2 - create ongoingDonations state
    // #3 - create ongoingDeliveries state

//States to store Data
const [foodAidRequests,setFoodAidRequests] = useState(null);
const [ongoingDonations,setOngiongDonations] = useState(null);
const [ongoingDeliveries,setOngiongDeliveries] = useState(null);
const [updateFoodAidRequests,setUpdateFoodAidRequests] = useState (
  {
    _id:null,
    orgId:"",
    orgName:"",
    requestTitle:"",
    population:"",
    dueDate:"",
    orgOtherDetails:"",
    orgLocation:"",
    orgTelephone:""
  }
)


//useEffects
  //Get all Food Aid Request
useEffect(() => {
  fetchFoodAidRequests();
}, []);

  //Get all Ongoing Donations
  useEffect(() => {
    fetchOngoingDonations();
  }, []);

    //Get all Ongoing Deliveries
useEffect(() => {
  fetchOngoingDeliveries();
}, []);

useEffect(() => {
  console.log(updateFoodAidRequests);
}, [updateFoodAidRequests]);

//Function to fetch Food Aid Requests

const fetchFoodAidRequests = async () => {

  //Fetch Food Aid Requests
  const response = await axios.get("http://localhost:4000/org");

  //Set to State
  setFoodAidRequests(response.data);

};

//Function to fetch Ongoing Donations (Self-Delivery)

const fetchOngoingDonations = async () => {

  //Fetch Ongoing Donations
  const response = await axios.get("http://localhost:4000/donor");

  setOngiongDonations(response.data);

}

//Function to fetch Ongoing Deliveries

const fetchOngoingDeliveries = async () => {

  //Fetch Ongoing Donations
  const response = await axios.get("http://localhost:4000/volunteer/delivery-jobs");

  setOngiongDeliveries(response.data);

}

//Delete Food Aid Request Function

const deleteRequest = async (_id) =>{

//Delete the Food Aid Request
const response = await axios.delete(`http://localhost:4000/org/${_id}`)

if (response) {

  console.log(response);
  alert("Food Aid Request Successfully Deleted");
  fetchFoodAidRequests();

}

}


//Delete Ongoing Self Delivery Function
const deleteSelfDelivery = async (_id) =>{

  const response = await axios.delete(`http://localhost:4000/donor/${_id}`)

if (response) {
  console.log(response);
  alert("Donation Successfully Deleted");
  fetchOngoingDonations();

}

}

//Delete Ongoing Volunteer Delivery Function 
const deleteVolunteerDelivery = async (_id) =>{

  const response = await axios.delete(`http://localhost:4000/volunteer/delivery-jobs/${_id}`)

if (response) {
  console.log(response)
  alert("Donation Successfully Deleted");
  fetchOngoingDeliveries();

}

}


//Confirm Delivery of Ongoing Self Delivery  - Function
const confirmSelfDonation = async (ongoingDonation) =>{

  const completedDonation = {

    orgId:ongoingDonation.orgId,
    orgName:ongoingDonation.orgName,
    requestTitle:ongoingDonation.requestTitle,
    population:ongoingDonation.population,
    dueDate:ongoingDonation.dueDate,
    orgOtherDetails:ongoingDonation.orgOtherDetails,
    orgLocation:ongoingDonation.orgLocation,
    orgTelephone:ongoingDonation.orgTelephone,
    donorId:ongoingDonation.donorId,
    donorName:ongoingDonation.donorName,
    donationSize:ongoingDonation.donationSize,
    deliveryMethod:ongoingDonation.deliveryMethod,
    donorTelephone:ongoingDonation.donorTelephone,
    donorOtherDetails:ongoingDonation.donorOtherDetails,
    donorLocation:ongoingDonation.donorLocation
  }

// Post the donation to Completed Donation Collection
const postResponse = await axios.post("http://localhost:4000/donors/completed",completedDonation);
console.log(postResponse);


//  Check if Post Successful

//  If Post Successful - Delete Ongoing Self Delivery Record
if (postResponse){

  const deleteResponse = await axios.delete(`http://localhost:4000/donor/${ongoingDonation._id}`);
  console.log(deleteResponse);

  // If delete Successful  
  // Rerun FetchOngoingDonations function
  if(deleteResponse){

    alert("Donation Successfully Completed");
    fetchOngoingDonations();
  }

}

 
  
}


//Confirm Delivery of Ongoing Volunteer Delivery  - Function
const confirmVolunteerDonation = async (ongoingDelivery) =>{

  const completedDonation = {

    orgId:ongoingDelivery.orgId,
    orgName:ongoingDelivery.orgName,
    requestTitle:ongoingDelivery.requestTitle,
    population:ongoingDelivery.population,
    dueDate:ongoingDelivery.dueDate,
    orgOtherDetails:ongoingDelivery.orgOtherDetails,
    orgLocation:ongoingDelivery.orgLocation,
    orgTelephone:ongoingDelivery.orgTelephone,
    donorId:ongoingDelivery.donorId,
    donorName:ongoingDelivery.donorName,
    donationSize:ongoingDelivery.donationSize,
    deliveryMethod:ongoingDelivery.deliveryMethod,
    donorTelephone:ongoingDelivery.donorTelephone,
    donorOtherDetails:ongoingDelivery.donorOtherDetails,
    donorLocation:ongoingDelivery.donorLocation,
    volunteerId:ongoingDelivery.volunteerId,
    volunteerName:ongoingDelivery.volunteerName,
    NIC:ongoingDelivery.NIC,
    vehicleNo:ongoingDelivery.vehicleNo,
    volunteerTelephoneNo:ongoingDelivery.volunteerTelephoneNo
  }

  // Post the donation to Completed Donation Collection
const postResponse = await axios.post("http://localhost:4000/donors/completed",completedDonation);
console.log(postResponse);


//  Check if Post Successful

//  If Post Successful - Delete Ongoing Self Delivery Record
if (postResponse){

  const deleteResponse = await axios.delete(`http://localhost:4000/volunteer/delivery-jobs/${ongoingDelivery._id}`);
  console.log(deleteResponse);

  // If delete Successful  
  // Rerun FetchOngoingDonations function
  if(deleteResponse){

    alert("Donation Successfully Completed");
    fetchOngoingDeliveries();
  }

}

}





//Update Food Aid Request

//#1 - get the Food Aid Request Details to a State
//#2 - Handle Update Field Change
//#3 - create submit function


const toggleUpdateRequest = (foodAidRequest) => {

  console.log(foodAidRequest)

  setUpdateFoodAidRequests({
    _id:foodAidRequest._id,
    orgId:foodAidRequest.orgId,
    orgName:foodAidRequest.orgName,
    requestTitle:foodAidRequest.requestTitle,
    population:foodAidRequest.population,
    dueDate:foodAidRequest.dueDate,
    orgOtherDetails:foodAidRequest.orgOtherDetails,
    orgLocation:foodAidRequest.orgLocation,
    orgTelephone:foodAidRequest.orgTelephone

  })
};


//Handle Update Field Change
const handleUpdateFieldChange = (e) =>{
  const {value,name} = e.target

  setUpdateFoodAidRequests({
    ...updateFoodAidRequests,
    [name]:value,
  })
  console.log(updateFoodAidRequests);

};

// Update Food Aid Request

const updateFoodAidRequest = async (e) => {

  e.preventDefault();

  const foodAidRequestDetails ={

    orgId:updateFoodAidRequests.orgId,
    orgName:updateFoodAidRequests.orgName,
    requestTitle:updateFoodAidRequests.requestTitle,
    population:updateFoodAidRequests.population,
    dueDate:updateFoodAidRequests.dueDate,
    orgOtherDetails:updateFoodAidRequests.orgOtherDetails,
    orgLocation:updateFoodAidRequests.orgLocation,
    orgTelephone:updateFoodAidRequests.orgTelephone
  }

  //Send the update request
    const response = await axios.patch(`http://localhost:4000/org/${updateFoodAidRequests._id}`,foodAidRequestDetails)
    console.log(response);

    //Update the Delivery Jobs List

    if (response){

      fetchFoodAidRequests();

      //Update the updateDelivery State
      setUpdateFoodAidRequests({
        _id:null,
        orgId:"",
        orgName:"",
        requestTitle:"",
        population:"",
        dueDate:"",
        orgOtherDetails:"",
        orgLocation:"",
        orgTelephone:""
      });
    }
   


}


   
return(

    <div>
        <h2 id="page-title">Food Aid Request Management</h2>
<div className="home home-margin">
  <div className="workouts">
    <h3>Ongoing Food Aid Requests</h3>
    {foodAidRequests && foodAidRequests.map(foodAidRequest => (
    <div className="workout-details" key={foodAidRequest._id}>
      <h4>{foodAidRequest.requestTitle}</h4>
      <p><strong>Population : </strong>{foodAidRequest.population}</p>
      <p><strong>Due Date : </strong>{foodAidRequest.dueDate}</p>
      <p><strong>Other Details : </strong>{foodAidRequest.orgOtherDetails}</p>
      <p><strong>Location : </strong>{foodAidRequest.orgLocation}</p>
      <p><strong>Due Date : </strong>{foodAidRequest.orgTelephone}</p>
      <span>
        <div><button onClick={() => deleteRequest(foodAidRequest._id)} >Delete Request</button></div>
        <div><button onClick={() => toggleUpdateRequest(foodAidRequest)}>Edit</button></div>
      </span>
    </div>
    ))}
    <h3>Ongoing Donations</h3>
    {ongoingDonations && ongoingDonations.map(ongoingDonation => (
    <div className="workout-details ongoing-donation" key={ongoingDonation._id}>
      <h4>{ongoingDonation.requestTitle}</h4>
      <p><strong>Population : </strong>{ongoingDonation.population}</p>
      <p><strong>Due Date : </strong>{ongoingDonation.dueDate}</p>
      <p><strong>Donor Name : </strong>{ongoingDonation.donorName}</p>
      <p><strong>Donor Telephone : </strong>{ongoingDonation.donorTelephone}</p>
      <p><strong>Donor Location : </strong>{ongoingDonation.donorLocation}</p>
      <p><strong>Extra Details : </strong>{ongoingDonation.donorOtherDetails}</p>
      <span>
        <div><button onClick={() =>deleteSelfDelivery(ongoingDonation._id)}>Delete Donation</button></div>
        <div><button onClick={() =>confirmSelfDonation(ongoingDonation)}>Confirm Delivery</button></div>
      </span>
    </div>
    ))}

    <h3>Ongoing Deliveries</h3>

    {ongoingDeliveries && ongoingDeliveries.map(ongoingDelivery => (
    <div className="workout-details ongoing-delivery" key={ongoingDelivery._id}>
      <h4>{ongoingDelivery.requestTitle}</h4>
      <p><strong>Population : </strong>{ongoingDelivery.population}</p>
      <p><strong>Due Date : </strong>{ongoingDelivery.dueDate}</p>
      <p><strong>Donor : </strong>{ongoingDelivery.donorName}</p>
      <p><strong>Donor Telephone : </strong>{ongoingDelivery.donorTelephone}</p>
      <p><strong>Donor Location : </strong>{ongoingDelivery.donorLocation}</p>
      <p><strong>Extra Details : </strong>{ongoingDelivery.donorOtherDetails}</p>
      <p><strong>Deliverer : </strong>{ongoingDelivery.volunteerName}</p>
      <p><strong>Deliverer Telephone : </strong>{ongoingDelivery.volunteerTelephoneNo}</p>
      <span>
        <div><button onClick={()=>deleteVolunteerDelivery(ongoingDelivery._id)}>Delete Donation</button></div>
        <div><button onClick={() =>confirmVolunteerDonation(ongoingDelivery)}>Confirm Delivery</button></div>
      </span>
    </div>
    ))}
  </div>  


  <div>
    <form className="create" onSubmit={updateFoodAidRequest} > 
    <h3>Update Food Aid Request</h3>
    <h4>Request Title : </h4>

    <label>Request Title</label>
    <input 
      type="text" 
      name="requestTitle"
      onChange={handleUpdateFieldChange}
      value={updateFoodAidRequests.requestTitle}
      required
    />

    <label>Population</label>
    <input 
      type="text"
      name="population"
      onChange={handleUpdateFieldChange}
      value={updateFoodAidRequests.population}
      required
    />

    <label>Telephone No.</label>
    <input 
      type="number"
      name="orgTelephone" 
      onChange={handleUpdateFieldChange}
      value={updateFoodAidRequests.orgTelephone}
      required  
    />

    <label>Due Date</label>
    <input 
      type="date"
      name="dueDate"
      onChange={handleUpdateFieldChange}
      value={updateFoodAidRequests.dueDate}
      required
    />

    <div>
      <label>Other Details</label>
      <textarea 
      className="form-text-area"
      type =  "text"
      name="orgOtherDetails"
      onChange={handleUpdateFieldChange}
      value={updateFoodAidRequests.orgOtherDetails}
      required
      />
    </div>

    <label>Location</label>
    <input 
    type="text"
    name="orgLocation"
    onChange={handleUpdateFieldChange}
    value={updateFoodAidRequests.orgLocation}
    required
    />

    <button>Update Food Aid Request</button>
  </form>
  </div>
</div>
    </div>
   
);

}
export default OrganizationMgmt;