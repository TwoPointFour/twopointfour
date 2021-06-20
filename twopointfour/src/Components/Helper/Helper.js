/*
Also Jlow wants to implement a way to change the workout scorer and generator both if user chooses his own custom rest time
Commitment per week - if it changes halfway through --> skip workout --> if workout skipped or if current date doesn't match the date the next workout was supposed to happen calculated from date when last workout was done, change currentFitness
See how Yi Hein implemented the currentFitness or suggest the second workout logic - Fix the way we implement workout score, workout difficulty, current fitness and target fitness. Figure out how to update current fitness, whether we are using the proper target fitness calculated from deltaDiff + workoutScore or deltaDiff + workout_difficulty to suggest the next workout, do we need to save current or target fitness

Jlow said high standard deviation (uneven set times) should result in a higher workout score. See results of beta test

Port over to Python

Fitness degradation curve

edge cases - 20 min current vs 10 target --> suggest easier workout in the sense that he does smaller distances --> add easier workouts <-- also set a hardcoded ceiling dlifficultyMultiplier that warns user that the workout is too hard, do the workout at their own risk <-- see long-ass WA discussion

cycles of 3

convert Jlow's fillerworkout notes to unit tests

Some no-gos
1. The average time is more than 5% off the goal pace but the workout score is more than 95
2. The workout score exceeds 120(unless the values are ridiculous)
3. The training times/variance are not a realistic number(like 90s SD for 500m trainings)

Improve on overall fitness calculator

suggest pyramid workout

implement something like a linked list for filler workouts instead of the stupid 'end' field and having multiple objects

need to save goal and tempo pace as well

Avoid suggesting a workout that is too close to the IPPT date

Migrate database from weeks to timestamp for existing users

Original interval workout code suggester to use timestamp

Workout Frequency is 0 < x <= 3

Save the date of the first interval workout, change number of weeks to specific date

Basically we also need to regenerate the suggested workout everytime the user logs in, since the current date will change

Upon previous filler workout success

In fartlek workouts, rename goalPace to targetPace

Create endpoint for JLOW to upload file and test algorithm
 */

// All constants below TBC
const rho = 7.0;
// tePace, ltPace, vPace, stPace
const phi = [1, 1, 1, 1];
const paceConstants = [1.243, 1.19, 1.057, 0.89];
const deltas = [0.41, 0.49, 0.55, 0.65, 0.73];

const getPace = (time) => time / 2400;
const convertSecToHour = (timeInSec) => timeInSec / (60 * 60);
export const getTargetPaces = (targetTime) => {
  const targetPace = getPace(targetTime);
  const displayPace = Math.floor(targetPace * 100 * 1000);
  return {targetPace, displayPace}
}
const convertToVelocity = (currentTime) => 2.4 / convertSecToHour(currentTime);
export const getPrescribedRest = (restMultiple, targetPace) => Math.round((restMultiple * targetPace * 100) / 5) * 5;
const restRatio = (restMultiple, targetPace) =>
  getPrescribedRest(restMultiple, targetPace) / (restMultiple * targetPace * 100);
const restMultiplier = (workout, targetPace) => 1 / Math.exp(0.0024 * restRatio(workout.parts[0]["restMultiplier"], targetPace));
const convertToSeconds = (input) => {
  return input.split(":").reduce((acc, ele, i) => {
    if (i === 0) {
      return acc + Number(ele * 60);
    } else return acc + Number(ele);
  }, 0);
}
const sanitiseWeekDateStamp = (timestamp) => timestamp - (timestamp % 86400000)

const getOverallFitness = (speedDifficulty, targetPace, duration, currentFitness, previousWorkout) => {
  const deltaDifficulty = speedDifficulty - 100;
  const deltaDifficultyPerWeek = deltaDifficulty / duration;
  if (Object.keys(previousWorkout).length < 1) return {newFitness: 100, targetDifficulty: 100 + deltaDifficultyPerWeek};
  //todo if workout large success, use all the previous workouts
  const previousWorkoutScore = scoredWorkouts(previousWorkout);
  if (previousWorkoutScore.workoutScore < 94) {
    return {newFitness: currentFitness, targetDifficulty: currentFitness + deltaDifficultyPerWeek};
  }

  return {
    newFitness: previousWorkout.personalisedDifficultyMultiplier,
    targetDifficulty: previousWorkout.personalisedDifficultyMultiplier + deltaDifficultyPerWeek,
  };
};

