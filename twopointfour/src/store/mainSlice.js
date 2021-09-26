import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { postHTTP, putHTTP, deleteHTTP } from "../Components/Helper/Complementary";
import { getJSON, getTrainingPlan } from "../Components/Helper/Helper";
import { API_ROOT_ENDPOINT } from "../Configurations/Config";
import { createBrowserHistory } from "history";
import { vTvRSlice } from "./vTvRSlice";
export const browserHistory = createBrowserHistory();
// ...

const initialUIState = {
  main: {
    status: "loading",
    title: "Loading",
    description: "Getting data...",
  },
  modal: {
    show: false,
    status: "loading",
    title: "Loading",
    description: "Getting data... to do ownas;ldfjasl;dfjl workouts!!!",
    buttonText: "temp",
    buttonPath: "/run",
  },
  profile: {
    show: false,
  },
};

const UISlice = createSlice({
  name: "uiState",
  initialState: initialUIState,
  reducers: {
    setMainUIStatus(state, action) {
      state.main.status = action.payload.status;
    },
    setModalUIStatus(state, action) {
      state.modal.show = action.payload.show;
      state.modal.status = action.payload.status;
      state.modal.title = action.payload.title;
      state.modal.description = action.payload.description;
      state.modal.buttonText = action.payload.buttonText;
      state.modal.buttonPath = action.payload.buttonPath;
    },
    showModal(state, action) {
      state.modal.show = action.payload;
    },
    setProfileModalStatus(state, action) {
      state.profile.show = action.payload;
      console.log(current(state));
    },
  },
});

export const UIAction = UISlice.actions;

const initialWorkoutState = {
  nextWorkout: {},
  previousWorkout: {},
  logs: {},
  currentFitness: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState: initialWorkoutState,
  reducers: {
    setNextWorkout(state, action) {
      state.nextWorkout = action.payload;
    },
    setCurrentFitness(state, action) {
      state.currentFitness = action.payload;
    },
    setWorkoutData(state, action) {
      state.nextWorkout = action.payload.nextWorkout;
      state.previousWorkout = action.payload.previousWorkout;
      state.logs = action.payload.logs;
      state.currentFitness = action.payload.currentFitness;
    },
    setWorkoutLogs(state, action) {
      state.logs = action.payload.logs;
    },
  },
});

export const workoutAction = workoutSlice.actions;

export const INTERVAL = 25;

export const initialTimerState = {
  timerUpdateInterval: INTERVAL,
  expectedFunctionExecutionTime: null,
  trainingDate: "",
  permSetCount: 0,
  setCount: 1,
  permDistance: 0,
  permRestTime: 0,
  restTime: 0,
  restElapsed: 0,
  permSetTime: 0,
  setTime: 0,
  setElapsed: 0,
  expectedDistance: 0,
  rest: false,
  pause: true,
  gpsActiveData: [],
  gpsStoredData: [],
};

// const timerSlice = createSlice({
//   name: "timer",
//   initialState: initialTimerState,
//   reducers: {
//     initialiseTimer(state, action) {
//       state.trainingDate = Date.now();
//       state.permSetCount = action.payload.sets;
//       state.setCount = 1;
//       state.permDistance = action.payload.distance;
//       state.permRestTime = action.payload.restTime;
//       state.restTime = action.payload.restTime;
//       state.restElapsed = 0;
//       state.permSetTime = action.payload.setTime;
//       state.setTime = action.payload.setTime;
//       state.setElapsed = 0;
//       state.pace = action.payload.pace;
//       state.expectedDistance = 0;
//       state.rest = false;
//       state.pause = true;
//     },
//     updateSetTime(state) {
//       if (state.setCount > state.permSetCount) return;
//       if (state.rest === false) {
//         state.setElapsed += INTERVAL;
//         state.setTime -= INTERVAL;
//       } else if (state.rest === true && state.restTime > 0) {
//         state.restTime -= INTERVAL;
//         state.restElapsed += INTERVAL;
//       } else {
//         state.rest = false;
//         state.setCount += 1;
//         state.setElapsed = INTERVAL;
//         state.setTime = state.permSetTime - INTERVAL;
//       }

//       state.expectedDistance = (state.setTimeElpased / state.permPaceTime) * 100;
//     },
//     pauseTimer(state, action) {
//       state.pause = action.payload;
//     },
//     initialExecutionTime(state) {
//       state.expectedFunctionExecutionTime = Date.now() + state.timerUpdateInterval;
//     },
//     updateExecutionTime(state, action) {
//       state.expectedFunctionExecutionTime += action.payload;
//     },
//     splitTimer(state) {
//       state.restTime = state.setTime - state.setTimeElpased;
//       state.rest = true;
//     },
//     updateActiveGPS(state, action) {
//       state.gpsActiveData = action.payload;
//     },
//     updateStoredGPS(state, action) {
//       state.gpsStoredData = [...state.gpsStoredData, action.payload];
//       console.log(current(state));
//     },
//   },
// });

