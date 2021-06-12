const getRoundedDistance = (time, tempoPace) => Math.ceil((time * 60 / tempoPace) / 0.5) * 0.5;


const suggestFartlek = async (alpha, weekNumber, tempoPace, goalPace) => {
  const fartlek = require('./fartlek.json')
  // const fartlek = await readJSON('fartlek')
  for (let i = 0; i < fartlek.length; i++) {
    const fillerWorkout = fartlek[i]
    if (alpha < parseFloat(fillerWorkout.alpha)) {
      if (weekNumber === parseFloat(fillerWorkout.parts[0].weekAt)) {
        console.log(fillerWorkout.parts[0])
        let jogTime, jogDistance, jogPace
        const {sprintDistance, sprintSets} = fillerWorkout.parts[0]
        const jogPaceFunction = (jogPaceString) => new Function('tempoPace', jogPaceString)
        if (fillerWorkout.parts[0].jogByTime) {
          jogTime = fillerWorkout.parts[0].jogByTime
          jogPace = jogPaceFunction(fillerWorkout.parts[0].jogPace)(tempoPace)
          jogDistance = jogTime / jogPace
        }
        else if (fillerWorkout.parts[0].jogByDistance) {
          jogDistance = fillerWorkout.parts[0].jogByDistance
          jogPace = jogPaceFunction(fillerWorkout.parts[0].jogPace)(tempoPace)
          jogTime = jogDistance * jogPace
        }
        const sprintPaceFunction = (sprintPaceString) => new Function('goalPace', sprintPaceString)
        const sprintPace = sprintPaceFunction(fillerWorkout.parts[0].sprintPace)(goalPace)
        return { //pace in s/m, distance in m, time in s
          sprintSets,
          sprintDistance,
          jogTime,
          jogPace,
          sprintPace,
          jogDistance
        }
      }
/*      if (weekNumber > fillerWorkout.parts[0].weekAt && fillerWorkout.parts[0].end) {
        const tempoPaceNew = goalPace - (weekNumber - fillerWorkout.parts[0].weekAt) * 3
        const runTime = fillerWorkout.parts[0].runTime
        const distance = getRoundedDistance(runTime, tempoPaceNew)
        return {distance, runTime, tempoPace: tempoPaceNew}
      }*/
    }
  }
}



suggestFartlek(0.91, 1, 270 / 1000, 270 / 1000)
  .then((r) => {
    console.log(r)
  })

/*
suggestLongDistance(0.91, 9, 270 / 1000)
  .then((r) => {
    console.log(r)
  })*/
