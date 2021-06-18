import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { userAction } from "../../store/mainSlice";
import Icons from "../Assets/Icons";
import { postHTTP, putHTTP } from "../Helper/Complementary";
import { getJSON } from "../Helper/Helper";
import Privacy from "../Legal/Privacy";
import Terms from "../Legal/Terms";
import Button from "../UI/Button";
import InputNoValidation from "../UI/Input/InputNoValidation";
import styles from "./LoginPage.module.css";
import { API_ROOT_ENDPOINT } from "../../Configurations/Config";

const LoginPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [signedUp, setSignedUp] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      setErrorMessage("");
      let response;
      if (!isLogin) {
        response = await fetch(`${API_ROOT_ENDPOINT}/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInputRef.current.inputData.value,
            password: passwordInputRef.current.inputData.value,
            username: emailInputRef.current.inputData.value.split("@")[0],
          }),
        });
      }

      if (isLogin) {
        response = await fetch(`${API_ROOT_ENDPOINT}/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwordInputRef.current.inputData.value,
            username: usernameInputRef.current.inputData.value,
          }),
        });
      }

      let responseData;

      console.warn(response);
      try {
        responseData = await response.json();
      } catch {
        console.log("JSON Empty");
      }

      console.log(response);
      console.log(responseData);

      if (!response.ok) {
        throw Object.values(responseData)[0];
      }

      if (response.ok && !isLogin) {
        setIsLogin(true);
        setSignedUp(true);
      }

      if (response.ok && isLogin) {
        document.cookie = `refreshToken=${responseData.refresh}; max-age=31536000`;
        dispatch(
          userAction.updateTokens({
            idToken: responseData.access,
            refreshToken: responseData.refresh,
          })
        );

        // document.cookie = `idToken=${responseData.idToken}; max-age=31536000`;

        history.replace("/run");
      }
    } catch (error) {
      setErrorMessage(error.toString());
    }
  }

  async function onGoogleSubmit(event) {
    event.preventDefault();
    // await fetch(
    //   "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http%3A//localhost:3000&client_id=920795690755-hlovqjae3k9s6p2j7n2n5pf0r3hm4agh.apps.googleusercontent.com",
    //   { redirect: "follow" }
    // );
    window.location.replace(
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http%3A//localhost:3000/authorized&client_id=920795690755-hlovqjae3k9s6p2j7n2n5pf0r3hm4agh.apps.googleusercontent.com"
    );
  }

  return (
    <div className={styles.login}>
      <Route path="/login/privacy">
        <Privacy />
      </Route>
      <Route path="/login/terms">
        <Terms />
      </Route>
      <div className={styles["login__splash"]}>
        <figure className={styles["login__logo"]}>{Icons["logo"]}</figure>
        <div>
          <h3 className={styles["login__title"]}>
            {isLogin ? "Welcome to TwoPointFour!" : "Register for TwoPointFour!"}
          </h3>
          <p className={styles["login__description"]}>Your run, personalized‍.</p>
          {signedUp && (
            <p className={styles["login__signedUp"]}>
              Account Created! Please login with your email and password.
            </p>
          )}
        </div>
      </div>
      <form className={styles["login__form"]}>
        <div className={styles["input__wrapper"]}>
          {!isLogin && (
            <InputNoValidation
              ref={emailInputRef}
              floatText="Email"
              name="email"
              type="text"
            ></InputNoValidation>
          )}

          {isLogin && (
            <InputNoValidation
              ref={usernameInputRef}
              floatText="Username"
              name="username"
              type="text"
            ></InputNoValidation>
          )}

          <InputNoValidation
            ref={passwordInputRef}
            floatText="Password"
            name="Password"
            type="password"
          ></InputNoValidation>
        </div>
        {errorMessage ? <p style={{ color: "red" }}>ERROR: {errorMessage}</p> : ""}
        <p>
          By continuing you accept our <Link to="/login/privacy">Privacy Policy</Link> and{" "}
          <Link to="/login/terms">Terms of Use</Link>
        </p>
        <Button
          onClickHandler={onFormSubmit}
          className={styles["login__button"]}
          length="large"
          color="yellow-fill"
        >
          <span className={styles["login__button-text"]}>{isLogin ? "Login" : "Sign Up"}</span>
        </Button>
        {/* <Button
        onClickHandler={onGoogleSubmit}
        className={styles["login__button"]}
        length="large"
        color="yellow-fill"
      >
        <span className={styles["login__button-text"]}>Login with Google</span>
      </Button> */}
        {isLogin && <span className={styles["login__forgot"]}>Forgot password?</span>}
      </form>
      <span className={styles["login__signup"]}>
        {isLogin && (
          <>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin((prev) => !prev)} className={styles["login__register"]}>
              Register!
            </span>
          </>
        )}
        {!isLogin && (
          <>
            Already have an account?{" "}
            <span onClick={() => setIsLogin((prev) => !prev)} className={styles["login__register"]}>
              Sign in here!
            </span>
          </>
        )}
      </span>
    </div>
  );
};

export default LoginPage;