// export const timerAction = timerSlice.actions;

// export const startTimer = () => {
//   return (dispatch, getState) => {
//     function updateCountdown() {
//       const state = getState();
//       const lagTime = Date.now() - state.timer.expectedFunctionExecutionTime;
//       dispatch(timerAction.updateSetTime());
//       dispatch(timerAction.updateExecutionTime(state.timer.timerUpdateInterval));
//       if (!state.timer.pause) {
//         setTimeout(updateCountdown, Math.max(0, state.timer.timerUpdateInterval - lagTime));
//       }
//     }
//     const state = getState();
//     dispatch(timerAction.pauseTimer(false));
//     dispatch(timerAction.initialExecutionTime());
//     setTimeout(updateCountdown, state.timer.timerUpdateInterval);
//   };
// };

const initialUserState = {
  authentication: {
    idToken: "",
    uid: "",
    pid: "",
    refreshToken: "",
  },
  userProfile: {
    email: "",
    displayName: "",
    bio: "",
    dp: "",
    uid: "",
    coins: null,
  },
  questionnaire: {
    regular: "",
    frequency: null,
    distance: null,
    experience: null,
    latest: "",
    target: "",
    duration: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateAuthentication(state, action) {
      state.authentication.idToken = action.payload.idToken;
      state.authentication.uid = action.payload.uid;
      state.authentication.refreshToken = action.payload.refreshToken;
      state.authentication.pid = action.payload.pid;
      console.log(current(state));
    },
    updateUserProfile(state, action) {
      state.userProfile.email = action.payload.email;
      state.userProfile.displayName = action.payload.displayName;
      state.userProfile.bio = action.payload.bio;
      state.userProfile.dp = action.payload.dp;
      state.userProfile.uid = action.payload.uid;
      state.userProfile.coins = action.payload.coins;
    },
    updateQuestionnaire(state, action) {
      state.questionnaire = action.payload;
    },
    updateRefreshToken(state, action) {
      state.authentication.refreshToken = action.payload;
    },
    updateTokens(state, action) {
      state.authentication.idToken = action.payload.idToken;
      state.authentication.refreshToken = action.payload.refreshToken;
      console.log(current(state));
    },
    updatePID(state, action) {
      state.authentication.pid = action.payload;
      console.log(current(state));
    },
    updateCoins(state, action) {
      state.userProfile.coins = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

const initialCommunityState = {
  workouts: {},
};

const communitySlice = createSlice({
  name: "community",
  initialState: initialCommunityState,
  reducers: {
    getCommunityWorkouts(state, action) {
      state.workouts = action.payload;
      console.log(current(state));
    },
    addComment(state, action) {
      console.log(current(state));
      state.workouts[action.payload.workoutID].social.comments = {
        ...state.workouts[action.payload.workoutID].social.comments,
        [action.payload.commentID]: action.payload.commentData,
      };
    },
    deleteComment(state, action) {
      delete state.workouts[action.payload.workoutID].social.comments[action.payload.commentID];
    },
  },
});

export const communityAction = communitySlice.actions;

export const sendQuestionnaire = (input) => {
  return async (dispatch, getState) => {
    const state = getState().user.authentication;
    const idToken = state.idToken;
    const uid = state.uid;
    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Sending questionnaire responses to the server...",
      })
    );

    await postHTTP(`${API_ROOT_ENDPOINT}/questionnaire/create/`, idToken, input);

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "View Workouts",
        buttonPath: "/run",
        status: "success",
        title: "Success!",
        description:
          "Your questionnaire has been submitted! You should see you suggested workout soon! 🏃‍♂️",
      })
    );
  };
};