const checkDiff = (diffs, diff) => {
  if (diffs[diff]) {
    return diffs[diff];
  }
  return 100;
};

const getDiffs = (velocityToCompare, velocities, intermediateFunc, x = 1, differences = {}) => {
  let diffs = {};
  const [teVelocity, ltVelocity, vVelocity, stVelocity] = velocities;
  if (velocityToCompare < teVelocity) {
    diffs.teDiff =
      checkDiff(differences, "teDiff") +
      x * (deltas[0] * teVelocity * Math.exp(teVelocity - velocityToCompare));
  } else if (velocityToCompare < ltVelocity) {
    diffs.teDiff =
      checkDiff(differences, "teDiff") -
      x * intermediateFunc(deltas[1], teVelocity, velocityToCompare);
  } else if (velocityToCompare < vVelocity) {
    diffs.ltDiff =
      checkDiff(differences, "ltDiff") -
      x * intermediateFunc(deltas[2], ltVelocity, velocityToCompare);
  } else if (velocityToCompare < stVelocity) {
    diffs.vDiff =
      checkDiff(differences, "vDiff") -
      x * intermediateFunc(deltas[3], vVelocity, velocityToCompare);
    // console.log(checkDiff(differences, 'vDiff'))
  } else {
    diffs.stDiff =
      checkDiff(differences, "stDiff") -
      x * intermediateFunc(deltas[4], stVelocity, velocityToCompare);
  }
  return diffs;
};

export const getSpeedDifficulty = (currentVelocity, targetVelocity, velocities) => {
  //todo why so many diffs. floating around? get rid of them
  const [teVelocity, ltVelocity, vVelocity, stVelocity] = velocities;
  const intermediateFunc = (delta, velocityOne, velocityTwo) =>
    delta * velocityOne * Math.exp(velocityTwo - velocityOne);
  const diffs = getDiffs(currentVelocity, velocities, intermediateFunc);
  while (Object.keys(diffs).length < 4) {
    if (diffs.teDiff && !diffs.ltDiff) {
      diffs.ltDiff = diffs.teDiff + intermediateFunc(deltas[1], teVelocity, ltVelocity);
    }
    if (diffs.ltDiff && !(diffs.teDiff && diffs.vDiff)) {
      if (!diffs.teDiff) {
        diffs.teDiff = diffs.ltDiff - intermediateFunc(deltas[1], teVelocity, ltVelocity);
      }
      if (!diffs.vDiff) {
        diffs.vDiff = diffs.ltDiff + intermediateFunc(deltas[2], ltVelocity, vVelocity);
      }
    }
    if (diffs.vDiff && !(diffs.ltDiff && diffs.stDiff)) {
      if (!diffs.ltDiff) {
        diffs.ltDiff = diffs.vDiff - intermediateFunc(deltas[2], ltVelocity, vVelocity);
      }
      if (!diffs.stDiff) {
        diffs.stDiff = diffs.vDiff + intermediateFunc(deltas[3], vVelocity, stVelocity);
      }
    }
    if (diffs.stDiff && !diffs.vDiff) {
      diffs.vDiff = diffs.stDiff - intermediateFunc(deltas[3], vVelocity, stVelocity);
    }
  }
  const finalDiffs = getDiffs(targetVelocity, velocities, intermediateFunc, -1, diffs);
  if (Object.values(finalDiffs).length === 1) {
    return Object.values(finalDiffs)[0];
  }
  return 0;
};

export const generateConstants = (questionnaireData) => {
  //todo verify personalbests below
  const beta = questionnaireData.regular ? 1 : 0.975;
  const alpha = Math.max(
    0,
    Math.min(
      1,
      (1 / 3) *
      beta *
      ((questionnaireData.frequency * questionnaireData.distance) / 30 +
        questionnaireData.experience / 36 +
        questionnaireData.frequency / 3)
    )
  );
  /* old code
      Math.min(
      1,
      (1 / 3) *
        beta *
        ((answers.fFrequency * answers.dDistance) / 30 +
          answers.lMonths / 36 +
          answers.fFrequency / 3)
    )
  );
   */
  const cNewbieGains = (1 / rho) * Math.exp(1 - alpha) + (rho - 1) / rho;
  return {alpha, beta, cNewbieGains};
};

