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

export function msToS(ms, float) {
  return parseFloat(ms / 1000).toFixed(float);
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

// addComment(state, action) {
//   const commentID = action.payload.commentID;

//   state.logs[action.payload.workoutID].social.comments = {
//     ...state.logs[action.payload.workoutID].social.comments,
//     commentID: {
//       ...action.payload.commentData,
//     },
//   };
// },
