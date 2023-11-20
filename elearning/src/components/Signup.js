import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { variable } from "../variable";

import { useUser } from "../hook/useUser";
function Signup() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [agreeTermsError, setAgreeTermsError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleRegistration = async () => {
    let hasError = false;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setLocationError("");
    setPasswordRepeatError("");
    setAgreeTermsError("");
    if (!username) {
      setNameError("Name is a required field.");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is a required field.");
      hasError = true;
    } else if (
      !email.includes("@") ||
      (!email.endsWith(".com") && !email.endsWith(".ba"))
    ) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is a required field.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      hasError = true;
    }

    if (!passwordRepeat) {
      setPasswordRepeatError("Repeat password is a required field.");
      hasError = true;
    } else if (passwordRepeat !== password) {
      setPasswordRepeatError(
        "The passwords do not match. Please re-enter the password."
      );
      hasError = true;
    }

    if (!location) {
      setLocationError("Location is a required field.");
      hasError = true;
    }

    if (!agreeTerms) {
      setAgreeTermsError("You must agree to the terms and conditions.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(`${variable}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          location,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate("/user/signin");
      }
    } catch (error) {}
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div
                style={{ border: "none" }}
                className="divider d-flex align-items-center my-4"
              >
                <p
                  className="text-center fw-bold mx-3 mb-0"
                  style={{ fontSize: "26px" }}
                >
                  Sign up
                </p>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="text"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  onChange={(username) => setUsername(username.target.value)}
                />
              </div>
              {nameError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -15,
                    marginLeft: 3,
                  }}
                >
                  {nameError}
                </p>
              ) : null}

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  onChange={(email) => setEmail(email.target.value)}
                />
              </div>
              {emailError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -20,
                    marginLeft: 3,
                  }}
                >
                  {emailError}
                </p>
              ) : null}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  onChange={(password) => setPassword(password.target.value)}
                />
              </div>
              {passwordError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -15,
                    marginLeft: 3,
                  }}
                >
                  {passwordError}
                </p>
              ) : null}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Repeat password"
                  onChange={(passwordRepeat) =>
                    setPasswordRepeat(passwordRepeat.target.value)
                  }
                />
              </div>
              {passwordRepeatError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -15,
                    marginLeft: 3,
                  }}
                >
                  {passwordRepeatError}
                </p>
              ) : null}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Location"
                  onChange={(location) => setLocation(location.target.value)}
                />
              </div>
              {locationError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -15,
                    marginLeft: 3,
                  }}
                >
                  {locationError}
                </p>
              ) : null}
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ marginTop: "20px" }}
              >
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(true)}
                  />
                  <p className="small  mt-1">
                    I agree to the{" "}
                    <Link
                      to="/prijava"
                      href="#!"
                      style={{ textDecoration: "none" }}
                      className="link-danger"
                    >
                      terms & conditions
                    </Link>
                  </p>
                </div>
              </div>
              {agreeTermsError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -15,
                    marginLeft: 3,
                  }}
                >
                  {agreeTermsError}
                </p>
              ) : null}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    background: "#035dbd",
                    fontWeight: "Bold",
                  }}
                  onClick={handleRegistration}
                >
                  SIGN UP
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  You already have an account?{" "}
                  <Link
                    to="/user/signin"
                    href="#!"
                    style={{ textDecoration: "none" }}
                    className="link-danger"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