const getBestTrainingPlan = (trainingPlanPrimary, trainingPlanSecondary) =>
  trainingPlanPrimary[0] > trainingPlanSecondary[0] &&
  trainingPlanPrimary[0] - trainingPlanSecondary[0] < 3 &&
  trainingPlanPrimary[1]["personalisedDifficultyMultiplier"] <
  trainingPlanSecondary[1]["personalisedDifficultyMultiplier"];

export function getUserInfo(questionnaireData, previousFitness) {
  const {duration, workoutFrequency} = questionnaireData
  //todo fix currentFitness
  return {
    currentTime: convertToSeconds(questionnaireData.latest),
    targetTime: convertToSeconds(questionnaireData.target),
    duration,
    workoutFrequency,
    currentFitness: previousFitness,
  };
}

const getPaces = (targetPace, cNewbieGains) => phi.map((phiValue, i) => targetPace * paceConstants[i] * cNewbieGains * phiValue)
export const getVelocities = (targetPace, cNewbieGains) => getPaces(targetPace, cNewbieGains).map((pace) => (1 / pace) * 3.6);

export const generateTrainingPlans = (speedDifficulty, targetPace, userInfo, primary, secondary, previousWorkout) => {
  const {newFitness, targetDifficulty} = getOverallFitness(
    speedDifficulty,
    targetPace,
    userInfo.duration,
    userInfo.currentFitness,
    previousWorkout,
  );
  const mapper = (workout) => {
    const temp = JSON.parse(JSON.stringify(workout));
    temp.personalisedDifficultyMultiplier =
      (speedDifficulty / 100) * workout.difficultyMultiplier * restMultiplier(workout, targetPace); // * 100
    return temp;
  };
  const reducer = (variance, workout) => {
    const workoutVariance = Math.abs(workout.personalisedDifficultyMultiplier - targetDifficulty);
    if (workoutVariance > variance[0]) {
      return variance;
    }
    return [workoutVariance, workout]; //return [workoutVariance, ...workout];
  };
  const primaryIntervalsCopy = primary.map(mapper);
  const secondaryIntervalsCopy = secondary.map(mapper);
  const trainingPlanPrimary = primaryIntervalsCopy.reduce(reducer, [10000]);
  const trainingPlanSecondary = secondaryIntervalsCopy.reduce(reducer, [trainingPlanPrimary[1]]);
  return {trainingPlanPrimary, trainingPlanSecondary, newFitness};
}

const getIntervalTrainingPlan = (targetPace, cNewbieGains, userInfo, primary, secondary, previousWorkout, displayPace) => {
  const velocities = getVelocities(targetPace, cNewbieGains);
  // velocities in km/hr, paces in s/m
  const speedDifficulty = getSpeedDifficulty(convertToVelocity(userInfo.currentTime), convertToVelocity(userInfo.targetTime), velocities); // getSpeedDifficulty(currentVelocity, paces);
  const {
    trainingPlanPrimary,
    trainingPlanSecondary,
    newFitness
  } = generateTrainingPlans(speedDifficulty, targetPace, userInfo, primary, secondary, previousWorkout);
  console.log(JSON.stringify(trainingPlanPrimary), JSON.stringify(trainingPlanSecondary))
  let trainingPlan = getBestTrainingPlan(trainingPlanPrimary, trainingPlanSecondary)
    ? trainingPlanSecondary[1]
    : trainingPlanPrimary[1];
  trainingPlan.parts[0]["rest"] = getPrescribedRest(trainingPlan.parts[0]["restMultiplier"], targetPace);
  trainingPlan.parts[0]["pace"] = displayPace
  return {newFitness, trainingPlan};
}

const readJSON = async (name) => {
  return fetch("./" + name + ".json")
    .then(async response => {
      return await response.json();
    })
}

const getRoundedDistance = (time, tempoPace) => Math.ceil((time * 60 / tempoPace) / 0.5) * 0.5;

const getFartlekWorkout = (fillerWorkout, tempoPace, targetPace) => {
  let jogTime, jogDistance, jogPace
  const {sprintDistance} = fillerWorkout.parts[0]
  const jogPaceFunction = (jogPaceString) => new Function('tempoPace', jogPaceString)
  if (fillerWorkout.parts[0].jogByTime) {
    jogTime = fillerWorkout.parts[0].jogByTime
    jogPace = jogPaceFunction(fillerWorkout.parts[0].jogPace)(tempoPace)
    jogDistance = jogTime / jogPace
  } else if (fillerWorkout.parts[0].jogByDistance) {
    jogDistance = fillerWorkout.parts[0].jogByDistance
    jogPace = jogPaceFunction(fillerWorkout.parts[0].jogPace)(tempoPace)
    jogTime = jogDistance * jogPace
  }
  const sprintPaceFunction = (sprintPaceString) => new Function('targetPace', sprintPaceString)
  const sprintPace = sprintPaceFunction(fillerWorkout.parts[0].sprintPace)(targetPace)
  return { //pace in s/m, distance in m, time in s
    sprintDistance,
    jogTime,
    jogPace,
    sprintPace,
    jogDistance
  }
}

