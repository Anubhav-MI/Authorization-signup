import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Initialize useNavigate

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((usercredential) => {
        console.log(usercredential);
        sendData(usercredential.user.displayName, usercredential.user.email);
        navigate(`/user/${usercredential.user.displayName}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = async () => {
    try {
      const usercredentialdata = await signInWithPopup(auth, provider);
      sendData(
        usercredentialdata.user.displayName,
        usercredentialdata.user.email
      );
      navigate(`/user/${usercredentialdata.user.displayName}`);
    } catch (error) {
      console.log("error:", error);
    }
  };

  async function sendData(name, mail) {
    try {
      const response = await axios.post("http://localhost:3001/api/senddata", {
        username: name,
        email: mail,
      });

      if (response.status === 200) {
        // Handle success
        console.log("Data sent successfully");
      } else {
        // Handle error
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    // <div className="sign-in-container">
    //   <form onSubmit={signIn}>
    //     <h1>Log in to your account</h1>
    //     <input
    //       type="email"
    //       placeholder="Enter your email"
    //       value={mail}
    //       onChange={(e) => setMail(e.target.value)}
    //     ></input>
    //     <input
    //       type="password"
    //       placeholder="Enter your password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     ></input>
    //     <button type="submit">Log In</button>
    //     <button type="submit" onClick={signInWithGoogle}>
    //       Sign in with Google
    //     </button>
    //     <p>Don't have an account?</p>
    //     <button
    //       type="submit"
    //       onClick={(e) => {
    //         navigate(`/`);
    //       }}
    //     >
    //       Sign Up
    //     </button>
    //   </form>
    // </div>
    <div className={styles.container}>
      <form onSubmit={signIn}>
        <h1 className={styles.heading}>Log in Form</h1>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./images/login.jpg"></img>
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Member Log in</h2>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.btn} onClick={signIn}>
              Log In
            </button>
            <p className={styles.text}>or</p>
            <button
              className={styles.google_btn}
              type="submit"
              onClick={signInWithGoogle}
            >
              <img src="./images/google-icon-.png" alt="google icon" />
              <span>Sign up with Google</span>
            </button>
            <p className={styles.text}>New Here ?</p>
            <button
              className={styles.btn}
              type="submit"
              onClick={(e) => {
                navigate(`/`);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
