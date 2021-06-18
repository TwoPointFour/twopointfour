import Avatar from "../UI/Avatar";
import styles from "./Profile.module.css";
import yihein from "../Assets/yihein.jpg";
import Card from "../UI/Card/Card";
import InputNoValidation from "../UI/Input/InputNoValidation";
import { useRef } from "react";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfileHTTP } from "../../store/mainSlice";
import { Link, useHistory } from "react-router-dom";
import Icons from "../Assets/Icons";
import { API_ROOT_ENDPOINT } from "../../Configurations/Config";
import Modal from "../UI/Modal";
import { Route } from "react-router-dom";

const Profile = () => {
  const userDp = useRef();
  const displayNameRef = useRef();
  const userBioRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.user.userProfile);
  const idToken = useSelector((state) => state.user.authentication.idToken);
  const history = useHistory();

  // console.log(userDp.current.inputData.files);

  function onProfileUpdate() {
    // let userProfileFormData = new FormData();
    // userProfileFormData.append("alias", displayNameRef.current.inputData.value);
    // userProfileFormData.append("bio", userBioRef.current.inputData.value);
    // userProfileFormData.append("profileImage", userDp.current.inputData.files[0]);

    const userData = {};

    if (usernameRef.current.inputData.value)
      userData.username = usernameRef.current.inputData.value;
    if (emailRef.current.inputData.value) userData.email = emailRef.current.inputData.value;
    if (firstNameRef.current.inputData.value)
      userData.first_name = firstNameRef.current.inputData.value;
    if (lastNameRef.current.inputData.value)
      userData.last_name = lastNameRef.current.inputData.value;

    const profileData = {};

    if (userBioRef.current.inputData.value) profileData.bio = userBioRef.current.inputData.value;
    if (displayNameRef.current.inputData.value)
      profileData.alias = displayNameRef.current.inputData.value;
    profileData.user = userData;

    // dispatch(updateUserProfileHTTP(userProfileInfo));
    console.log("Form data attemp send");
    dispatch(updateUserProfileHTTP(profileData));

    usernameRef.current.inputData.value = "";
    emailRef.current.inputData.value = "";
    userBioRef.current.inputData.value = "";
    displayNameRef.current.inputData.value = "";
    firstNameRef.current.inputData.value = "";
    lastNameRef.current.inputData.value = "";
  }

  async function onDpChange() {
    console.log(userDp.current.inputData.files[0]);
    let userProfileFormData = new FormData();
    userProfileFormData.append("profileImage", userDp.current.inputData.files[0]);
    const response = await fetch(`${API_ROOT_ENDPOINT}/profile/dp/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: userProfileFormData,
    });

    history.goBack();
  }

  function onLogoutHandler() {
    console.log("Logout clicked!");
    dispatch(logout());
  }

  return (
    <>
      <Route path="/profile/changeDp/">
        <Modal>
          <Card parentClassName={styles["dp_change"]} color="white">
            <h3>Change Profile Picture</h3>
            <Avatar size="large" url={currentProfile.dp} />
            <InputNoValidation
              ref={userDp}
              floatText="Profile Image File"
              name="profileDp"
              type="file"
              accept="image/*"
              preFilled={true}
            ></InputNoValidation>
            <Button
              onClickHandler={onDpChange}
              className={styles["profile__update"]}
              color="yellow-fill"
              length="medium"
            >
              Change
            </Button>
          </Card>
        </Modal>
      </Route>
      <div className={styles.profile}>
        <Card parentClassName={styles["profile__info"]} color="white">
          <Link to="/profile/changeDp/">
            <Avatar size="large" url={currentProfile.dp} />
          </Link>
          {currentProfile.displayName ? <h3>{currentProfile.displayName}</h3> : ""}
          <p className={styles["profile__email"]}>{currentProfile.email}</p>
          {currentProfile.bio ? <p className={styles["profile__bio"]}>{currentProfile.bio}</p> : ""}
        </Card>
        <Card parentClassName={styles["profile__edit"]} color="white">
          <h3>Edit Profile</h3>
          <InputNoValidation
            ref={displayNameRef}
            floatText="Display Name"
            name="displayName"
            type="text"
          ></InputNoValidation>
          <InputNoValidation
            ref={userBioRef}
            floatText="Bio"
            name="bio"
            type="text"
          ></InputNoValidation>
          <InputNoValidation
            ref={usernameRef}
            floatText="Username"
            name="username"
            type="text"
          ></InputNoValidation>
          <InputNoValidation
            ref={emailRef}
            floatText="Email"
            name="email"
            type="email"
          ></InputNoValidation>
          <InputNoValidation
            ref={firstNameRef}
            floatText="First Name"
            name="firstname"
            type="text"
          ></InputNoValidation>
          <InputNoValidation
            ref={lastNameRef}
            floatText="Last Name"
            name="lastname"
            type="text"
          ></InputNoValidation>
          <Button
            onClickHandler={onProfileUpdate}
            className={styles["profile__update"]}
            color="yellow-fill"
            length="small"
          >
            Save
          </Button>
        </Card>

        <Card parentClassName={styles["questionnaire"]} color="white">
          <h3>Reset Algorithm</h3>
          <p>
            Reset the workout suggestion algorithm by completing the fitness questionnaire again.
          </p>
          <p className={styles.warning}>
            WARNING: By reseting the algorithm, you will lose all your workout records and workout
            personalization acquired so far.
          </p>
          <Link to="/questionnaire">
            <Button className={styles["questionnaire__button"]} color="yellow-fill" size="small">
              Fill Questionnaire and Reset
            </Button>
          </Link>
        </Card>
        <Card parentClassName={styles["logout"]} color="white">
          <h3>Log Out</h3>
          <Link to="/login">
            <Button
              onClickHandler={onLogoutHandler}
              className={styles["questionnaire__button"]}
              color="yellow-fill"
              size="small"
            >
              Logout Now
            </Button>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Profile;