const getFartlekTrainingPlan = async (alpha, weekNumber, tempoPace, targetPace) => {
  // const fartlek = require('./fartlek.json')
  const fartlek = await readJSON('fartlek')
  for (let i = 0; i < fartlek.length; i++) {
    const fillerWorkout = fartlek[i]
    if (alpha < parseFloat(fillerWorkout.alpha)) {
      if (weekNumber === parseFloat(fillerWorkout.parts[0].weekAt)) {
        return {...getFartlekWorkout(fillerWorkout, tempoPace, targetPace), sprintSets: fillerWorkout.parts[0].sprintSets}
      }
      if (weekNumber > fillerWorkout.parts[0].weekAt && fillerWorkout.parts[0].end) {
        if (alpha < 0.8) {
          const sprintSets = fillerWorkout.parts[0].sprintSets + weekNumber - fillerWorkout.parts[0].weekAt
          return {...getFartlekWorkout(fillerWorkout, tempoPace, targetPace), sprintSets}
        }
        const fartlekWorkout = getFartlekWorkout(fillerWorkout, tempoPace, targetPace)
        const newSprintPace = fartlekWorkout.sprintPace - (weekNumber - fillerWorkout.parts[0].weekAt) * 0.00250
        return {...fartlekWorkout, sprintPace: newSprintPace, sprintSets: fillerWorkout.parts[0].sprintSets}
      }
    }
  }
}

const getLongDistanceTrainingPlan = async (alpha, weekNumber, tempoPace) => {
  // const longDistance = require('./longDistance.json')
  const longDistance = await readJSON('longDistance')
  for (let i = 0; i < longDistance.length; i++) {
    const fillerWorkout = longDistance[i]
    if (alpha < parseFloat(fillerWorkout.alpha)) {
      if (weekNumber === parseFloat(fillerWorkout.parts[0].weekAt)) {
        const convertedTempoPace = tempoPace * 1000
        return { //runTime in min, tempoPace in s/m, distance in km
          runTime: fillerWorkout.parts[0].runTime,
          tempoPace,
          distance: getRoundedDistance(fillerWorkout.parts[0].runTime, convertedTempoPace)
        }
      }
      if (weekNumber > fillerWorkout.parts[0].weekAt && fillerWorkout.parts[0].end) {
        const convertedTempoPace = tempoPace * 1000
        const tempoPaceNew = convertedTempoPace - (weekNumber - fillerWorkout.parts[0].weekAt) * 3
        const runTime = fillerWorkout.parts[0].runTime
        const distance = getRoundedDistance(runTime, tempoPaceNew)
        return {distance, runTime, tempoPace: tempoPaceNew / 1000}
      }
    }
  }
}

const getWeeksAndStartDate = (firstWorkoutTimestamp, currentDatestamp) => {
  let numberOfWeeksElapsed = 0
  let weekStartDatestamp = firstWorkoutTimestamp
  while (weekStartDatestamp < currentDatestamp) {
    numberOfWeeksElapsed++
    weekStartDatestamp += (604800000 * numberOfWeeksElapsed)
  }
  return {numberOfWeeksElapsed, weekStartDatestamp}
}

const getNextDate = (dateToCompare, previousWorkoutDate) => {
  if ((dateToCompare - sanitiseWeekDateStamp(previousWorkoutDate)) < 86400000) return dateToCompare + 86400000
  return dateToCompare
}

