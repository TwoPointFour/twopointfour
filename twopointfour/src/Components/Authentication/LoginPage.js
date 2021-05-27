import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { userAction } from "../../store/mainSlice";
import Icons from "../Assets/Icons";
import { putHTTP } from "../Helper/Complementary";
import { getJSON } from "../Helper/Helper";
import Privacy from "../Legal/Privacy";
import Terms from "../Legal/Terms";
import Button from "../UI/Button";
import InputNoValidation from "../UI/Input/InputNoValidation";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [signedUp, setSignedUp] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      setErrorMessage("");
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isLogin ? "signInWithPassword" : "signUp"
        }?key=AIzaSyAMxK4FTyqlPHYVPkzFE6i7yI_mHqCvKJg`,
        {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({
            email: emailInputRef.current.inputData.value,
            password: passwordInputRef.current.inputData.value,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw responseData.error.message;
      }

      if (response.ok && !isLogin) {
        //initializing the account

        const userDataInitialisation = {
          userProfile: {
            email: responseData.email,
            bio: "No Bio",
            displayName: responseData.email.split("@")[0],
            dp: "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
            badges: [null],
            uid: responseData.localId,
          },
          questionnaire: {
            distance: "temp",
            duration: "temp",
            experience: "temp",
            frequency: "temp",
            latest: "temp",
            regular: "temp",
            target: "temp",
            workoutFrequency: "temp",
          },
          workouts: {
            previousWorkout: "temp",
            nextWorkout: "temp",
            currentFitness: "temp",
            logs: "temp",
          },
        };

        await putHTTP(
          `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${responseData.localId}.json?auth=${responseData.idToken}`,
          userDataInitialisation
        );

        setIsLogin(true);
        setSignedUp(true);
      }

      if (response.ok && isLogin) {
        dispatch(
          userAction.updateAuthentication({
            idToken: responseData.idToken,
            uid: responseData.localId,
          })
        );

        document.cookie = `idToken=${responseData.idToken}; max-age=31536000`;
        document.cookie = `uid=${responseData.localId}; max-age=31536000`;

        history.replace("/run");
      }
    } catch (error) {
      setErrorMessage(error);
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
          <InputNoValidation
            ref={emailInputRef}
            floatText="Email"
            name="email"
            type="text"
          ></InputNoValidation>

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
