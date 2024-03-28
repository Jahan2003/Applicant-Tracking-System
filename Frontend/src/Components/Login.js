import React, { useEffect, useState } from "react";
import "../Assets/Styles/Login.css";
import job from "../Assets/images/job.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../Features/userSlice";
import Navbar1 from "./navbar1";
import axios from "axios";
import Snackbar from "./snackbar";




function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      clearError("email");
    } else if (name === "password") {
      setPassword(value);
      clearError("password");
    }
  };

  const clearError = (fieldName) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[fieldName];
    setErrors(updatedErrors);
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const dispatch = useDispatch();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Username is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const user = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/authenticate",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        dispatch({ type: "LOGIN", payload: user });
        
        showSnackbar("Login successful!", "success");
  
        // Add a delay before navigation (to allow the Snackbar to be shown)
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Adjust the delay duration as needed (in milliseconds)
      } catch (error) {
        console.log(error);
        showSnackbar("Login failed. Please try again.", "error");
      }
    }
  };

  useEffect(() => {
    if (user != null) {
      // Handle user login state if needed
    }
  }, [user]);

  return (
    <>
      <Navbar1 />
      <div className="login"> {/* Use className instead of class */}
        <form onSubmit={handleSubmit}>
          <div id="form">
            <div id="log">
              <p id="login">Login</p>
            </div>
            <div id="Email">
              <input
                id="ei"
                type="email"
                value={email}
                name="email"
                onChange={handleInputChange}
                placeholder="Enter Email"
              />
              {errors.email && (
                <div>
                  <p className="error">{errors.email}</p> {/* Use className */}
                </div>
              )}
            </div>

            <div id="password">
              <input
                id="pi"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              {errors.password && (
                <div>
                  <p className="error">{errors.password}</p> {/* Use className */}
                </div>
              )}
            </div>
            <div>
              <button type="submit">Sign In</button>
              <div id="signup">
                <p id="stag">
                  Don't have an account?{" "}
                  <Link to="/registration" id="sa">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
        <div id="image">
          <img id="img" src={job} alt="image" />
        </div>
        <Snackbar
          open={snackbarOpen}
          message={snackbarMessage}
          type={snackbarType}
          onClose={handleCloseSnackbar}
        />
      </div>
    </>
  );
}

export default Login;
