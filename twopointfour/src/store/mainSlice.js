import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { postHTTP, putHTTP, deleteHTTP } from "../Components/Helper/Complementary";
import { getJSON, getTrainingPlan } from "../Components/Helper/Helper";
import { API_ROOT_ENDPOINT } from "../Configurations/Config";
import { createBrowserHistory } from "history";
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

const INTERVAL = 25;

const initialTimerState = {
  trainingDate: "unset",
  timerUpdateInterval: INTERVAL,
  expectedFunctionExecutionTime: null,
  permSetCount: 5,
  permDistance: 500,
  permPaceTime: 3000,
  permSetTime: 30000000,
  permRestTime: 10000,
  permPaceCount: 5,
  distance: 0,
  paceTime: 3000,
  paceCount: 0,
  setTime: 30000000,
  setTimeElpased: 0,
  setCount: 1,
  pause: true,
  rest: false,
  gpsActiveData: [],
  gpsStoredData: [],
  bigTimeValue: {
    tenSec: null,
    oneSec: null,
    tenMilli: null,
    oneMilli: null,
  },
  smallTimeValue: {
    tenMin: null,
    oneMin: null,
    tenSec: null,
    oneSec: null,
  },
  workoutData: {
    workout_ID: "1000",
    type: "Distance Interval",
    segment: "primary",
    difficultyMultiplier: 66.8,
    personalisedDifficultyMultiplier: 110,
    parts: [{ part_ID: "1000_0", timings: ["temp"], restMultiplier: 2, sets: 10, distance: 300 }],
  },
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    initialiseTimer(state, action) {
      state.trainingDate = Date.now();
      state.permSetCount = action.payload.sets;
      state.permDistance = action.payload.distance;
      state.permPaceTime = action.payload.pace;
      state.permSetTime = action.payload.setTime;
      state.permRestTime = action.payload.rest;
      state.permPaceCount = parseInt(action.payload.distance / 100);
      state.distance = 0;
      state.paceTime = action.payload.pace;
      state.paceCount = 0;
      state.setTime = action.payload.setTime;
      state.setTimeElpased = 0;
      state.setCount = 1;
      state.rest = false;
      state.bigTimeValue = {
        tenSec: null,
        oneSec: null,
        tenMilli: null,
        oneMilli: null,
      };
      state.smallTimeValue = {
        tenMin: null,
        oneMin: null,
        tenSec: null,
        oneSec: null,
      };
      state.pause = true;
    },
    updateSetTime(state) {
      if (state.setTime <= 0 && state.setCount < state.permSetCount) {
        state.paceCount = 0;
        state.paceTime = state.permPaceTime - state.timerUpdateInterval;
        state.setTime = state.permSetTime - state.timerUpdateInterval;
        state.setTimeElpased = state.permSetTime - state.setTime;
        state.rest = false;
        state.setCount++;
      } else if (state.setCount >= state.permSetCount && state.setTime <= 0) {
        state.setTime = 0;
      } else {
        state.setTime -= state.timerUpdateInterval;
        state.setTimeElpased = state.permSetTime - state.setTime;
      }

      const displayedTime = state.rest ? state.setTime : state.setTimeElpased;

      const minutes = Math.floor(displayedTime / (1000 * 60));
      const seconds = Math.floor((displayedTime - minutes * 1000 * 60) / 1000);
      const minutesPad = minutes.toString().padStart(2, "0");
      const secondsPad = seconds.toString().padStart(2, "0");
      state.smallTimeValue.tenMin = minutesPad[0];
      state.smallTimeValue.oneMin = minutesPad[1];
      state.smallTimeValue.tenSec = secondsPad[0];
      state.smallTimeValue.oneSec = secondsPad[1];
    },
    updatePaceTime(state) {
      if (state.paceTime <= 0 && state.paceCount < state.permPaceCount) {
        // starttimepace = Date.now();
        // Callouts for Pace
        state.paceCount++;
        state.distance = state.paceCount * 100;
        // callCallout(`callouts/${state.paceCount * 100}`);
        state.paceTime = state.permPaceTime - state.timerUpdateInterval;
      } else if (state.paceCount >= state.permPaceCount) {
        state.paceTime = 0;
      } else {
        state.paceTime -= state.timerUpdateInterval;
      }

      const seconds = Math.floor(state.paceTime / 1000);
      const milliseconds = state.paceTime - seconds * 1000;
      const secondsPad = seconds.toString().padStart(2, "0");
      const milliPad = milliseconds.toString().padStart(3, "0");
      state.bigTimeValue.tenSec = secondsPad[0];
      state.bigTimeValue.oneSec = secondsPad[1];
      state.bigTimeValue.tenMilli = milliPad[0];
      state.bigTimeValue.oneMilli = milliPad[1];
    },
    pauseTimer(state, action) {
      state.pause = action.payload;
    },
    initialExecutionTime(state) {
      state.expectedFunctionExecutionTime = Date.now() + state.timerUpdateInterval;
    },
    updateExecutionTime(state, action) {
      state.expectedFunctionExecutionTime += action.payload;
    },
    splitTimer(state) {
      state.workoutData.parts[0].timings.push(state.setTimeElpased);
      state.setTime = state.permRestTime;
      state.paceCount = state.permPaceCount;
      state.paceTime = 0;
      state.distance = state.paceCount * 100;
      state.rest = true;
    },
    updateActiveGPS(state, action) {
      state.gpsActiveData = action.payload;
    },
    updateStoredGPS(state, action) {
      state.gpsStoredData = [...state.gpsStoredData, action.payload];
      console.log(current(state));
    },
  },
});

