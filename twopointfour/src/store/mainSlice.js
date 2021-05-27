import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { postHTTP, putHTTP, deleteHTTP } from "../Components/Helper/Complementary";
import { getJSON, getTrainingPlan } from "../Components/Helper/Helper";

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
      console.log(current(state));
    },
    showModal(state, action) {
      state.modal.show = action.payload;
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
      console.log(current(state));
    },
    deleteComment(state, action) {
      delete state.logs[action.payload.workoutID].social.comments[action.payload.commentID];
      console.log(current(state));
    },
    addComment(state, action) {
      state.logs[action.payload.workoutID].social.comments = {
        ...state.logs[action.payload.workoutID].social.comments,
        [action.payload.commentID]: {
          ...action.payload.commentData,
        },
      };
      console.log(current(state));
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
  pause: false,
  rest: false,
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
      console.log("Timer initialised!");
      state.trainingDate = Date.now();
      state.permSetCount = action.payload.parts[0].sets;
      state.permDistance = action.payload.parts[0].distance;
      state.permPaceTime = action.payload.parts[0].pace;
      state.permSetTime = 30000000;
      state.permRestTime = action.payload.parts[0].rest * 1000;
      state.permPaceCount = parseInt(action.payload.parts[0].distance / 100);
      state.distance = 0;
      state.paceTime = action.payload.parts[0].pace;
      state.paceCount = 0;
      state.setTime = 30000000;
      state.setTimeElpased = 0;
      state.setCount = 1;
      state.workoutData.workout_ID = action.payload.workout_ID;
      state.workoutData.type = action.payload.type;
      state.workoutData.segment = action.payload.segment;
      state.workoutData.difficultyMultiplier = action.payload.difficultyMultiplier;
      state.workoutData.personalisedDifficultyMultiplier =
        action.payload.personalisedDifficultyMultiplier;
      state.workoutData.parts[0] = { ...action.payload.parts[0], timings: [] };
      state.workoutData.date = Date.now();
      console.log(current(state));
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
  },
  userProfile: {
    email: "",
    displayName: "",
    bio: "",
    dp: "",
    uid: "",
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
      console.log(current(state));
    },
    updateUserProfile(state, action) {
      state.userProfile.email = action.payload.email;
      state.userProfile.displayName = action.payload.displayName;
      state.userProfile.bio = action.payload.bio;
      state.userProfile.dp = action.payload.dp;
      state.userProfile.uid = action.payload.uid;
      console.log(current(state));
    },
    updateQuestionnaire(state, action) {
      state.questionnaire = action.payload;
      console.log(current(state));
    },
  },
});

export const userAction = userSlice.actions;

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

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/questionnaire.json?auth=${idToken}`,
      input
    );

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Clearing any previous records...",
      })
    );

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/previousWorkout.json?auth=${idToken}`,
      ""
    );

    dispatch(userAction.updateQuestionnaire);

    /////////////////////////////

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Downloading available workouts...",
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

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description:
          "Analysing your questionnaire responses and running our advanced workout suggestion algorithm...",
      })
    );

    const { newFitness, trainingPlan: training } = getTrainingPlan(input, primary, secondary);

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

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/currentFitness.json?auth=${idToken}`,
      newFitness
    );
    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/nextWorkout.json?auth=${idToken}`,
      training
    );

    dispatch(workoutAction.setCurrentFitness(newFitness));

    dispatch(workoutAction.setNextWorkout(training));

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "View Workouts",
        buttonPath: "/run",
        status: "success",
        title: "Success!",
        description: "Personalised workout found! View your next workout now! 🏃‍♂️",
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

    console.log(workoutID);

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

    console.log(previousFitnessAvailable && previousWorkout);

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
      previousFitnessAvailable && previousWorkout,
      previousFitnessAvailable && previousFitness
    );

    await putHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/currentFitness.json?auth=${idToken}`,
      newFitness
    );

    // dispatch(workoutAction.setCurrentFitness(newFitness));

    console.log("currentFitness sent!!!");

    console.log("Sending next training...");

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
    console.log("Sending Data...");
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
    console.log("Data sent!");
  };
};

export const updateUserProfileHTTP = (input) => {
  return async (dispatch, getState) => {
    const state = getState().user.authentication;
    const idToken = state.idToken;
    const uid = state.uid;

    const userProfileInfo = {
      email: input.email,
      bio: input.bio,
      displayName: input.displayName,
      dp: input.dp,
      uid: input.uid,
    };

    dispatch(userAction.updateUserProfile(userProfileInfo));

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

    await fetch(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/userProfile.json?auth=${idToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfileInfo),
      }
    );

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
  };
};

export function logout() {
  return (dispatch) => {
    document.cookie = `idToken=""; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    document.cookie = `uid=""; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    // document.cookie = null;
    console.log(document.cookie);
    dispatch(userAction.updateAuthentication({ idToken: null, uid: null }));
  };
}

export const initialiseData = () => {
  return async (dispatch, getState) => {
    const state = getState().user.authentication;
    const idToken = state.idToken;
    const uid = state.uid;
    dispatch(UIAction.setMainUIStatus({ status: "loading" }));

    const userData = await getJSON(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}.json?auth=${idToken}`
    );

    console.log(userData);

    dispatch(workoutAction.setWorkoutData(userData.workouts));

    dispatch(userAction.updateUserProfile(userData.userProfile));

    dispatch(userAction.updateQuestionnaire(userData.questionnaire));

    dispatch(UIAction.setMainUIStatus({ status: "success" }));

    console.log(getState());
  };
};

export const sendPrivateComment = (commentData, workoutID) => {
  return async (dispatch, getState) => {
    console.log("Thunk activated!");
    const { idToken, uid } = getState().user.authentication;

    const { name: commentID } = await postHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/logs/${workoutID}/social/comments.json?auth=${idToken}`,
      commentData
    );

    dispatch(workoutAction.addComment({ workoutID, commentID, commentData }));

    // const workoutData = await getJSON(
    //   `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts.json?auth=${idToken}`
    // );

    // console.log(workoutData);

    // dispatch(workoutAction.setWorkoutData(workoutData));
  };
};
export const deleteComment = (workoutID, commentID) => {
  return async (dispatch, getState) => {
    const { idToken, uid } = getState().user.authentication;

    await deleteHTTP(
      `https://twopointfour-c41d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/workouts/logs/${workoutID}/social/comments/${commentID}.json?auth=${idToken}`
    );

    console.log(workoutID, commentID);

    dispatch(workoutAction.deleteComment({ workoutID, commentID }));
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

const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
    user: userSlice.reducer,
    workout: workoutSlice.reducer,
    ui: UISlice.reducer,
  },
});

export default store;
