import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { registerApi } from '../services/axiosapis';
import { useNavigate } from 'react-router';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile,setMobile]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [dob,setDob]= useState('')
  const navigate = useNavigate()
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const dobPattern = /^(\d{2}) (\d{2}) (\d{4})$/;
  const mobileNumberPattern = /^\d{10}$/;



  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleDOBChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit=async()=>{
    if(firstName.length===''){
      toast.error("Enter First Name")
    }else if(lastName.length===''){
      toast.error("Enter Last Name")
    }else if(!email.match(emailPattern)){
      toast.error("Please enter a valid email address.");
    }else if(!mobile.match(mobileNumberPattern)){
      toast.error("Mobile Number must be 10 digit")
    }else if(!dob.match(dobPattern)){
      toast.error("Enter DOB in proper Format")
    }else if(!password.match(passwordPattern)){
      toast.error("Password is Empty OR must meet the required criteria.")
    }else if(!confirmPassword.match(passwordPattern)){
      toast.error("Password is Empty OR must meet the required criteria.")
    }else if(password !== confirmPassword){
      toast.error("Password Doesn't match")
    }else{
      const response = await registerApi(firstName,lastName,email,password,mobile,dob)
      console.log(response)
      if(response.data.status==='success'){
        toast.success("User Registerd SuccessFully")
        navigate('/')
      }else{
        toast.warning("Something went wrong")
      }
    }
  }
  const resetForm =()=>{
    setConfirmPassword('')
    setDob('')
    setEmail('')
    setFirstName('')
    setLastName('')
    setMobile('')
    setPassword('')
  }
  return (
    <>
{/* <section className="h-100 bg-dark"> */}
  <div className="container-lg">
    <div className="row d-flex justify-content-center align-items-center h-100" style={{width:'100%',height:'50%'}}>
      <div className="col">
        <div className="card card-registration my-3">
          <div className="row g-0">
            <div className="col-xl-5 d-none d-xl-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="loading error" className="img-fluid"
                style={{'border-top-left-radius': '.25rem', 'border-bottom-left-radius': '.25rem'}}/>
            </div>
            <div className="col-xl-7">
              <div className="card-body p-md-4 text-black">
                <h3 className="mb-5 text-uppercase">Quote's Mania registration form</h3>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1m" placeholder='Enter First Name' className="form-control form-control-lg" onChange={handleFirstNameChange}/>
                      <label className="form-label" for="form3Example1m">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1n" placeholder='Enter Last Name' className="form-control form-control-lg" onChange={handleLastNameChange}/>
                      <label className="form-label" for="form3Example1n">Last name</label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example8" name="email" placeholder="Enter Email" className="form-control form-control-lg" onChange={handleEmailChange}/>
                  <label className="form-label" for="form3Example8">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="number" id="form3Example8" name="mobile" placeholder="Enter Mobile No" className="form-control form-control-lg" onChange={handleMobileChange}/>
                  <label className="form-label" for="form3Example8">Mobile No</label>
                </div>

                <div className="form-outline mb-4">
                  <input type='text' id="form3Example9" className="form-control form-control-lg" placeholder='DD MM YYYY   (Space Seperated)' onChange={handleDOBChange}/>
                  <label className="form-label" for="form3Example9">DOB</label>
                </div>

                <div className="form-outline mb-3">
                  <input type="password" id="form3Example99" placeholder='Enter Password' className="form-control form-control-lg" onChange={handlePasswordChange}/>
                  <label className="form-label" for="form3Example99">Password</label>
                </div>

                <div className="form-outline mb-3">
                  <input type="password" id="form3Example97" placeholder='Enter Confirm Password' className="form-control form-control-lg" onChange={handleConfirmPasswordChange}/>
                  <label className="form-label" for="form3Example97">Confirm Password</label>
                </div>

                <div className="d-flex justify-content-end pt-0">
                  <button type="button" className="btn btn-light btn-lg" onClick={resetForm}>Reset all</button>
                  <button type="button" className="btn btn-warning btn-lg ms-2" onClick={handleSubmit}>Submit form</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/* </section> */}
  </>
  )
}

export default Register;