export const timerAction = timerSlice.actions;

export const startTimer = () => {
  return (dispatch, getState) => {
    function updateCountdown() {
      const state = getState();
      const lagTime = Date.now() - state.timer.expectedFunctionExecutionTime;
      dispatch(timerAction.updateSetTime());
      dispatch(timerAction.updatePaceTime());
      dispatch(timerAction.updateExecutionTime(state.timer.timerUpdateInterval));
      if (!state.timer.pause) {
        setTimeout(updateCountdown, Math.max(0, state.timer.timerUpdateInterval - lagTime));
      }
    }
    const state = getState();
    dispatch(timerAction.pauseTimer(false));
    dispatch(timerAction.initialExecutionTime());
    setTimeout(updateCountdown, state.timer.timerUpdateInterval);
  };
};

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

    const [primary, secondary, pyramid] = await Promise.all([
      getJSON(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/main/primary.json?auth=${idToken}`
      ),
      getJSON(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/main/secondary.json?auth=${idToken}`
      ),
      getJSON(
        `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/workouts/main/pyramid.json?auth=${idToken}`
      ),
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
      primary,
      secondary,
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
    timer: timerSlice.reducer,
    user: userSlice.reducer,
    workout: workoutSlice.reducer,
    ui: UISlice.reducer,
    community: communitySlice.reducer,
  },
});

export default store;

const hi = [
  {
    date: "unset",
    difficultyMultiplier: 85.3,
    parts: [
      {
        distance: 800,
        part_ID: "3000_0",
        restMultiplier: 4,
        sets: 3,
        timings: ["temp"],
      },
      {
        distance: 400,
        part_ID: "3000_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3000",
  },
  {
    date: "unset",
    difficultyMultiplier: 85.9,
    parts: [
      {
        distance: 800,
        part_ID: "3001_0",
        restMultiplier: 4,
        sets: 3,
        timings: ["temp"],
      },
      {
        distance: 500,
        part_ID: "3001_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3001",
  },
  {
    date: "unset",
    difficultyMultiplier: 86.5,
    parts: [
      {
        distance: 800,
        part_ID: "3002_0",
        restMultiplier: 4,
        sets: 3,
        timings: ["temp"],
      },
      {
        distance: 600,
        part_ID: "3002_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3002",
  },
  {
    date: "unset",
    difficultyMultiplier: 84.9,
    parts: [
      {
        distance: 1000,
        part_ID: "3003_0",
        restMultiplier: 4.5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 400,
        part_ID: "3003_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3003",
  },
  {
    date: "unset",
    difficultyMultiplier: 85.5,
    parts: [
      {
        distance: 1000,
        part_ID: "3004_0",
        restMultiplier: 4.5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 500,
        part_ID: "3004_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3004",
  },
  {
    date: "unset",
    difficultyMultiplier: 86.1,
    parts: [
      {
        distance: 1000,
        part_ID: "3005_0",
        restMultiplier: 4.5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 600,
        part_ID: "3005_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3005",
  },
  {
    date: "unset",
    difficultyMultiplier: 86.8,
    parts: [
      {
        distance: 1000,
        part_ID: "3006_0",
        restMultiplier: 4.5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 700,
        part_ID: "3006_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3006",
  },
  {
    date: "unset",
    difficultyMultiplier: 87.5,
    parts: [
      {
        distance: 1000,
        part_ID: "3007_0",
        restMultiplier: 4.5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 800,
        part_ID: "3007_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3007",
  },
  {
    date: "unset",
    difficultyMultiplier: 91.9,
    parts: [
      {
        distance: 1200,
        part_ID: "3008_0",
        restMultiplier: 5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 400,
        part_ID: "3008_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3008",
  },
  {
    date: "unset",
    difficultyMultiplier: 92.7,
    parts: [
      {
        distance: 1200,
        part_ID: "3009_0",
        restMultiplier: 5,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 500,
        part_ID: "3009_1",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3009",
  },
  {
    date: "unset",
    difficultyMultiplier: 87.4,
    parts: [
      {
        distance: 1200,
        part_ID: "3010_0",
        restMultiplier: 5,
        sets: 1,
        timings: ["temp"],
      },
      {
        distance: 800,
        part_ID: "3010_1",
        restMultiplier: 4,
        sets: 1,
        timings: ["temp"],
      },
      {
        distance: 400,
        part_ID: "3010_2",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3010",
  },
  {
    date: "unset",
    difficultyMultiplier: 88.5,
    parts: [
      {
        distance: 1200,
        part_ID: "3011_0",
        restMultiplier: 5,
        sets: 1,
        timings: ["temp"],
      },
      {
        distance: 800,
        part_ID: "3011_1",
        restMultiplier: 4,
        sets: 1,
        timings: ["temp"],
      },
      {
        distance: 600,
        part_ID: "3011_2",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3011",
  },
  {
    date: "unset",
    difficultyMultiplier: 81.1,
    parts: [
      {
        distance: 400,
        part_ID: "3012_0",
        restMultiplier: 2,
        sets: 1,
        timings: ["temp"],
      },
      {
        distance: 800,
        part_ID: "3012_1",
        restMultiplier: 4,
        sets: 2,
        timings: ["temp"],
      },
      {
        distance: 400,
        part_ID: "3012_2",
        restMultiplier: 0,
        sets: 1,
        timings: ["temp"],
      },
    ],
    segment: "pyramid",
    type: "Distance Interval",
    workout_ID: "3012",
  },
];
