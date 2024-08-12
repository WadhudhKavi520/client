import React, { useState } from "react";
import "./Signin.css"

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Check email validity
    if (/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    } else if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email address is invalid",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password length
    setPasswordLengthValid(value.length >= 8);

    // Clear password error message if length is valid
    if (value.length >= 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    } else if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Retrieve user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Sign-in successful");
        // Handle successful sign-in here
      } else {
        alert("Invalid email or password");
      }
    } else if (password.length < 8) {
      alert(
        "Please ensure your password is at least 8 characters long and also valid email ID is required "
      );
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-header">
          <h1>Welcome Back</h1>
          <p>Sign in to discover beautiful handmade products!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="button-container">
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            <button type="button" className="forgot-password-button">
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;