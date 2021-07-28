import { createSlice } from "@reduxjs/toolkit";
import { initialTimerState, INTERVAL } from "./mainSlice";

const fTfRSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    initialiseTimer(state, action) {
      state.trainingDate = Date.now();
      state.permSetCount = action.payload.sets;
      state.setCount = 1;
      state.permDistance = action.payload.distance;
      state.permRestTime = action.payload.restTime;
      state.restTime = action.payload.restTime;
      state.restElapsed = 0;
      state.permSetTime = action.payload.setTime;
      state.setTime = action.payload.setTime;
      state.setElapsed = 0;
      state.pace = action.payload.pace;
      state.expectedDistance = 0;
      state.rest = false;
      state.pause = true;
    },
    updateSetTime(state) {
      if (state.setCount > state.permSetCount) return;
      if (state.rest === false) {
        state.setElapsed += INTERVAL;
        state.setTime -= INTERVAL;
      } else if (state.rest === true && state.restTime > 0) {
        state.restTime -= INTERVAL;
        state.restElapsed += INTERVAL;
      } else {
        state.rest = false;
        state.setCount += 1;
        state.setElapsed = INTERVAL;
        state.setTime = state.permSetTime - INTERVAL;
      }

      state.expectedDistance = (state.setTimeElpased / state.permPaceTime) * 100;
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
      state.restTime = state.setTime - state.setTimeElpased;
      state.rest = true;
    },
    updateActiveGPS(state, action) {
      state.gpsActiveData = action.payload;
    },
    updateStoredGPS(state, action) {
      state.gpsStoredData = [...state.gpsStoredData, action.payload];
    },
  },
});

export const fTfRAction = fTfRSlice.actions;

export const startfTfR = () => {
  return (dispatch, getState) => {
    function updateCountdown() {
      const state = getState();
      const lagTime = Date.now() - state.timer.expectedFunctionExecutionTime;
      dispatch(fTfRAction.updateSetTime());
      dispatch(fTfRAction.updateExecutionTime(state.timer.timerUpdateInterval));
      if (!state.timer.pause) {
        setTimeout(updateCountdown, Math.max(0, state.timer.timerUpdateInterval - lagTime));
      }
    }
    const state = getState();
    dispatch(fTfRAction.pauseTimer(false));
    dispatch(fTfRAction.initialExecutionTime());
    setTimeout(updateCountdown, state.timer.timerUpdateInterval);
  };
};