export const saveWorkout = (workout) => {
  return async (dispatch, getState) => {
    const state = getState().user.authentication;
    const userProfile = getState().user.userProfile;
    const idToken = state.idToken;
    const uid = state.uid;
    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Sending workout data...",
      })
    );

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/previousWorkout.json?auth=${idToken}`,
      workout
    );

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Updating the server...",
      })
    );

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Creating workout entry in database...",
      })
    );

    const workoutWithReview = {
      ...workout,
      review: {
        feeling: "good",
        reflection: "I attempted this training.",
      },
    };

    const comments = {
      initialComment: {
        time: Date.now(),
        text: "Be the first to comment!",
        userProfile: {
          displayName: "TwoPointFour Bot",
          email: "twopointfourapp@gmail.com",
          bio: "Striving to help you become stronger and faster.",
          badges: ["Moderator"],
          dp: "https://engineering.fb.com/wp-content/uploads/2017/06/Facebook-Messenger-Bot-01.png",
        },
      },
    };

    const social = {
      comments,
      likes: 0,
      share: true,
    };

    const formattedWorkout = {
      workout: workoutWithReview,
      userProfile,
      social,
    };

    const workoutID = await postHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/logs.json?auth=${idToken}`,
      formattedWorkout
    );

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/community/${workoutID.name}.json?auth=${idToken}`,
      formattedWorkout
    );

    ///////////////////////////////////////////////

    dispatch(getNextTraining());
  };
};

export const getNextTraining = () => {
  return async (dispatch, getState) => {
    const state = getState().user.authentication;
    const idToken = state.idToken;
    const uid = state.uid;
    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Initialising next workout recommender",
      })
    );

    const workouts = await Promise.all([
      getJSON(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/main/primary.json?auth=${idToken}`
      ),
      getJSON(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/main/secondary.json?auth=${idToken}`
      ),
      getJSON(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/main/pyramid.json?auth=${idToken}`
      ),
      getJSON(
          `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/filler/longDistance.json?auth=${idToken}`
      ),
      getJSON(
          `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/filler/fartlek.json?auth=${idToken}`
      )
    ]);

    const previousWorkout = getState().workout.previousWorkout;

    const previousWorkoutAvailable = !!previousWorkout.segment;

    const previousFitness = getState().workout.currentFitness;

    const previousFitnessAvailable = !!previousFitness;

    const questionnaire = getState().user.questionnaire;

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description:
          "Analysing your workout performance and running our advanced workout suggestion algorithm...",
      })
    );

    const { newFitness, trainingPlan: training } = getTrainingPlan(
      questionnaire,
      workouts,
      previousWorkoutAvailable && previousWorkout,
      previousFitnessAvailable && previousFitness
    );

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/currentFitness.json?auth=${idToken}`,
      newFitness
    );

    // dispatch(workoutAction.setCurrentFitness(newFitness));

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/nextWorkout.json?auth=${idToken}`,
      training
    );

    // dispatch(workoutAction.setNextWorkout(training));

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Finding next training",
      })
    );

    const workoutData = await getJSON(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts.json?auth=${idToken}`
    );

    dispatch(workoutAction.setWorkoutData(workoutData));

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "View Workouts",
        buttonPath: "/run",
        status: "success",
        title: "Success!",
        description:
          "Our algorithm has analysed your workout performance and found your next training! View it now 🏃‍♂️",
      })
    );
  };
};

export const updateDatabase = (input, path) => {
  return async (dispatch, getState) => {
    const state = getState().user.authentication;
    const idToken = state.idToken;
    const uid = state.uid;
    await fetch(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/${path}.json?auth=${idToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );
  };
};

export const createUserProfileHTTP = (input) => {
  return async (dispatch, getState) => {
    const { idToken } = getState().user.authentication;
    const request = await fetch(`${API_ROOT_ENDPOINT}/profile/new/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(input),
    });
    const response = await request.json();

    dispatch(userAction.updatePID(response.id));
    // browserHistory.push("/run");
  };
};

