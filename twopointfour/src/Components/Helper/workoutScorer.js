//todo get rid of the retarded parseFloat all over the place
export const getMissed = (previousWorkout) =>
    previousWorkout.parts[0]["sets"] - previousWorkout.parts[0]["timings"].length;

export const getAverageTime = (previousWorkout) => {
    // in seconds
    const timings = previousWorkout.parts[0]["timings"];
    return (
        timings.reduce((total, setTime) => total + parseFloat(setTime), 0) /
        previousWorkout.parts[0]["timings"].length
    );
};

export const getStandardDeviation = (previousWorkout) => {
    const mean = getAverageTime(previousWorkout); // in ms
    return Math.sqrt(
        previousWorkout.parts[0]["timings"]
            .map((set) => Math.pow(set - mean, 2))
            .reduce((total, value) => total + value, 0) / previousWorkout.parts[0]["timings"].length
    );
};

export const getGoalSetTime = (
    previousWorkout // in ms
) =>
    (parseFloat(previousWorkout.parts[0]["pace"]) *
        parseFloat(previousWorkout.parts[0]["distance"])) /
    100;

//todo confirm values
const kValue = 0.25;
const yValue = 1.25;

export const penaliseMissed = (missed, previousWorkout) =>
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