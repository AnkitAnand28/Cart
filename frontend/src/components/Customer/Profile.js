import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"
    
function Profile() {
    const baseUrl = "http://127.0.0.1:8000/";
    const [ProfileData, setProfileData] = useState({
      user_id:"",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      mobile: "",
    });
    const [error, setError] = useState(null);
  
    var customer_id = localStorage.getItem("customer_id");
    console.log(customer_id);
  
    useEffect(() => {
      fetchData(baseUrl + "customer/" + customer_id);
    }, []);
  
    function fetchData(baseurl) {
      axios
        .get(baseurl)
        .then((response) => {
          const data = response.data;
          console.log("data");
          console.log(data);
          setProfileData({
            user_id:data.user.id,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            username: data.user.username,
            email: data.user.email,
            mobile: data.mobile,
          });
        })
        .catch((error) => {
          
          setError("Failed to fetch profile data");
        });
    }

    const inputHandler = (event) =>{
        setProfileData({
          ...ProfileData,
          [event.target.name]:event.target.value
        })
    };

    const submitHandler = (event) =>{
        
        const formData = new FormData();
        formData.append('user',ProfileData.user_id);
        formData.append('mobile',ProfileData.mobile);
    
        axios.put(baseUrl+'customer/'+customer_id+'/',formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then(function(response){
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        });

        const formUserData = new FormData();
        formUserData.append('firstname',ProfileData.firstname);
        formUserData.append('lastname',ProfileData.lastname);
        formUserData.append('username',ProfileData.username);
        formUserData.append('email',ProfileData.email);
        axios.put(baseUrl+'user/'+ProfileData.user_id+'/',formUserData)
        .then(function(response){
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        });
    };
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <h3 className="mb-3">Welcome {ProfileData.username}</h3>
                    <div className="card">
                        <h4 className="card-header">Update Profile</h4>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="firstName" className="form-label">First Name</label>
                                    <input type="text" name="first_name" onChange={inputHandler} value={ProfileData.first_name} className="form-control" id="firstName" />
                                </div>
                                <div className="mb-3">
                                    <label for="lastName" className="form-label">Last Name</label>
                                    <input type="text" name="last_name" onChange={inputHandler} value={ProfileData.last_name} className="form-control" id="lastName" />
                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" name="username" onChange={inputHandler} value={ProfileData.username} className="form-control" id="username" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" name="email" onChange={inputHandler} value={ProfileData.email} className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label for="mobile" className="form-label">Mobile Number</label>
                                    <input type="number" name="mobile" onChange={inputHandler} value={ProfileData.mobile} className="form-control" id="email" />
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile