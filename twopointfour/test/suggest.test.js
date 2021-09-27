import {
  getTrainingPlan,
  getUserInfo,
  generateConstants,
  getTargetPaces,
  getPaces,
  getVelocities,
  getSpeedDifficulty,
  getPrescribedRest,
  generateTrainingPlans,
  getOverallFitness
} from '../src/Components/Helper/Helper.js';

import {
  getStandardDeviation,
  getGoalSetTime,
  getAverageTime,
  getMissed,
  scoredWorkouts,
  penaliseMissed
} from '../src/Components/Helper/workoutScorer.js';

const readJSON = async (name) => {
  return fetch("./" + name + ".json")
    .then(async response => {
      return await response.json();
    })
}

let assert = chai.assert

const previousWorkout = {
  date: Date.now(),
  difficultyMultiplier: 91,
  review: {
    feeling: "good",
    reflection: "This was one of the toughest training I have faced in a long time.",
  },
  parts: [
    {
      distance: 300,
      pace: 25000,
      part_ID: "1006_0",
      rest: 115,
      restMultiplier: 4.5,
      sets: 8,
      timings: [82000, 207000, 83000, 79430, 78236],
    },
  ],
  personalisedDifficultyMultiplier: 160.0173922309409,
  segment: "primary",
  type: "Distance Interval",
  workout_ID: "1006",
  feeling: "good",
}

const questionnaireData = {
  frequency: 0,
  experience: 0,
  distance: 0,
  latest: "13:00",
  workoutFrequency: 3,
  target: "12:00",
  duration: 8,
  regular: false
}
const userInfo = getUserInfo(questionnaireData, 100)
const {cNewbieGains} = generateConstants(questionnaireData)
const {targetPace} = getTargetPaces(userInfo.targetTime)
const velocities = getVelocities(getPaces(targetPace, cNewbieGains))
const speedDifficulty = getSpeedDifficulty(11.076923076923077, 11.999999999999998, velocities)
const prescribedRest = getPrescribedRest(4.5, targetPace)

describe('#getUserInfo', function () {
  it('Checking the user info returned', function () {
    assert(userInfo.currentTime === 780, '')
    assert(userInfo.targetTime === 720, '')
    assert(userInfo.duration === 8, '')
    assert(userInfo.currentFitness === 100, '')
    assert(userInfo.workoutFrequency === 3, '')
  })
})

describe('#generateConstants', function () {
  it('Checking cNewbieGains', function () {
    assert.strictEqual(cNewbieGains, 1.2454688326370063, 'Passed')
  })
})

describe('#getTargetPaces, #getVelocities', function () {
  it('Checking target pace', function () {
    assert.strictEqual(targetPace, 0.3)
  })
  it('Checking velocities', function () {
    assert.deepEqual(velocities, [7.751348326370826, 8.09657644510835, 9.115350964691519, 10.825759516493187])
  })
})

describe('#getSpeedDifficulty', function () {
  it('Verify the complicated speed difficulty', function () {
    assert.strictEqual(speedDifficulty, 115.4117657370535)
  })
})

describe('#getPrescribedRest', function () {
  it('Verify the prescribed rest', function () {
    assert.strictEqual(prescribedRest, 135)
  })
})

describe('#checkPriAndSecTrainingPlans', function () {
  it('Verify the intermediate plans', async function () {
    const primary = await readJSON('primary')
    const secondary = await readJSON('secondary')
    const {
      trainingPlanPrimary,
      trainingPlanSecondary
    } = generateTrainingPlans(speedDifficulty, targetPace, userInfo, primary, secondary, false);
    assert.strictEqual(parseInt(trainingPlanPrimary[1].workout_ID), 1005)
    assert.strictEqual(parseInt(trainingPlanSecondary[1].workout_ID), 2008)
  })
})

describe('#getOverallFitness', function () {
  it('Overall Fitness', async function () {
    const ha = getOverallFitness(speedDifficulty, userInfo.duration, userInfo.currentFitness, previousWorkout)
    assert.deepEqual((ha), {"newFitness":100,"targetDifficulty":101.92647071713169})
  })
})

const getWorkouts = async () => {
  const primary = await readJSON('primary')
  const secondary = await readJSON('secondary')
  const pyramid = [{}]
  const longDistance = await readJSON('longDistance')
  const fartlek = await readJSON('fartlek')
  return [primary, secondary, pyramid, longDistance, fartlek]
}

describe('#getTrainingPlan', function () {
  it('Expected training plan if no previous workout', async function () {
    const workouts = await getWorkouts()
    const temp = (getTrainingPlan(questionnaireData, workouts, false, 100)).trainingPlan.parts[0].part_ID
    assert.strictEqual(temp, "1005_0")
  })
  it('Expected training plan if one previous workout', async function () {
    const workouts = await getWorkouts()
    const temp = (getTrainingPlan(questionnaireData, workouts, false, 100)).trainingPlan.parts[0].part_ID
    assert.strictEqual(temp, "1005_0")
  })
})

describe('#testWorkoutScorer', function () {
  it('Scored workouts', async function () {
    assert.strictEqual(scoredWorkouts(previousWorkout).workoutScore, 37.985266824813856)
    const missed = getMissed(previousWorkout)
    assert.strictEqual(missed, 3)
    assert.strictEqual(penaliseMissed(missed, previousWorkout), 0.5687392682727516)
    assert.strictEqual(getStandardDeviation(previousWorkout), 50562.40161384742)
    assert.strictEqual(getGoalSetTime(previousWorkout), 75000)
    assert.strictEqual(getAverageTime(previousWorkout), 105933.2)
  })
})

/*
THE TEST/ DIRECTORY
By default, mocha looks for the glob "./test/!*.{js,cjs,mjs}", so you may want to put your tests in test/ folder. If you want to include subdirectories, pass the --recursive option.

    To configure where mocha looks for tests, you may pass your own glob:

    $ mocha --recursive "./spec/!*.js"
Some shells support recursive matching by using the globstar (**) wildcard. Bash >= 4.3 supports this with the globstar option which must be enabled to get the same results as passing the --recursive option (ZSH and Fish support this by default). With recursive matching enabled, the following is the same as passing --recursive:
REMOVE THE EXLCAMATION MARK
    $ mocha "./spec/!**!/!*.js"
You should always quote your globs in npm scripts. If you use double quotes, it’s the shell on UNIX that will expand the glob. On the other hand, if you use single quotes, the node-glob module will handle its expansion.

    See this tutorial on using globs.

    Note: Double quotes around the glob are recommended for portability.*/
