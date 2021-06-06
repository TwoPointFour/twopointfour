import {
    getTrainingPlan,
    getInputValues,
    getUserInfo,
    generateConstants,
    getTargetPaces,
    getVelocities,
    getSpeedDifficulty,
    getPrescribedRest
} from '../src/Components/Helper/Helper';

let assert = chai.assert

const inputValues = getInputValues()
const userInfo = getUserInfo(inputValues.currentMin, inputValues.currentSec, inputValues.targetMin, inputValues.targetSec, inputValues.weeks)
const { cNewbieGains } = generateConstants(inputValues.answers)
const {targetPace} = getTargetPaces(userInfo.targetTime)
const velocities = getVelocities(targetPace, cNewbieGains)
const speedDifficulty = getSpeedDifficulty(11.076923076923077, 11.999999999999998, velocities)
const prescribedRest = getPrescribedRest(4.5, targetPace)

describe('#getInputValues()', function () {
    it('Checking the user input values parsed', function () {
        assert.isEmpty(inputValues.answers.runRegular)
        assert(inputValues.weeks === 8, '')
        assert(inputValues.answers.fFrequency === Number('0'), '')
        assert(inputValues.answers.lMonths === Number('0'), '')
        assert(inputValues.answers.personalBests.d800 === '', '')
        assert(inputValues.answers.personalBests.d1500 === '', '')
        assert(inputValues.answers.personalBests.d3000 === '', '')
        assert(inputValues.answers.personalBests.d5000 === '', '')
        assert(inputValues.answers.personalBests.d10000 === '', '')
        assert(inputValues.currentMin === 13, '')
        assert(inputValues.targetMin === 12, '')
        assert(inputValues.currentSec === 0, '')
        assert(inputValues.targetSec === 0, '')
    });
});

describe('#getUserInfo', function () {
    it('Checking the user info returned', function () {
        assert(userInfo.currentTime === 780, '')
        assert(userInfo.targetTime === 720, '')
        assert(userInfo.weeks === 8, '')
        assert(userInfo.currentFitness === 100, '')
    })
})

describe('#generateConstants', function () {
    it('Checking cNewbieGains', function () {
        assert.strictEqual(cNewbieGains, 1.2454688326370063, 'Passed')
    })
})

describe('#getTargetPaces, #getVelocities', function() {
    it('Checking target pace', function () {
        assert.strictEqual(targetPace, 0.3)
    })
    it('Checking velocities', function () {
        assert.deepEqual(velocities, [7.751348326370826, 8.09657644510835, 9.115350964691519, 10.825759516493187])
    })
})

describe('#getSpeedDifficulty', function() {
    it('Verify the complicated speed difficulty', function () {
        assert.strictEqual(speedDifficulty, 115.4117657370535)
    })
})

describe('#getPrescribedRest', function() {
    it('Verify the prescribed rest', function () {
        assert.strictEqual(prescribedRest, 135)
    })
})

describe('#checkPriAndSecTrainingPlans', function() {
    it('Verify the intermediate plans', function () {
        assert.strictEqual(prescribedRest, 135)
    })
})

describe('#getTrainingPlan', function() {
    it('Expected training plan', function () {
        assert.deepEqual(getTrainingPlan(), [[3, 1000, 4.5]])
    })
})

/*
DYNAMICALLY GENERATING TESTS
 */

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
