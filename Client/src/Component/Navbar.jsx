import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { userDetailsApi, userProfileUpdateApi } from "../services/axiosapis";

function NavBar() {
  const isLoggedIn = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState({first_name:"",last_name:"",dob:"",mobile:"",email:"",createdDate:""});
  const [editDisable, setEditDisable] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("last_name");
    navigate("/");
  };

  const loadUserData = async () => {
    const response = await userDetailsApi();
    if (response != null) {
      console.log(response.data);
      setUser(response.data.data.user);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(value)
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const EditProfile =()=>{
    setEditDisable(false);
  }

  const UpdateProfile=async()=>{
    setEditDisable(true)
    const response = await userProfileUpdateApi(user.first_name,user.last_name,user.dob,user.mobile);
    console.log(response.data)
    console.log(response.data.status)
    if(response.data.success==true){
      sessionStorage.setItem("first_name",user.first_name)
      sessionStorage.setItem("first_name",user.last_name)
      redirect("/home")
    }
    console.log(response)

  }
  return (
    <>
      <nav
        className={` navbar navbar-expand-lg bg-tranperant navbar-dark sticky-top${
          scrolled ? "scrolled-navbar" : ""
        }`}
        style={{ marginBottom: 5 }}
      >
        <div className="container-fluid ">
          <a className="navbar-brand" href="/home">
            Quote's Mania
          </a>
          <button
            className={`navbar-toggler white-hamburger-button}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <span className="navbar-toggler-icon my-toggler"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link
                  className="nav-link my-custom-margin"
                  aria-current="page"
                  href="##"
                  to={"/home"}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item ">
                <Link className="nav-link my-custom-margin" to={"/my-quotes"}>
                  My Quotes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link my-custom-margin" to={"/fav-quotes"}>
                  Favourites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link my-custom-margin" to={"/about"}>
                  About Us
                </Link>
              </li>
              {/* <li className="nav-item" >
                  <Link className="nav-link my-custom-margin" to={""}>
                    Contact Us
                  </Link>
                </li> */}
            </ul>
            {isLoggedIn ? (
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  style={{ maxWidth: 250, color: "whitesmoke" }}
                >
                  Welcome {sessionStorage.getItem("first_name")}{" "}
                  <AccountCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  container="body"
                  style={{
                    maxWidth: 200,
                    width: 150,
                  }}
                >
                  <Dropdown.Item
                    href="/user-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalProfile "
                    onClick={loadUserData}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
      <div
        class="modal fade"
        id="exampleModalProfile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Profile
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="">
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-xl">
                    <h1 class="text-white mb-1">User Profile</h1>
                    <div class="card" style={{ borderRadius: "15px" ,marginTop:-50}}>
                      <div class="card-body">
                        <div class="row align-items-center pt-1 pb-1">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">First Name</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="text"
                              name="first_name"
                              class="form-control form-control-lg"
                              value={user.first_name}
                              disabled={editDisable}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="row align-items-center pt-1 pb-1">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Last Name</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="text"
                              name="last_name"
                              class="form-control form-control-lg"
                              value={user.last_name}
                              disabled={editDisable}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="row align-items-center pt-1 pb-1">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Email</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="text"
                              name="email"
                              class="form-control form-control-lg"
                              value={user.email}
                              disabled
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div class="row align-items-center py-1">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Mobile No</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="mobile"
                              name="mobile"
                              class="form-control form-control-lg"
                              value={user.mobile}
                              disabled={editDisable}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div class="row align-items-center py-1">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Date of Birth</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                            <input
                              type="date"
                              class="form-control form-control-lg"
                              name ="dob"
                              value={user.dob?new Date(user.dob).toISOString().split('T')[0]:''}
                              disabled={editDisable}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div class="row align-items-center py-1">
                          <div class="col-md-3 ps-5">
                            <h6 class="mb-0">Account Creation Date</h6>
                          </div>
                          <div class="col-md-9 pe-5">
                          <input
                              type="date"
                              class="form-control form-control-lg text-center"
                              value={new Date(user.createdDate)}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {editDisable?
              <button
                type="button"
                class="btn btn-primary"
                // data-bs-dismiss="modal"
                onClick={EditProfile}
              >
                Edit Profile
              </button>
              :
              <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={UpdateProfile}>
                Save Changes
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
