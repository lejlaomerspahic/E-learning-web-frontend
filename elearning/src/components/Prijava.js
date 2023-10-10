import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Prijava.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { variable } from "../variable";
function Prijava() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    let hasError = false;

    setEmailError("");
    setPasswordError("");

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

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(`${variable}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        navigate("/home");
      } else {
        console.error("Error during registration:", response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  style={{
                    background: "#035dbd",
                  }}
                  class="btn btn-primary btn-floating mx-1"
                >
                  <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                </button>

                <button
                  style={{
                    background: "#035dbd",
                  }}
                  type="button"
                  class="btn btn-primary btn-floating mx-1"
                >
                  <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                </button>

                <button
                  style={{
                    background: "#035dbd",
                  }}
                  type="button"
                  class="btn btn-primary btn-floating mx-1"
                >
                  <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                </button>
              </div>

              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-4 mb-0">Or</p>
              </div>

              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  onChange={(email) => setEmail(email.target.value)}
                />
              </div>
              {emailError ? (
                <p
                  style={{
                    color: "#0d9eff",
                    marginBottom: 3,
                    marginTop: -15,
                    marginLeft: 3,
                  }}
                >
                  {emailError}
                </p>
              ) : null}
              <div class="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  class="form-control form-control-lg"
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
              <div class="d-flex justify-content-between align-items-center">
                <div class="form-check mb-0">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value={rememberMe}
                    onChange={() => setRememberMe(true)}
                    id="form2Example3"
                  />
                  <label class="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  style={{ textDecoration: "none" }}
                  class="text-body"
                >
                  Forgot password?
                </a>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  class="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    background: "#035dbd",
                    fontWeight: "Bold",
                  }}
                  onClick={() => handleLogin()}
                >
                  SIGN IN
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/registracija"
                    style={{ textDecoration: "none" }}
                    class="link-danger"
                  >
                    Register
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

export default Prijava;
