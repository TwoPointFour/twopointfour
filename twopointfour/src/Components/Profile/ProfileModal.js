import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { API_ROOT_ENDPOINT } from "../../Configurations/Config";
import { createUserProfileHTTP, UIAction } from "../../store/mainSlice";
import Icons from "../Assets/Icons";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import InputNoValidation from "../UI/Input/InputNoValidation";
import Spinner from "../UI/Loading/Spinner";
import Modal from "../UI/Modal";
import styles from "./ProfileModal.module.css";

const ProfileModal = () => {
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
  const uid = useSelector((state) => state.user.authentication.uid);
  const modalInfo = useSelector((state) => state.ui.modal);
  const history = useHistory();

  //   async function onDpChange() {
  //     console.log(userDp.current.inputData.files[0]);
  //     let userProfileFormData = new FormData();
  //     userProfileFormData.append("profileImage", userDp.current.inputData.files[0]);
  //     const response = await fetch(`${API_ROOT_ENDPOINT}/profile/dp/`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //       body: userProfileFormData,
  //     });
  //   }
  async function onSaveClick() {
    const request = await onProfileUpdate();
    const requestDp = await onDpChange();
  }

  async function onDpChange() {
    let userProfileFormData = new FormData();
    userProfileFormData.append("profileImage", userDp.current.inputData.files[0]);
    const response = await fetch(`${API_ROOT_ENDPOINT}/profile/dp/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: userProfileFormData,
    });
  }

  function onProfileUpdate() {
    // let userProfileFormData = new FormData();
    // userProfileFormData.append("alias", displayNameRef.current.inputData.value);
    // userProfileFormData.append("bio", userBioRef.current.inputData.value);
    // userProfileFormData.append("profileImage", userDp.current.inputData.files[0]);

    // const userData = {};

    // if (usernameRef.current.inputData.value)
    //   userData.username = usernameRef.current.inputData.value;
    // if (emailRef.current.inputData.value) userData.email = emailRef.current.inputData.value;
    // if (firstNameRef.current.inputData.value)
    //   userData.first_name = firstNameRef.current.inputData.value;
    // if (lastNameRef.current.inputData.value)
    //   userData.last_name = lastNameRef.current.inputData.value;

    const profileData = {};

    if (userBioRef.current.inputData.value) profileData.bio = userBioRef.current.inputData.value;
    if (displayNameRef.current.inputData.value)
      profileData.alias = displayNameRef.current.inputData.value;
    profileData.user = uid;

    // dispatch(updateUserProfileHTTP(userProfileInfo));
    console.log("Form data attemp send");
    dispatch(createUserProfileHTTP(profileData));
  }

  return (
    <Modal>
      <Card parentClassName={styles["profile__create"]} color="white">
        <h3>Create Profile</h3>
        <InputNoValidation
          ref={userDp}
          floatText="Profile Image File"
          name="profileDp"
          type="file"
          accept="image/*"
          preFilled={true}
        ></InputNoValidation>
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
        {/* <InputNoValidation
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
        ></InputNoValidation> */}
        <Button
          onClickHandler={onSaveClick}
          className={styles["profile__update"]}
          color="yellow-fill"
          length="small"
        >
          Save
        </Button>
      </Card>
    </Modal>

    // <Modal>
    //   <Card color="white">
    //     <h1>Create Profile</h1>
    //     <h3>Change Profile Picture</h3>
    //     <Avatar size="large" url={currentProfile.dp} />
    //     <InputNoValidation
    //       ref={userDp}
    //       floatText="Profile Image File"
    //       name="profileDp"
    //       type="file"
    //       accept="image/*"
    //       preFilled={true}
    //     ></InputNoValidation>
    //     <Button
    //       onClickHandler={onDpChange}
    //       className={styles["profile__update"]}
    //       color="yellow-fill"
    //       length="medium"
    //     >
    //       Change
    //     </Button>
    //   </Card>
    // </Modal>
  );
};

export default ProfileModal;
