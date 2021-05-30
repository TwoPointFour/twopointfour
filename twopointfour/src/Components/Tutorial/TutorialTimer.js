import timerControls from "../Assets/tutorial/timerControls.jpg";
import timerTimer from "../Assets/tutorial/timerTimer.jpg";
import timerHUD from "../Assets/tutorial/timerHUD.jpg";
import timerActions from "../Assets/tutorial/timerActions.jpg";
import TutorialElement from "./TutorialElement";

const TutorialTimer = (props) => {
  const Welcome = {
    path: "/timer/tutorial/1",
    title: "Guide to TwoPointFour Timer",
    main: [
      {
        text: " Welcome to your customised workout. This screen is a stopwatch timer that has been pre-programmed with your workout details. This timer is set to the pace that you need to run each 100m in the interval in. The time displayed on the screen is how long you have to run the next 100m of your workout.",
      },
    ],
    buttons: [
      { link: "/timer", color: "gray", text: "Close" },
      { link: "/timer/tutorial/2", color: "yellow", text: "Next" },
    ],
  };

  const Controls = {
    path: "/timer/tutorial/2",
    title: "Timer Controls Guide",
    img: timerControls,
    main: [
      {
        subtitle: "Start",
        text: "Pressing this button starts the workout.",
      },
      {
        subtitle: "Split",
        text: "Press this button when you have completed the required distance for your set. Your time taken for the set will be recorded automatically. It will automatically start the rest countdown before the start of your next set.",
      },
      {
        subtitle: "Pause",
        text: "Press this button to pause the entire workout.",
      },
    ],
    buttons: [
      { link: "/timer/tutorial/1", color: "gray", text: "Back" },
      { link: "/timer/tutorial/3", color: "yellow", text: "Next" },
    ],
  };
  const Clock = {
    path: "/timer/tutorial/3",
    title: "Timer Clocks",
    img: timerTimer,
    main: [
      {
        subtitle: "Big Timer",
        text: "This is a countdown timer. It shows you how much time you have left to run the current 100m, based on the seconds / 100m pace set out by your training plan.",
      },
      {
        subtitle: "Small TImer",
        text: " This is a countup timer. It records the time elapsed since the start of your current set. Pressing split will record the time elpased into the table below.",
      },
    ],
    buttons: [
      { link: "/timer/tutorial/2", color: "gray", text: "Back" },
      { link: "/timer/tutorial/4", color: "yellow", text: "Next" },
    ],
  };
  const HUD = {
    path: "/timer/tutorial/4",
    title: "Timer HUD",
    img: timerHUD,
    main: [
      {
        subtitle: "Previous Set Timing",
        text: "This shows the time you took to complete your previous set.",
      },
      {
        subtitle: "Set Tracker",
        text: "This shows you which set of your training you are currently on.",
      },
      {
        subtitle: "Distance Tracker",
        text: "This showns you the distance which you should be at based on your targeted pace.",
      },
    ],
    buttons: [
      { link: "/timer/tutorial/3", color: "gray", text: "Back" },
      { link: "/timer/tutorial/5", color: "yellow", text: "Next" },
    ],
  };
  const Actions = {
    path: "/timer/tutorial/5",
    title: "Timer Actions",
    img: timerActions,
    main: [
      {
        subtitle: "Exit Workout (red)",
        text: "Press to quit current workout. Your progress will be lost and you will have to re-attempt this workout again.",
      },
      {
        subtitle: "View Timing Logs (yellow)",
        text: "Press to view your previous set timings.",
      },
      {
        subtitle: "Activate Audio (blue)",
        text: "For iOS users, press to enable verbal callouts to keep yourself on pace. For Andriod Users, verbal callouts is enabled by default. Mute your phone to disable it.",
      },
      {
        subtitle: "Save Workout (green)",
        text: "Press to save workout. Once, saved you will not be able to continue with the current workout. A new workout will be generated based on your workout performance",
      },
    ],
    buttons: [
      { link: "/timer/tutorial/4", color: "gray", text: "Back" },
      { link: "/timer", color: "yellow", text: "Close" },
    ],
  };

  return (
    <>
      <TutorialElement content={Welcome} />
      <TutorialElement content={Controls} />
      <TutorialElement content={Clock} />
      <TutorialElement content={HUD} />
      <TutorialElement content={Actions} />
    </>
  );
};

export default TutorialTimer;
