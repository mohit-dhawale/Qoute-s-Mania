import React, { useState } from 'react'
import '../css/login.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../services/axiosapis';
import { log } from '../services/logger';

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
const navigate = useNavigate();
  const toRegister =()=>{
    navigate('/register')
}

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;


  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async()=> {
    if (!email.match(emailPattern)) {
      toast.error("Please enter a valid email address.");
    }
    else if (!password.match(passwordPattern)) {
      toast.error("Password is Empty OR must meet the required criteria.");
    }else{
      const response = await loginApi(email,password);
      if(response.data['status']=='error'){
        toast.error('Invalid User Credentails')
      }else{
        log(response.data)
        log(response.data['data']['first_name'])
        toast.success(`Login Successfull, Welcome ${response.data['data']['first_name']+" "+ response.data['data']['last_name']}`)
        sessionStorage.setItem('token',response.data['data']['token'])
        sessionStorage.setItem('id',response.data['data']['id'])
        sessionStorage.setItem('first_name',response.data['data']['first_name'])
        sessionStorage.setItem('last_name',response.data['data']['last_name'])
        navigate('/home')
      }
    }
  };

  return (
    <>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">
                <div class="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: '185px'}} alt="logo"/>
                  <h4 class="mt-1 mb-5 pb-1">We are The Quote's Mania</h4>
                </div>

                <form>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example11" name='Enter Email'onChange={handleEmailChange} class="form-control"
                      placeholder="Phone number or email address" />
                    <label class="form-label" for="form2Example11">Username</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example22" name='password'onChange={handlePasswordChange}  class="form-control" placeholder='Enter Password    (For Example: Example@123)'/>
                    <label class="form-label" for="form2Example22">Password</label>
                  </div>

                  <div class="text-center pt-1 mb-1 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-background mb-3" type="button" style={{width:'100%', fontSize:20,fontWeight:700}} onClick={handleSubmit}>Log
                      in</button><br/>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button type="button" class="btn btn-outline-success" onClick={toRegister}>Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-background ">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">We are more than just a company</h4>
                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

export default Login;