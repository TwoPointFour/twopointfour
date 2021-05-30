import runCards from "../Assets/tutorial/runCards.jpg";
import TutorialElement from "./TutorialElement";

const TutorialRun = (props) => {
  const Welcome = {
    path: "/run/tutorial/1",
    title: "Guide to Interval Training",
    main: [
      {
        text: "Interval training is a type of high-intensity training that involves several short, fast paced runs with a small rest in between. Try to do these intervals on a track, or park connector with accurate distance markers.",
      },
      {
        text: "Interval training consists of 2 parts. The first part is a fast run, where you run quickly for a specified distance at a certain pace. The second part is a rest, for you to recover after the fast run. Try to jog around slowly during the rest. You will repeat this cycle, or set several times to complete the training.",
      },
    ],
    buttons: [
      { link: "/run", color: "gray", text: "Close" },
      { link: "/run/tutorial/2", color: "yellow", text: "Next" },
    ],
  };

  const Card1 = {
    path: "/run/tutorial/2",
    title: "Understanding your training plan",
    img: runCards,
    main: [
      {
        subtitle: "Set",
        text: "This box tells you how many sets you have to run. Each set consists of 1 fast run, and one rest. Try your best to complete all of the sets in the training.",
      },
      {
        subtitle: "Distance",
        text: "This box tells you how far you will have to run for each interval set.",
      },
    ],
    buttons: [
      { link: "/run/tutorial/1", color: "gray", text: "Back" },
      { link: "/run/tutorial/3", color: "yellow", text: "Next" },
    ],
  };
  const Card2 = {
    path: "/run/tutorial/3",
    title: "Understanding your training plan",
    img: runCards,
    main: [
      {
        subtitle: "Rest",
        text: "This box tells you how long you can rest (in seconds) once you have completed the fast run. Ensure that you monitor this throughout the training",
      },
      {
        subtitle: "Pace",
        text: "This box tells you how fast you must run each 100m segment in order to hit the target time for this training. Aim to run each 100m segment of your training as close to the time in this box as possible. Use this information to monitor if you are running too fast, or slow.",
      },
    ],
    buttons: [
      { link: "/run/tutorial/2", color: "gray", text: "Back" },
      { link: "/run", color: "yellow", text: "Close" },
    ],
  };

  return (
    <>
      <TutorialElement content={Welcome} />
      <TutorialElement content={Card1} />
      <TutorialElement content={Card2} />
    </>
  );
};

export default TutorialRun;
