export async function putHTTP(url, input) {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}
export async function postHTTP(url, input) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
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
