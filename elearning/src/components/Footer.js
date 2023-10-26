import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-title">Contact Us</div>
      <hr className="divider" />
      <div className="footer-item">
        <FontAwesomeIcon icon={faEnvelope} /> Email: example@example.com
      </div>
      <div className="footer-item">
        <FontAwesomeIcon icon={faPhone} /> Phone: 1234567890
      </div>
      <div className="footer-item">
        <FontAwesomeIcon icon={faMapMarkerAlt} /> Place: Location
      </div>
      <div className="footer-copyright">
        &copy; 2000-2023 All Rights Reserved. Unauthorized reproduction of
        content is prohibited.
      </div>
    </div>
  );
}

export default Footer;
