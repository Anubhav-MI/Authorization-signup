// UserPage.js
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import QRCodeGenerator from "./qrcodegenerator";
import { useNavigate } from "react-router-dom";
import "./userpage.css";

const UserPage = ({ userEmail }) => {
  const [customColor, setCustomColor] = useState("");
  const [Color, setColor] = useState("");

  const [authUser, setAuthUser] = useState(null);
  const { uid } = useParams();
  const navigate = useNavigate();
  const userPageUrl = window.location.href;
  let color;

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate(`/signin`);
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div>
        <h2>Welcome !</h2>
      </div>

      <p>URL: {userPageUrl}</p>
      <QRCodeGenerator userPageUrl={userPageUrl} color={customColor} />
      <div className="customColor">
        <label>Customize QR</label>
        <input
          type="text"
          placeholder="Color"
          value={Color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        ></input>
        <button
          className="btn"
          type="submit"
          onClick={(e) => {
            setCustomColor(Color);
          }}
        >
          >>
        </button>
      </div>
      {authUser ? (
        <div>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button className="btn" onClick={userSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <p>Signed out</p>
      )}
    </div>
  );
};

export default UserPage;
