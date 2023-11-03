import axios from "axios";
import { useState } from "react";

function Register(props) {
  
  const baseUrl='http://127.0.0.1:8000/';
  const [formError,setFormError]=useState(false)
  const [errorMsg,seterrorMsg]=useState('');
  const [successMsg,setsuccessMsg]=useState('');

  const [registerFormData,setRegisterFormData] = useState({
    "firstname":'',
    "lastname":'',
    "username":'',
    "email":'',
    
    "password":'',
  });

  const inputHandler = (event) =>{
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]:event.target.value
    })
  };

  const submitHandler = (event) =>{
    const formData = new FormData();
    formData.append('firstname',registerFormData.firstname);
    formData.append('lastname',registerFormData.lastname);
    formData.append('username',registerFormData.username);
    formData.append('email',registerFormData.email);
    formData.append('number',registerFormData.number);
    formData.append('password',registerFormData.password);

    axios.post(baseUrl+'customer/register/',formData)
    .then(function(response){
      if(response.data.bool==false){
        setFormError(true);
        seterrorMsg(response.data.msg)
      }else{
        setRegisterFormData({
          "firstname":'',
          "lastname":'',
          "username":'',
          "email":'',
          "number":'',
          "password":'',
        });
        setFormError(false);
        setsuccessMsg(response.data.msg);
      }
    })
    .catch(function(error){
      console.log(error);
    })
  };

  const buttonEnable=(registerFormData.firstname!='') && (registerFormData.lastname!='') && (registerFormData.username!='') && (registerFormData.email!='') && (registerFormData.password!='') && (registerFormData.mobile!='')

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form>
              <div className="mb-3">
                  <label for="firstname" className="form-label">
                    First Name
                  </label>
                  <input type="text" onChange={inputHandler} value={registerFormData.firstname} name="firstname" className="form-control" id="firstname" />
                </div>
                <div className="mb-3">
                  <label for="lastname" className="form-label">
                    Last Name
                  </label>
                  <input type="text" onChange={inputHandler} value={registerFormData.lastname} name="lastname" className="form-control" id="lastname" />
                </div>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input type="text" onChange={inputHandler} value={registerFormData.username} name="username" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input type="text" onChange={inputHandler} value={registerFormData.email} name="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label for="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <input type="number" onChange={inputHandler} value={registerFormData.mobile} name="mobile" className="form-control" id="mobile" />
                </div>
                <div className="mb-3">
                  <label for="pwd" className="form-label">
                    Password
                  </label>
                  <input type="password" onChange={inputHandler} value={registerFormData.password} name="password" className="form-control" id="pwd" />
                </div>

                <button disabled={!buttonEnable} type="button" onClick={submitHandler} className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