export const updateUserProfileHTTP = (formInput) => {
  return async (dispatch, getState) => {
    try {
      const { idToken } = getState().user.authentication;

      dispatch(
        UIAction.setModalUIStatus({
          show: true,
          buttonText: "temp",
          buttonPath: "/run",
          status: "loading",
          title: "Loading",
          description: "Updating your user profile...",
        })
      );

      const request = await fetch(`${API_ROOT_ENDPOINT}/profile/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(formInput),
      });

      const response = await request.json();

      if (!request.ok) throw new Error("No profile detected!");

      const { profileFormatted } = await getProfileDjango(idToken);

      dispatch(userAction.updateUserProfile(profileFormatted));

      dispatch(
        UIAction.setModalUIStatus({
          show: true,
          buttonText: "close",
          buttonPath: "/profile",
          status: "success",
          title: "Success!",
          description: "Your profile has been updated!",
        })
      );
    } catch (error) {
      dispatch(UIAction.setProfileModalStatus(true));
    }
  };
};

export function logout() {
  return (dispatch) => {
    document.cookie = `idToken=""; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    document.cookie = `uid=""; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    document.cookie = `refreshToken=""; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    // document.cookie = null;
    dispatch(userAction.updateAuthentication({ idToken: null, uid: null }));
    dispatch(userAction.updateRefreshToken(null));
  };
}

async function getProfileDjango(idToken) {
  try {
    const profile = await fetch(`${API_ROOT_ENDPOINT}/profile/initialize`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const profileData = await profile.json();

    const profileFormatted = {
      email: profileData.user.email,
      displayName: profileData.user.username,
      bio: profileData.bio,
      dp: profileData.profileImage,
      uid: profileData.id,
      coins: profileData.coins,
    };

    const workoutFormatted = {
      logs: profileData.workoutlogs,
      nextWorkout: profileData.workoutlogs[0],
      previousWorkout: profileData.workoutlogs[1],
      currentFitness: profileData.currentFitness,
    };

    const questionnaire = profileData.questionnaire;

    return { profileFormatted, workoutFormatted };
  } catch (error) {
    throw error;
  }
}

export const initialiseData = () => {
  return async (dispatch, getState) => {
    try {
      const { idToken } = getState().user.authentication;
      console.log(idToken);
      console.log(getState());
      dispatch(UIAction.setMainUIStatus({ status: "loading" }));

      const { profileFormatted, workoutFormatted, questionnaire } = await getProfileDjango(idToken);

      // const profile = await fetch(`${API_ROOT_ENDPOINT}/profile/initialize`, {
      //   headers: {
      //     Authorization: `Bearer ${idToken}`,
      //   },
      // });

      // const profileData = await profile.json();

      // console.log(profileData);
      // console.log(getState());

      // const workoutFormatted = {
      //   logs: profileData.workoutlogs,
      //   nextWorkout: profileData.workoutlogs[0],
      //   previousWorkout: profileData.workoutlogs[1],
      //   currentFitness: profileData.currentFitness,
      // };

      // const profileFormatted = {
      //   email: profileData.user.email,
      //   displayName: profileData.user.username,
      //   bio: profileData.bio,
      //   dp: profileData.profileImage,
      //   uid: profileData.id,
      // };

      dispatch(workoutAction.setWorkoutData(workoutFormatted));

      dispatch(userAction.updateUserProfile(profileFormatted));
      console.log(getState());

      dispatch(userAction.updateQuestionnaire(questionnaire));

      dispatch(UIAction.setMainUIStatus({ status: "success" }));
    } catch {
      console.log("UI ACTION ACTIVATED!!!");
      dispatch(UIAction.setProfileModalStatus(true));
    }
  };
};

export const sendCommunityComment = (commentData, workoutID) => {
  return async (dispatch, getState) => {
    const { idToken, uid } = getState().user.authentication;

    const { name: commentID } = await postHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/community/${workoutID}/social/comments.json?auth=${idToken}`,
      commentData
    );

    dispatch(communityAction.addComment({ workoutID, commentID, commentData }));
  };
};

export const deleteCommunityComment = (workoutID, commentID) => {
  return async (dispatch, getState) => {
    const { idToken } = getState().user.authentication;

    await deleteHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/community/${workoutID}/social/comments/${commentID}.json?auth=${idToken}`
    );

    dispatch(communityAction.deleteComment({ workoutID, commentID }));
  };
};

export const shareWorkout = (workoutID, workoutInfo, shareStatus) => {
  return async (dispatch, getState) => {
    const { idToken, uid } = getState().user.authentication;

    if (shareStatus === true) {
      await putHTTP(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/community/${workoutID}.json?auth=${idToken}`,
        workoutInfo
      );
    }
    if (shareStatus === false) {
      await deleteHTTP(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/community/${workoutID}.json?auth=${idToken}`
      );
    }

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/logs/${workoutID}/social/share.json?auth=${idToken}`,
      shareStatus
    );
  };
};

export const initializeCommunityWorkouts = () => {
  return async (dispatch, getState) => {
    const { idToken, uid } = getState().user.authentication;

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        status: "loading",
        title: "Loading",
        description: "Retrieving community workouts...",
      })
    );

    const communityWorkouts = await getJSON(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/community.json?auth=${idToken}`
    );

    dispatch(communityAction.getCommunityWorkouts(communityWorkouts));

    dispatch(
      UIAction.setModalUIStatus({
        show: false,
      })
    );
  };
};
export const addCoins = () => {
  return async (dispatch, getState) => {
    console.log("add coins activated!");
    const { idToken, uid } = getState().user.authentication;
    const response = await postHTTP(`${API_ROOT_ENDPOINT}/profile/update/`, idToken, {
      user: { id: uid },
      coins: 100,
    });
    dispatch(userAction.updateCoins(response.coins));
  };
};

const store = configureStore({
  reducer: {
    // timer: timerSlice.reducer,
    // vTfR: vTfRSlice.reducer,
    vTvR: vTvRSlice.reducer,
    // fTfR: fTfRSlice.reducer,
    // fTvR: fTvRSlice.reducer,
    user: userSlice.reducer,
    workout: workoutSlice.reducer,
    ui: UISlice.reducer,
    community: communitySlice.reducer,
  },
});

export default store;
