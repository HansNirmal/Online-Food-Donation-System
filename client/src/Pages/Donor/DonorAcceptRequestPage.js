import { useEffect, useState } from 'react';
import axios from "axios";

function DonorAcceptRequestPage() {

    // Get all Food Aid Requests from DB and Display them
    //#1 - Create a function to fetch Delivery Requests
    //#2 - Set the DeliveryRequests into a State
    //#3 - Create a UseEffect to Update Page everytime Refreshed
    //#4 - Create the Container for Delivery Request

    // States to Store Data
    const [foodAidRequests, setfoodAidRequests] = useState(null);
    const [foodAidRequestAccept, setFoodAidRequestAccept] = useState({
        _id: null,
        orgId: "",
        orgName: "",
        requestTitle: "",
        population: "",
        dueDate: "",
        orgOtherDetails: "",
        orgLocation: "",
        orgTelephone: "",
        donorId: "",
        donorName: "",
        donationSize: "",
        deliveryMethod: "",
        donorTelephone: "",
        donorOtherDetails: "",
        donorLocation: ""
    }
    );


    //useEffect
    useEffect(() => {
        fetchFoodAidRequests();
    }, []);

    useEffect(() => {
        console.log(foodAidRequestAccept);
    }, [foodAidRequestAccept]);

    //Function to Fetch Food Aid Requests
    const fetchFoodAidRequests = async () => {

        //Fetch Delivery Requests
        const response = await axios.get("http://localhost:4000/org");

        //Set to State
        setfoodAidRequests(response.data);
    };


    const toggleAcceptRequest = (foodAidRequest) => {

        setFoodAidRequestAccept({
            _id: foodAidRequest._id,
            orgId: foodAidRequest.orgId,
            orgName: foodAidRequest.orgName,
            requestTitle: foodAidRequest.requestTitle,
            population: foodAidRequest.population,
            dueDate: foodAidRequest.dueDate,
            orgOtherDetails: foodAidRequest.orgOtherDetails,
            orgLocation: foodAidRequest.orgLocation,
            orgTelephone: foodAidRequest.orgTelephone,
            donorId: "",
            donorName: "",
            donationSize: "",
            deliveryMethod: "",
            donorTelephone: "",
            donorOtherDetails: "",
            donorLocation: ""
        })

        console.log(foodAidRequestAccept);
    }

    //Handle Update Field Change
    const handleAddFieldChange = (e) => {
        const { value, name } = e.target

        setFoodAidRequestAccept({
            ...foodAidRequestAccept,
            [name]: value,
        })
        console.log(foodAidRequestAccept);
    }

    // Create Donation Record
    const createDonation = async (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem("user"))
        let id = user._id
        let oname = user.adminOrganizationName
        //fetch donation record details
        const donationDetails = {
            orgId: foodAidRequestAccept.orgId,
            orgName: foodAidRequestAccept.orgName,
            requestTitle: foodAidRequestAccept.requestTitle,
            population: foodAidRequestAccept.population,
            dueDate: foodAidRequestAccept.dueDate,
            orgOtherDetails: foodAidRequestAccept.orgOtherDetails,
            orgLocation: foodAidRequestAccept.orgLocation,
            orgTelephone: foodAidRequestAccept.orgTelephone,
            donorId: id,
            donorName: foodAidRequestAccept.donorName,
            donationSize: foodAidRequestAccept.donationSize,
            deliveryMethod: foodAidRequestAccept.deliveryMethod,
            donorTelephone: foodAidRequestAccept.donorTelephone,
            donorOtherDetails: foodAidRequestAccept.donorOtherDetails,
            donorLocation: foodAidRequestAccept.donorLocation

        };

        //Send the create donation request
        try {
            const response = await axios.post("http://localhost:4000/donor", donationDetails);
            console.log(response);
            if (response) {

                //Delete Related Donor Record
                const deleteResponse = await axios.delete(`http://localhost:4000/org/${foodAidRequestAccept._id}`);
                console.log(deleteResponse);
    
                if (deleteResponse) {
                    //Refresh Delivery Requests List
                    alert("Donation Created Successfully")
                    fetchFoodAidRequests();
    
                    //Clear Details From State
                    setFoodAidRequestAccept({
                        _id: null,
                        orgId: "",
                        orgName: "",
                        requestTitle: "",
                        population: "",
                        dueDate: "",
                        orgOtherDetails: "",
                        orgLocation: "",
                        orgTelephone: "",
                        donorId: "",
                        donorName: "",
                        donationSize: "",
                        deliveryMethod: "",
                        donorTelephone: "",
                        donorOtherDetails: "",
                        donorLocation: "",
                        volunteerId: "",
                        volunteerName: "",
                        NIC: "",
                        vehicleNo: "",
                        volunteerTelephoneNo: ""
                    }
                    );
    window.location.href="/"
                }
    
            }
        } catch (error) {

        }

     

    }


    return (
        <div>
            <h2 id="page-title">Food Aid Requests</h2>
            <div className="home home-margin">

                <div className="workouts">

                    <h3>Unaccepted Food Aid Requests</h3>
                    {foodAidRequests && foodAidRequests.map(foodAidRequest => (
                        <div className="workout-details" key={foodAidRequest._id}>
                            <h4>{foodAidRequest.requestTitle}</h4>
                            <p><strong>Organization Name : </strong>{foodAidRequest.orgName}</p>
                            <p><strong>Population : </strong>{foodAidRequest.population}</p>
                            <p><strong>Telephon No : </strong>{foodAidRequest.orgTelephone}</p>
                            <p><strong>Due Date : </strong>{foodAidRequest.dueDate}</p>
                            <p><strong>Location : </strong>{foodAidRequest.orgLocation}</p>
                            <p><strong>Extra Details : </strong>{foodAidRequest.orgOtherDetails}</p>
                            <span>
                                <div><button onClick={() => toggleAcceptRequest(foodAidRequest)}>Accept</button></div>
                            </span>
                        </div>
                    ))}
                </div>
                <div>
                    <form className="create" onSubmit={createDonation} >
                        <h3>Make a Donation</h3>
                        <h4>Request Title : {foodAidRequestAccept.requestTitle}</h4>

                        <label>Donor Name</label>
                        <input
                            type="text"
                            name="donorName"
                            onChange={handleAddFieldChange}
                            value={foodAidRequestAccept.donorName}
                            required
                        />

                        <div className="select-div">
                            <label className="select-label" htmlFor="donation-size">Delivery Size</label>
                            <select
                                className="select-group"
                                id="donation-size"
                                name="donationSize"
                                onChange={handleAddFieldChange}
                                value={foodAidRequestAccept.donationSize}
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
                                onChange={handleAddFieldChange}
                                value={foodAidRequestAccept.deliveryMethod}
                                required>
                                <option value="">Method</option>
                                <option value="self-delivery">Self-Delivery</option>
                                <option value="volunteer-delivery">Volunteer-Delivery</option>

                            </select>
                        </div>

                        <label>Telephone No:</label>
                        <input
                            type="number"
                            name="donorTelephone"
                            onChange={handleAddFieldChange}
                            value={foodAidRequestAccept.donorTelephone}
                            required
                        />

                        <div>
                            <label>Other Details</label>
                            <textarea className="form-text-area"
                                type="text"
                                name="donorOtherDetails"
                                onChange={handleAddFieldChange}
                                value={foodAidRequestAccept.donorOtherDetails}
                                required
                            />
                        </div>

                        <label>Donor Location</label>
                        <input
                            type="text"
                            name="donorLocation"
                            onChange={handleAddFieldChange}
                            value={foodAidRequestAccept.donorLocation}
                            required
                        />

                        <button>Donate</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default DonorAcceptRequestPage;