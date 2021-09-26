import {
    calculateDifficulties,
    deltas,
    generateConstants, getPaces,
    getTargetPaces,
    getUserInfo,
    convertToVelocity,
    getVelocities
} from "./Helper.js";

const getEstimatedTwopointfour = (currentVelocity, velocities, currentFitness) => {
    const diffs = calculateDifficulties(velocities, currentVelocity);
    const [teVelocity, ltVelocity, vVelocity, stVelocity] = velocities;
    if (diffs.teDiff > currentFitness) {
        const predictedTime = teVelocity - Math.log((diffs.teDiff - currentFitness) / (deltas[0] * teVelocity))
        if (predictedTime < teVelocity) return predictedTime
    }
    if (currentFitness > diffs.teDiff) {
        const predictedTime = teVelocity + Math.log((currentFitness - diffs.teDiff) / (deltas[1] * teVelocity))
        if (predictedTime < ltVelocity) return predictedTime
    }
    if (currentFitness > diffs.ltDiff) {
        const predictedTime = ltVelocity + Math.log((currentFitness - diffs.ltDiff) / (deltas[2] * ltVelocity))
        if (predictedTime < vVelocity) return predictedTime
    }
    if (currentFitness > diffs.vDiff) {
        const predictedTime = vVelocity + Math.log((currentFitness - diffs.vDiff) / (deltas[3] * vVelocity))
        if (predictedTime < stVelocity) return predictedTime
    }
    return stVelocity + Math.log((currentFitness - diffs.stDiff) / (deltas[4] * stVelocity))
}

export const getPredictedTime = (questionnaireData, previousFitness = 100) => {
    const userInfo = getUserInfo(questionnaireData, previousFitness);
    userInfo.ipptDatestamp = 1628513171000 // duplicated from Helper.js
    const {cNewbieGains} = generateConstants(questionnaireData);
    const {targetPace} = getTargetPaces(userInfo.targetTime);
    const velocities = getVelocities(getPaces(targetPace, cNewbieGains));
    // need to store the currentTime in database
    return {'predicted_time': 2.4 / getEstimatedTwopointfour(convertToVelocity(userInfo['currentTime']), velocities, userInfo['currentFitness']) * 60}
}