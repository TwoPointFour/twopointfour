import { createSlice } from "@reduxjs/toolkit";
import { postHTTP, postHTTPNoAuth } from "../Components/Helper/Complementary";
import { API_ROOT_ENDPOINT } from "../Configurations/Config";
import { INTERVAL, UIAction } from "./mainSlice";

const initialTimerState = {
  timerStarted: false,
  trainingDate: "unset",
  timerUpdateInterval: 25,
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
  setTimeElapsed: 0,
  setDistance: "0.000",
  setCount: 1,
  pause: true,
  rest: false,
  workoutTimings: [],
  workoutSetDistances: [],
  workoutRestDistances: [],
  gpsActiveData: [],
  gpsStoredData: [],
};

export const vTvRSlice = createSlice({
  name: "vTvR",
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
      state.setTimeElapsed = 0;
      state.expectedDistance = 0;
      state.setDistance = 0;
      state.setCount = 1;
      state.rest = false;
      state.pause = true;
    },
    updateSetTime(state) {
      if (state.setTime <= 0 && state.setCount < state.permSetCount) {
        state.paceCount = 0;
        state.paceTime = state.permPaceTime - state.timerUpdateInterval;
        state.setTime = state.permSetTime - state.timerUpdateInterval;
        state.setTimeElapsed = state.permSetTime - state.setTime;
        state.rest = false;
        state.distance = 0;
        state.gpsStoredData = [...state.gpsStoredData, state.gpsActiveData];
        state.gpsActiveData = [];
        state.workoutRestDistances = [...state.workoutRestDistances, parseFloat(state.setDistance)];
        state.setDistance = 0;
        state.setCount++;
        console.log(state.workoutRestDistances);
      } else if (state.setCount >= state.permSetCount && state.setTime <= 0) {
        state.setTime = 0;
      } else {
        state.setTime -= state.timerUpdateInterval;
        state.setTimeElapsed = state.permSetTime - state.setTime;
      }

      state.expectedDistance = (state.setTimeElapsed / state.permPaceTime) * 100;
    },
    updatePaceTime(state) {
      if (state.paceTime <= 0 && state.paceCount < state.permPaceCount) {
        state.paceCount++;
        state.distance = state.paceCount * 100;
        state.paceTime = state.permPaceTime - state.timerUpdateInterval;
      } else if (state.paceCount >= state.permPaceCount) {
        state.paceTime = 0;
      } else {
        state.paceTime -= state.timerUpdateInterval;
      }
    },
    pauseTimer(state, action) {
      state.pause = action.payload;
    },
    startTimer(state, action) {
      state.timerStarted = action.payload;
    },
    initialExecutionTime(state) {
      state.expectedFunctionExecutionTime = Date.now() + state.timerUpdateInterval;
    },
    updateExecutionTime(state, action) {
      state.expectedFunctionExecutionTime += action.payload;
    },
    splitTimer(state, action) {
      state.rest = true;
      state.workoutTimings = [...state.workoutTimings, parseFloat(action.payload)];
      state.workoutSetDistances = [...state.workoutSetDistances, parseFloat(state.setDistance)];
      console.log(state.workoutSetDistances);
      state.setDistance = 0;
      state.gpsActiveData = [];
      state.paceCount = state.permPaceCount;
    },
    updateActiveGPS(state, action) {
      state.gpsActiveData = [...state.gpsActiveData, action.payload];
    },
    resetActiveGPS(state) {
      state.gpsActiveData = [];
    },
    updateStoredGPS(state, action) {
      state.gpsStoredData = [...state.gpsStoredData, action.payload];
    },
    updateSetDistance(state, action) {
      state.setDistance = action.payload;
    },
  },
});

export const vTvRAction = vTvRSlice.actions;

export const startvTvR = () => {
  return (dispatch, getState) => {
    function updateCountdown() {
      const state = getState();
      const lagTime = Date.now() - state.vTvR.expectedFunctionExecutionTime;
      dispatch(vTvRAction.updateSetTime());
      dispatch(vTvRAction.updatePaceTime());
      dispatch(vTvRAction.updateExecutionTime(state.vTvR.timerUpdateInterval));
      if (!state.vTvR.pause) {
        setTimeout(updateCountdown, Math.max(0, state.vTvR.timerUpdateInterval - lagTime));
      }
    }
    const state = getState();
    dispatch(vTvRAction.pauseTimer(false));
    dispatch(vTvRAction.startTimer(true));
    dispatch(vTvRAction.initialExecutionTime());
    setTimeout(updateCountdown, state.vTvR.timerUpdateInterval);
  };
};
export const savevTvR = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { idToken, uid, pid } = state.user.authentication;
    const { gpsStoredData, workoutTimings, workoutSetDistances, workoutRestDistances } = state.vTvR;

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "temp",
        buttonPath: "/run",
        status: "loading",
        title: "Loading...",
        description: "Saving your workout on our server...",
      })
    );

    const input = {
      profile_id: pid,
      workout_id: 1002,
      timings: workoutTimings,
      run_distance: workoutSetDistances,
      rest_distance: workoutRestDistances,
      gps_data: gpsStoredData,
      datetime: Date.now(),
    };

    await postHTTP(`${API_ROOT_ENDPOINT}/workoutLog/create/`, idToken, input);

    dispatch(
      UIAction.setModalUIStatus({
        show: true,
        buttonText: "View Workouts",
        buttonPath: "/run",
        status: "success",
        title: "Success!",
        description: "Workout is saved successfully! 🏃‍♂️",
      })
    );
  };
};
