import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import "./UserProfile.css";
import { faCloudUploadAlt, faImage } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import { useUser } from "../hook/useUser";
import Footer from "../components/Footer";
import axios from "axios";
import { variable } from "../variable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UserProfile = () => {
  const { user, setUser } = useUser();
  const [username, setUserName] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState(user.user.password);
  const [location, setLocation] = useState(user.user.location);
  const [editing, setEditing] = useState(false);

  const [url, setUrl] = useState("");
  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.patch(
        `${variable}/user/update`,
        {
          username,
          email,
          password,
          location,
          url,
        },
        config
      );
      setUser({ user: response.data, token: response.data.token });
      const now = new Date();

      let expirationDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
      const jsonUserData = JSON.stringify({
        user: response.data.user.id,
        token: response.data.token,
      });
      document.cookie = `${"jwtToken"}=${jsonUserData};expires=${expirationDate.toUTCString()};path=/`;
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
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

  const fileInputRef = React.createRef();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        setUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  console.log("user");
  console.log(user);

  useEffect(() => {
    if (user.user.picture) {
      setUrl(user.user.picture);
    }
  }, [user.user.picture]);
  return (
    <div>
      <Navbar></Navbar>
      <div className="ProfileContainer">
        <div className="ProfileHeader">
          <div className="ProfileImageContainer">
            <div style={{ position: "relative" }}>
              {url ? (
                <img className="ProfileImage" alt="Profile" src={url} />
              ) : (
                <img
                  className="ProfileImage"
                  alt="Profile"
                  src="https://cdn1.iconfinder.com/data/icons/avatar-vol-8/512/15-512.png"
                />
              )}
            </div>
            <div
              style={{
                position: "absolute",
                top: "170px",
                left: "795px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  style={{ color: "rgba(10, 0, 100, 0.877)", fontSize: "18px" }}
                  icon={faImage}
                />
              </div>

              <div
                onClick={handleSaveClick}
                style={{
                  marginTop: "5px",
                  width: "35px",
                  height: "35px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  style={{ color: "rgba(10, 0, 100, 0.877)", fontSize: "18px" }}
                  icon={faCloudUploadAlt}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="UserInfo">
          <div className="UserInfoItem">
            <FaUser className="InfoIcon" />
            <span className="InfoLabel">Username:</span>
            {editing ? (
              <input
                style={{ borderRadius: "10px", marginLeft: "10px" }}
                type="text"
                value={username}
                onChange={handleNameChange}
              />
            ) : (
              <span className="InfoValue">{username}</span>
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
