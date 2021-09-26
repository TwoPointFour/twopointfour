// AJAX Functions

import { userAction } from "../../store/mainSlice";

export async function getHTTP(url, idToken) {
  const request = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const data = await request.json();
  return data;
}

export async function putHTTP(url, input) {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}
export async function postHTTP(url, idToken, input) {
  const request = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const response = await request.json();

  return response;
}
export async function postHTTPNoAuth(url, input) {
  const request = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(input),
  });

  const response = await request.json();

  return response;
}

export async function deleteHTTP(url, input) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// END AJAX Functions

// Authentication Functions
export function getRefreshToken() {
  const refreshToken = document.cookie
    .split("; ")
    .find((ele) => ele.startsWith("refreshToken"))
    ?.split("=")[1];
  return refreshToken;
}

export async function getIDToken(API_ROOT_ENDPOINT, refreshToken) {
  const idTokenBody = {
    refresh: refreshToken,
  };
  const response = await postHTTPNoAuth(`${API_ROOT_ENDPOINT}/token/refresh`, idTokenBody);
  return response["access"];
}

export async function getUserIDProfileID(API_ROOT_ENDPOINT, idToken) {
  const userData = await getHTTP(`${API_ROOT_ENDPOINT}/user/`, idToken);
  const userID = userData["id"];
  const profileID = userData.profile.id;
  return [userID, profileID];
}

export function updateLocalStateAuthentication(refreshToken, idToken, uid, pid) {
  return function (dispatch) {
    if (refreshToken && idToken && uid) {
      dispatch(
        userAction.updateAuthentication({
          idToken,
          refreshToken,
          uid,
          pid,
        })
      );
    } else if (refreshToken) {
      dispatch(userAction.updateRefreshToken(refreshToken));
    }
  };
}

export async function autoLogin(API_ROOT_ENDPOINT, history, dispatch) {
  const refreshToken = getRefreshToken();
  const idToken = await getIDToken(API_ROOT_ENDPOINT, refreshToken);
  const [uid, pid] = await getUserIDProfileID(API_ROOT_ENDPOINT, idToken);
  dispatch(updateLocalStateAuthentication(refreshToken, idToken, uid, pid));
  history.replace("/run");
}

// END of Authentication Functions

// Mathematical Functions //

export function msToS(ms, float) {
  return parseFloat(ms / 1000).toFixed(float);
}

export function msToSMsArray(ms, float) {
  const seconds = Math.floor(ms / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((ms - seconds * 1000) / 10)
    .toString()
    .padStart(2, "0");
  return [...seconds, ...milliseconds];
}

export function msToMinS(ms) {
  const minutes = Math.floor(ms / (1000 * 60));
  const seconds = Math.floor((ms - minutes * 1000 * 60) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
export function msToMinSArray(ms) {
  const minutes = Math.floor(ms / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms - minutes * 1000 * 60) / 1000)
    .toString()
    .padStart(2, "0");
  return [...minutes, ...seconds];
}

export function msToDate(ms) {
  const dateObj = new Date(ms);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

export function msToTime(ms) {
  const dateObj = new Date(ms);
  return `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")} hrs`;
}

export function distanceFromLatLon([lon1, lat1], [lon2, lat2]) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

export function findCurrentBearing(startLat, startLng, destLat, destLng) {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);
  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

// END of Mathematical Functions //

// addComment(state, action) {
//   const commentID = action.payload.commentID;

//   state.logs[action.payload.workoutID].social.comments = {
//     ...state.logs[action.payload.workoutID].social.comments,
//     commentID: {
//       ...action.payload.commentData,
//     },
//   };
// },
