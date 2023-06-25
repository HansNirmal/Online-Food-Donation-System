import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const [isOrgFormVisible, setIsOrgFormVisible] = useState(false);
  const [isVolFormVisible, setIsVolFormVisible] = useState(false);
  const notify = () => toast("Register successfully!");
  const badnotify = () => toast("Register Failed!");
  const toggleOrgForm = () => {
    setIsOrgFormVisible(true);
    setIsVolFormVisible(false);
  };

  const toggleVolForm = () => {
    setIsOrgFormVisible(false);
    setIsVolFormVisible(true);
  };

  const handleOrgSubmit = async (event) => {
    event.preventDefault();
    // Handle organization form submission
    const orgName = event.target.orgName.value;
    const registrationNo = event.target.registrationNo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const adminOrgJobDetails = {
      adminOrgOrganizationName: orgName,
      adminOrgRegNo: registrationNo,
      adminOrgEmail: email,
      adminOrgRole: "ORG",
      adminOrgPassword: password,
    };
    // Save the organization data to the database
    const orgData = {
      "orgName": orgName,
      "regNo": registrationNo,
      "email": email,
      "password": password,
      "role": "ORG",
      "firstName": "",
      "lastName": ""
    }

    axios.post("http://localhost:4000/adminOrgs/accepts/", adminOrgJobDetails).then((response)=>{
      notify()
      window.location.href ='/login'

      // localStorage.setItem("user", JSON.stringify(response.data))
      // localStorage.setItem("auth", response.data.adminOrgRole)
    }).catch((err)=>{
      alert("sds")
      badnotify()
    })
    

    // Perform API call or any necessary action to save the data
    console.log('Organization data:', orgData);

    // Reset the form
    event.target.reset();
  };

  const handleVolSubmit = async (event) => {
    event.preventDefault();
    // Handle volunteer/donor form submission
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    var role = event.target.role.value

    if (role) {
      role = role.toUpperCase()
    }
    // Save the volunteer/donor data to the database
    const volData = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    const orgData = {
      "orgName": "",
      "regNo": "",
      "email": email,
      "password": password,
      "role": role,
      "firstName": firstName,
      "lastName": lastName
    }

    const response = await axios.post("http://localhost:4000/api/users/register", orgData);
    console.log(response);


    //Update the Donation Lists

    if (response) {
      window.location.href ='/login'

      notify()
      // localStorage.setItem("user", JSON.stringify(response.data))
      // localStorage.setItem("auth", response.data.role)
    } else {
      badnotify()
    }
    // Perform API call or any necessary action to save the data
    console.log('Volunteer/Donor data:', volData);

    // Reset the form
    event.target.reset();
  };

  return (
    <div>
      <ToastContainer />

      <h2 id="page-title">Sign Up</h2>
      <div className="homepage home-margin">
        <div>
          <button className="homepagebutton" onClick={toggleOrgForm}>Sign Up for Organizations</button>
          <button className="homepagebutton" onClick={toggleVolForm}>Sign Up for Volunteers and Donors</button>
        </div>
        {/* Sign Up for Organizations */}
        {isOrgFormVisible && (
          <form onSubmit={handleOrgSubmit}>
            <h3>Organization Sign Up</h3>
            <label htmlFor="orgName">Organization Name</label>
            <input type="text" id="orgName" name="orgName" required />

            <label htmlFor="registrationNo">Registration No.</label>
            <input type="text" id="registrationNo" name="registrationNo" required />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Sign Up</button>
          </form>
        )}

        {isVolFormVisible && (
          <form onSubmit={handleVolSubmit}>
            <h3>Volunteer/Donor Sign Up</h3>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <div>
              <label htmlFor="role">Role</label>
              <select id="role" name="role" required>
                <option value="volunteer">Volunteer</option>
                <option value="donor">Donor</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
