// Create Food Aid Request

// Fill the form – update the state details
// Onsubimit – createfoodrequest function

// createFoodRequest function –
// put the state details to an object variable
// send that object in a post axios call to – orgAidRequest collection

// if response received –
// display an alert saying “Food Aid Request Created”
// Clear form field states

import { useEffect, useState } from 'react';
import axios from "axios";

//create states for form




function FoodAidRequest() {



  const [formDetails, setFormDetails] = useState({
    requestTitle: "",
    population: "",
    dueDate: "",
    orgTelephone: "",
    orgOtherDetails: "",
    orgLocation: ""
  })


  useEffect(() => {
    console.log(formDetails);
  }, [formDetails]);


  //Handle Update Field Change
  const handleAddFieldChange = (e) => {
    const { value, name } = e.target

    setFormDetails({
      ...formDetails,
      [name]: value,
    })
    console.log(formDetails);
  }


  //Create Food Aid Request (in DB)

  const createFoodAidRequest = async (e) => {

    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"))
    let id = user._id
    let oname = user.adminOrganizationName
    //create Food Aid Request Object
    const foodAidRequestDetails = {
      orgId: id,
      orgName: oname,
      requestTitle: formDetails.requestTitle,
      population: formDetails.population,
      dueDate: formDetails.dueDate,
      orgOtherDetails: formDetails.orgOtherDetails,
      orgLocation: formDetails.orgLocation,
      orgTelephone: formDetails.orgTelephone
    }
console.log(user);
    //Send the create request
    const response = await axios.post("http://localhost:4000/org", foodAidRequestDetails);

    if (response) {
      console.log(response);
      window.location.href="/ "
    }

    //Clear Details From State
    setFormDetails({

      requestTitle: "",
      population: "",
      dueDate: "",
      orgTelephone: "",
      orgOtherDetails: "",
      orgLocation: ""

    })

  }


  return (
    <div>
      <h2 id="page-title">Create A Food Aid Request</h2>

      <form className="orgform" onSubmit={createFoodAidRequest}>
        <h3>Create A Food Aid Request</h3>
        <div className="form-grid" >
          <div className="form-inputs">
            <label>Request Title</label>
            <input
              type="text"
              name="requestTitle"
              onChange={handleAddFieldChange}
              value={formDetails.requestTitle}
              required
            />
          </div>
          <div className="form-inputs">
            <label>Population</label>
            <input
              type="text"
              name="population"
              onChange={handleAddFieldChange}
              value={formDetails.population}
              required
            />
          </div>
          <div className="form-inputs">
            <label>Telephone No.</label>
            <input
              type="number"
              name="orgTelephone"
              onChange={handleAddFieldChange}
              value={formDetails.orgTelephone}
              required
            />
          </div>
          <div className="form-inputs">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleAddFieldChange}
              value={formDetails.dueDate}
              required
            />
          </div>
        </div>
        <div>
          <label>Other Details</label>
          <textarea
            className="form-text-area"
            type="text"
            name="orgOtherDetails"
            onChange={handleAddFieldChange}
            value={formDetails.orgOtherDetails}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="orgLocation"
            onChange={handleAddFieldChange}
            value={formDetails.orgLocation}
            required
          />
        </div>

        <button>Create Food Aid Request</button>
      </form>
    </div>
  );
}

export default FoodAidRequest;
