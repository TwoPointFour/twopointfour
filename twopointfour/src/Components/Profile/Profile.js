import Avatar from "../UI/Avatar";
import styles from "./Profile.module.css";
import yihein from "../Assets/yihein.jpg";
import Card from "../UI/Card/Card";
import InputNoValidation from "../UI/Input/InputNoValidation";
import { useRef } from "react";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfileHTTP } from "../../store/mainSlice";
import { Link } from "react-router-dom";
import Icons from "../Assets/Icons";

const Profile = () => {
  const displayNameRef = useRef();
  const userBioRef = useRef();
  const userDp = useRef();
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.user.userProfile);

  function onProfileUpdate() {
    const userProfileInfo = {
      email: currentProfile.email,
      displayName: displayNameRef.current.inputData.value,
      bio: userBioRef.current.inputData.value,
      dp: userDp.current.inputData.value,
      uid: currentProfile.uid,
    };
    dispatch(updateUserProfileHTTP(userProfileInfo));
  }

  function onLogoutHandler() {
    console.log("Logout clicked!");
    dispatch(logout());
  }

  return (
    <div className={styles.profile}>
      <Card parentClassName={styles["profile__info"]} color="white">
        {currentProfile.dp ? (
          <Avatar size="large" url={currentProfile.dp} />
        ) : (
          <figure className={styles.filler}>{Icons["profile"]}</figure>
        )}
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
          ref={userDp}
          floatText="Profile Image URL"
          name="profileDp"
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
        <p>Reset the workout suggestion algorithm by completing the fitness questionnaire again.</p>
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
  );
};

export default Profile;
