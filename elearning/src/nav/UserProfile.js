import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import "./UserProfile.css";

import Navbar from "../components/Navbar";
import { useUser } from "../hook/useUser";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { user } = useUser();
  const [name, setName] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState(user.user.password);
  const [location, setLocation] = useState(user.user.location);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="ProfileContainer">
        <div className="ProfileHeader">
          <div className="ProfileImageContainer">
            <img
              className="ProfileImage"
              alt="Profile"
              src={user.user?.picture}
            />
          </div>
        </div>
        <div className="UserInfo">
          <div className="UserInfoItem">
            <FaUser className="InfoIcon" />
            <span className="InfoLabel">Name:</span>
            {editing ? (
              <input
                style={{ borderRadius: "10px", marginLeft: "10px" }}
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            ) : (
              <span className="InfoValue">{name}</span>
            )}
          </div>
          <div className="UserInfoItem">
            <FaEnvelope className="InfoIcon" />
            <span className="InfoLabel">Email:</span>
            {editing ? (
              <input
                style={{ borderRadius: "10px", marginLeft: "10px" }}
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            ) : (
              <span className="InfoValue">{email}</span>
            )}
          </div>
          <div className="UserInfoItem">
            <FaLock className="InfoIcon" />
            <span className="InfoLabel">Password:</span>
            {editing ? (
              <input
                style={{ borderRadius: "10px", marginLeft: "10px" }}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            ) : (
              <span className="InfoValue">{password}</span>
            )}
          </div>
          <div className="UserInfoItem">
            <FaMapMarkerAlt className="InfoIcon" />
            <span className="InfoLabel">Location:</span>
            {editing ? (
              <input
                style={{ borderRadius: "10px", marginLeft: "10px" }}
                type="text"
                value={location}
                onChange={handleLocationChange}
              />
            ) : (
              <span className="InfoValue">{location}</span>
            )}
          </div>
        </div>
        <div className="ProfileActions">
          {editing ? (
            <button className="EditButton" onClick={handleSaveClick}>
              <FaSave /> Save Changes
            </button>
          ) : (
            <button className="EditButton" onClick={handleEditClick}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserProfile;
