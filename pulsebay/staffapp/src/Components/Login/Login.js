import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true; //To maintain validation

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6 || password.length > 15) {
      setPasswordError("Password must be between 6 and 15 characters.");
      isValid = false;
    }
    // If form is valid, proceed
    if (isValid) {
      // Store data in local storage
      localStorage.setItem("user", JSON.stringify({ email, password }));
      window.location.href = "/staff"; // Navigate to Staff Management screen Directly change the URL
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className={`form-control ${emailError && "is-invalid"}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">{emailError}</div>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={`form-control ${passwordError && "is-invalid"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="invalid-feedback">{passwordError}</div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