const getSuggestedDate = (userInfo, previousWorkout) => {
  const sanitisedCurrentDatestamp = sanitiseWeekDateStamp(Date.now())
  const {ipptDatestamp} = userInfo
  //below for if close to IPPT date
  if ((sanitiseWeekDateStamp(ipptDatestamp) - sanitisedCurrentDatestamp) < (86400000 * 2)) return null
  if (!!(previousWorkout.workout_ID.match(/^4]/)[0])) {
    const firstWorkoutTimestamp = parseInt('1622542227000')
    const currentDatestamp = Date.now()
    let {numberOfWeeksElapsed} = getWeeksAndStartDate(firstWorkoutTimestamp, currentDatestamp)
    const nextWeekStart = sanitiseWeekDateStamp((604800000 * (numberOfWeeksElapsed + 1)) + firstWorkoutTimestamp)
    return getNextDate(nextWeekStart, previousWorkout.date)
  }
  return getNextDate(sanitisedCurrentDatestamp, previousWorkout.date)
}

const getOneOfTHreeTrainingPlan = (targetPace, cNewbieGains, userInfo, primary, secondary, previousWorkout, displayPace, alpha) => {
  const firstWorkoutTimestamp = parseInt('1622542227000')
  const {workoutFrequency, ipptDatestamp} = userInfo
  const currentDatestamp = Date.now()
  userInfo.duration = 8//todo Math.floor(ipptDatestamp - currentDatestamp)
  const previousWorkoutDatestamp = previousWorkout.date
  console.log('in function oneOFthre', previousWorkout.workout_ID)
  let {numberOfWeeksElapsed, weekStartDatestamp} = getWeeksAndStartDate(firstWorkoutTimestamp, currentDatestamp)
  weekStartDatestamp = sanitiseWeekDateStamp(weekStartDatestamp)
  const nextWeekStart = sanitiseWeekDateStamp((604800000 * (numberOfWeeksElapsed + 1)) + firstWorkoutTimestamp)
  const tempoPace = getPaces(targetPace, cNewbieGains)[0]
  const isPreviousWorkoutIntervalWorkout = !!(previousWorkout.workout_ID.match(/^[123]/)[0])
  if ((ipptDatestamp - currentDatestamp) < 604800000) {
    if (isPreviousWorkoutIntervalWorkout) return getLongDistanceTrainingPlan(alpha, numberOfWeeksElapsed, tempoPace)
    return getFartlekTrainingPlan(alpha, numberOfWeeksElapsed, tempoPace, targetPace)
  }
  if (workoutFrequency === 1 || !(Object.keys(previousWorkout).length > 0)) return getIntervalTrainingPlan(targetPace, cNewbieGains, userInfo, primary, secondary, previousWorkout, displayPace);
  if (workoutFrequency === 2) {
    if (isPreviousWorkoutIntervalWorkout && previousWorkoutDatestamp > weekStartDatestamp && currentDatestamp < nextWeekStart) return getLongDistanceTrainingPlan()
  }
  if (workoutFrequency === 3) {
    if (previousWorkoutDatestamp > weekStartDatestamp && currentDatestamp < nextWeekStart) {
      if (isPreviousWorkoutIntervalWorkout) return getLongDistanceTrainingPlan(alpha, numberOfWeeksElapsed, tempoPace)
      return getFartlekTrainingPlan(alpha, numberOfWeeksElapsed, tempoPace, targetPace)
    }
  }
  return getIntervalTrainingPlan(targetPace, cNewbieGains, userInfo, primary, secondary, previousWorkout, displayPace)
}

export const getTrainingPlan = (questionnaireData, workouts, previousWorkout = {}, previousFitness = 100) => {
  const [primary, secondary, pyramid, longDistance, fartlek] = workouts
  if (questionnaireData.regular) {
    //TBC logic
  }
  const userInfo = getUserInfo(questionnaireData, previousFitness);
  const {alpha, beta, cNewbieGains} = generateConstants(questionnaireData);
  const {targetPace, displayPace} = getTargetPaces(userInfo.targetTime);
  // add logic here to decide if we're doing intervals
  console.log(previousWorkout.workout_ID)
  const suggestedDate = getSuggestedDate(targetPace, cNewbieGains, userInfo, primary, secondary, previousWorkout, displayPace)
  const {
    newFitness,
    trainingPlan
  } = getOneOfTHreeTrainingPlan(targetPace, cNewbieGains, userInfo, primary, secondary, previousWorkout, displayPace, alpha);
  return {newFitness, trainingPlan, suggestedDate};
};

export async function getJSON(url) {
  try {
    const raw = await fetch(url);
    return await raw.json();
  } catch (error) {
    throw error;
  }
}

