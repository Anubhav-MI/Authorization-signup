import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
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
      console.log(usercredentialdata);
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
      const response = await axios.post(
        "https://authorization-firebase.onrender.com/api/senddata",
        {
          username: name,
          email: mail,
        }
      );

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
    //   <form onSubmit={signUp}>
    //     <h1>Create Account</h1>
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
    //     <button type="submit">Sign Up</button>
    //     <button type="submit" onClick={signInWithGoogle}>
    //       Sign in with Google
    //     </button>
    //     <p>Already signed up</p>
    //     <button
    //       type="submit"
    //       onClick={(e) => {
    //         navigate(`/signin`);
    //       }}
    //     >
    //       Log in here
    //     </button>
    //   </form>
    // </div>
    <div className={styles.container}>
      <form onSubmit={signUp}>
        <h1 className={styles.heading}>Sign Up Form</h1>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./images/sign.avif"></img>
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Member Sign Up</h2>
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
            <button className={styles.btn}>Sign Up</button>
            <p className={styles.text}>or</p>
            <button
              className={styles.google_btn}
              type="submit"
              onClick={signInWithGoogle}
            >
              <img src="./images/google-icon-.png" alt="google icon" />
              <span>Sign up with Google</span>
            </button>
            <p className={styles.text}>Already signed in ?</p>
            <button
              className={styles.btn}
              type="submit"
              onClick={(e) => {
                navigate(`/signin`);
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
