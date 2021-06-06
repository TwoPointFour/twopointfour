// All constants below TBC
const rho = 7.0;
// tePace, ltPace, vPace, stPace
const phi = [1, 1, 1, 1];
const paceConstants = [1.243, 1.19, 1.057, 0.89];
const deltas = [0.41, 0.49, 0.55, 0.65, 0.73];

const getPace = (time) => time / 2400;
const convertSecToHour = (timeInSec) => timeInSec / (60 * 60);
const getTargetPaces = (targetTime) => {
  const targetPace = getPace(targetTime);
  const displayPace = Math.floor(targetPace * 100 * 1000);
  return {targetPace, displayPace}
}
const convertToVelocity = (currentTime) => 2.4 / convertSecToHour(currentTime);
const getPrescribedRest = (restMultiple, targetPace) => Math.round((restMultiple * targetPace * 100) / 5) * 5;
const restRatio = (restMultiple, targetPace) =>
    getPrescribedRest(restMultiple, targetPace) / (restMultiple * targetPace * 100);
const addZeroSecNew = (numChange) => numChange.toString().padStart(2, "0");
const toMinutesSeconds = (milliseconds) => {
  const minutes = Math.floor(milliseconds / (1000 * 60))
  return [minutes, Math.floor((milliseconds - minutes * 1000 * 60) / 1000)];
}
const restMultiplier = (workout) => 1 / Math.exp(0.0024 * restRatio(workout.parts[0]["restMultiplier"]));
const convertToSeconds = (input) => {
  return input.split(":").reduce((acc, ele, i) => {
    if (i === 0) {
      return acc + Number(ele * 60);
    } else return acc + Number(ele);
  }, 0);
}

const getOverallFitness = (speedDifficulty, targetPace, weeks, currentFitness, previousWorkout) => {
  const deltaDifficulty = speedDifficulty - 100;
  const deltaDifficultyPerWeek = deltaDifficulty / weeks;
  if (!previousWorkout) return { currentFitness: 100, nextFitness: 100 + deltaDifficultyPerWeek };
  //todo if workout large success, use all the previous workouts
  const previousWorkoutScore = scoredWorkouts(previousWorkout);
  if (previousWorkoutScore.workoutScore < 94) {
    return { newFitness: currentFitness, targetDifficulty: currentFitness + deltaDifficultyPerWeek };
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

const getSpeedDifficulty = (currentVelocity, targetVelocity, velocities) => {
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

const generateConstants = (questionnaireData) => {
  //todo verify personalbests below
  const beta = answers.personalBests ? 1 : 0.975;
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
  return { alpha, beta, cNewbieGains };
};

const getBestTrainingPlan = (trainingPlanPrimary, trainingPlanSecondary) =>
    trainingPlanPrimary[0] > trainingPlanSecondary[0] &&
    trainingPlanPrimary[0] - trainingPlanSecondary[0] < 3 &&
    trainingPlanPrimary[1]["personalisedDifficultyMultiplier"] <
    trainingPlanSecondary[1]["personalisedDifficultyMultiplier"];

function getUserInfo(questionnaireData, previousFitness) {
  const userInfo = {
    currentTime: convertToSeconds(questionnaireData.latest),
    targetTime: convertToSeconds(questionnaireData.target),
    weeks: questionnaireData.duration,
    currentFitness: previousFitness,
  };
  //todo fix currentFitness
  return userInfo;
}

const getVelocities =(targetPace, cNewbieGains) =>
    phi.map((phiValue, i) => targetPace * paceConstants[i] * cNewbieGains * phiValue).map((pace) => (1 / pace) * 3.6);

//restMultiplier was passed in as arg previously
const generateTrainingPlans = (speedDifficulty, targetPace, userInfo, primary, secondary, previousWorkout) => {
  const { newFitness, targetDifficulty } = getOverallFitness(
      speedDifficulty,
      targetPace,
      userInfo.weeks,
      userInfo.currentFitness,
      previousWorkout
  );
  const mapper = (workout) => {
    const temp = JSON.parse(JSON.stringify(workout));
    temp.personalisedDifficultyMultiplier =
        (speedDifficulty / 100) * workout.difficultyMultiplier * restMultiplier(workout); // * 100
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
  //console.log('xxHamster', JSON.stringify(trainingPlanPrimary), JSON.stringify(trainingPlanSecondary))
  return {trainingPlanPrimary, trainingPlanSecondary, newFitness};
}

export const getTrainingPlan = (questionnaireData, workouts, previousWorkout = false, previousFitness = 100) => {
  const [primary, secondary, pyramid, longDistance, fartlek] = workouts
  if (questionnaireData.personalBests) {
    //TBC logic
  }
  const userInfo = getUserInfo(questionnaireData, previousFitness);
  //todo is yi hein saving alpha, b, c
  const { alpha, beta, cNewbieGains } = generateConstants(questionnaireData);
  const {targetPace, displayPace} = getTargetPaces(userInfo.targetTime);
  const velocities = getVelocities(targetPace, cNewbieGains);
  // velocities in km/hr, paces in s/m
  const speedDifficulty = getSpeedDifficulty(convertToVelocity(userInfo.currentTime), convertToVelocity(userInfo.targetTime), velocities); // getSpeedDifficulty(currentVelocity, paces);
  const {trainingPlanPrimary, trainingPlanSecondary, newFitness} = generateTrainingPlans(speedDifficulty, targetPace, userInfo, primary, secondary, previousWorkout);
  let trainingPlan = getBestTrainingPlan(trainingPlanPrimary, trainingPlanSecondary)
      ? trainingPlanSecondary[1]
      : trainingPlanPrimary[1];
  trainingPlan.parts[0]["rest"] = getPrescribedRest(trainingPlan.parts[0]["restMultiplier"]);
  trainingPlan.parts[0]["pace"] = displayPace
  return { newFitness, trainingPlan };
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
    return { goalTimePerSet: 0, averageTime: 0, standardDeviation: 0, missed: 0, workoutScore: 0 };
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
  return { workoutScore }; // {goalTimePerSet, averageTime, standardDeviation, missed, workoutScore}
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