const testObj = {
  permSetCount: "9",
  permDistance: "300",
  timings: ["63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
  permPaceTime: "21250", //in ms
};

const myResults = {
  difficultyMultiplier: 69,
  personalisedDifficultyMultiplier: 119,
  segment: "secondary",
  type: "Distance Interval",
  workout_ID: "2003",
  parts: [
    {
      part_ID: "2003_0",
      distance: 400,
      pace: 25000,
      rest: 60,
      restMultiplier: 2.33,
      sets: 7,
      timings: [125000, 110000, 120000, 108000, 102000, 123333],
    },
  ],
};

//todo get rid of the retarded parseFloat all over the place
const getMissed = (previousWorkout) =>
  previousWorkout.parts[0]["sets"] - previousWorkout.parts[0]["timings"].length;

const getAverageTime = (previousWorkout) => {
  // in seconds
  const timings = previousWorkout.parts[0]["timings"];
  return (
    timings.reduce((total, setTime) => total + parseFloat(setTime), 0) /
    previousWorkout.parts[0]["timings"].length
  );
};

const getStandardDeviation = (previousWorkout) => {
  const mean = getAverageTime(previousWorkout); // in ms
  return Math.sqrt(
    previousWorkout.parts[0]["timings"]
      .map((set) => Math.pow(set - mean, 2))
      .reduce((total, value) => total + value, 0) / previousWorkout.parts[0]["timings"].length
  );
};

const getGoalSetTime = (
  previousWorkout // in ms
) =>
  (parseFloat(previousWorkout.parts[0]["pace"]) *
    parseFloat(previousWorkout.parts[0]["distance"])) /
  100;

//todo confirm values
const kValue = 0.25;
const yValue = 1.25;

const penaliseMissed = (missed, previousWorkout) =>
  (Math.exp(missed / parseFloat(previousWorkout.parts[0]["sets"])) - 1) * yValue;

const getWorkoutScore = (previousWorkout) => {
  if (!previousWorkout.parts[0]["timings"].length) {
    return {goalTimePerSet: 0, averageTime: 0, standardDeviation: 0, missed: 0, workoutScore: 0};
  }
  const goalTimePerSet = getGoalSetTime(previousWorkout); // in ms
  const averageTime = getAverageTime(previousWorkout); // in ms
  const standardDeviation = getStandardDeviation(previousWorkout);
  const missed = getMissed(previousWorkout); // integer value
  const workoutScore =
    100 *
    (goalTimePerSet / averageTime +
      (Math.exp(standardDeviation / goalTimePerSet) - 1) * kValue -
      penaliseMissed(missed, previousWorkout));
  return {workoutScore}; // {goalTimePerSet, averageTime, standardDeviation, missed, workoutScore}
};

export const scoredWorkouts = (previousWorkout) => getWorkoutScore(previousWorkout);

// const testObj = {
//   userProfile: {
//     displayName: "Elon Musk",
//     email: "chaiyihein@gmail.com",
//     bio: "I like running!",
//     dp: "https://techcrunch.com/wp-content/uploads/2021/01/GettyImages-1229901940.jpg?w=730&crop=1",
//     badges: ["Top Runner", "5K Finisher", "IPPT Gold"],
//   },
//   workout: {
//     date: Date.now(),
//     difficultyMultiplier: 91,
//     review: {
//       feeling: "good",
//       reflection: "This was one of the toughest training I have faced in a long time.",
//     },
//     parts: [
//       {
//         distance: 300,
//         pace: 25000,
//         part_ID: "1006_0",
//         rest: 115,
//         restMultiplier: 4.5,
//         sets: 8,
//         timings: [82000, 207000, 83000, 79430, 78236],
//       },
//     ],
//     personalisedDifficultyMultiplier: 160.0173922309409,
//     segment: "primary",
//     type: "Distance Interval",
//     workout_ID: "1006",
//     feeling: "good",
//   },
//   comments: {
//     adfalksdfh: {
//       time: Date.now(),
//       text: "Daddy Musk is the best!",
//       userProfile: {
//         displayName: "X Æ A-12",
//         email: "lizzy@gmail.com",
//         bio: "I am human!!! MUHAHAHA",
//         badges: ["Baby Musk", "Best Name", "5m Finisher"],
//         dp: "https://static.scientificamerican.com/blogs/cache/file/7069F0BB-A9AB-4932-84F508BBC0136458_source.jpg?w=590&h=800&F754D658-CE37-41EE-BE2C0EFC7134D582",
//       },
//     },
//   },
// };