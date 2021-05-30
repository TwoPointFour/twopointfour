import { createRef, useEffect } from "react";
import _1 from "../Assets/callouts/1.mp3";
import _2 from "../Assets/callouts/2.mp3";
import _3 from "../Assets/callouts/3.mp3";
import _4 from "../Assets/callouts/4.mp3";
import _5 from "../Assets/callouts/5.mp3";
import _10 from "../Assets/callouts/10.mp3";
import _20 from "../Assets/callouts/20.mp3";
import _30 from "../Assets/callouts/30.mp3";
import _40 from "../Assets/callouts/40.mp3";
import _50 from "../Assets/callouts/50.mp3";
import _60 from "../Assets/callouts/60.mp3";
import _70 from "../Assets/callouts/70.mp3";
import _80 from "../Assets/callouts/80.mp3";
import _90 from "../Assets/callouts/90.mp3";
import _100 from "../Assets/callouts/100.mp3";
import _200 from "../Assets/callouts/200.mp3";
import _300 from "../Assets/callouts/300.mp3";
import _400 from "../Assets/callouts/400.mp3";
import _500 from "../Assets/callouts/500.mp3";
import _600 from "../Assets/callouts/600.mp3";
import _700 from "../Assets/callouts/700.mp3";
import _800 from "../Assets/callouts/800.mp3";
import _900 from "../Assets/callouts/900.mp3";
import _1000 from "../Assets/callouts/1000.mp3";
import _1100 from "../Assets/callouts/1100.mp3";
import _1200 from "../Assets/callouts/1200.mp3";
import _1300 from "../Assets/callouts/1300.mp3";
import _1400 from "../Assets/callouts/1400.mp3";
import _1500 from "../Assets/callouts/1500.mp3";
import _1600 from "../Assets/callouts/1600.mp3";
import _1700 from "../Assets/callouts/1700.mp3";
import _1800 from "../Assets/callouts/1800.mp3";
import _1900 from "../Assets/callouts/1900.mp3";
import _2000 from "../Assets/callouts/2000.mp3";
import _2100 from "../Assets/callouts/2100.mp3";
import _2200 from "../Assets/callouts/2200.mp3";
import _2300 from "../Assets/callouts/2300.mp3";
import _2400 from "../Assets/callouts/2400.mp3";
import _audioenabled from "../Assets/callouts/audioenabled.mp3";
import _rest from "../Assets/callouts/rest.mp3";
import _starting from "../Assets/callouts/starting.mp3";
import { useSelector } from "react-redux";

const AudioLibrary = (props) => {
  const calloutsFile = [
    _1,
    _2,
    _3,
    _4,
    _5,
    _10,
    _20,
    _30,
    _40,
    _50,
    _60,
    _70,
    _80,
    _90,
    _100,
    _200,
    _300,
    _400,
    _500,
    _600,
    _700,
    _800,
    _900,
    _1000,
    _1100,
    _1200,
    _1300,
    _1400,
    _1500,
    _1600,
    _1700,
    _1800,
    _1900,
    _2000,
    _2100,
    _2200,
    _2300,
    _2400,
    _audioenabled,
    _rest,
    _starting,
  ];

  const calloutsArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
    "2000",
    "2100",
    "2200",
    "2300",
    "2400",
    "audioenabled",
    "rest",
    "starting",
  ];

  const timer = useSelector((state) => state.timer);

  useEffect(() => {
    console.log("Use effect activated!");
    console.log(props.audioLinker);
    if (props.audioLinker) initialiseAudio();
  }, [props.audioLinker]);

  useEffect(() => {
    if (timer.distance === 0) return;
    const audioIndex = calloutsArray.findIndex((ele) => ele === timer.distance.toString());
    calloutRefs[audioIndex].current.play();
  }, [timer.distance]);

  useEffect(() => {
    if (timer.rest === false) return;
    const audioIndex = calloutsArray.findIndex((ele) => ele === "rest");
    function activateRest(audioElement) {
      audioElement.play();
    }
    setTimeout(activateRest.bind(null, calloutRefs[audioIndex].current), 2000);
  }, [timer.rest]);

  useEffect(() => {
    if (timer.setTime > 100000) return;
    console.log(timer.setTime);
    calloutsArray.slice(0, 14).map((ele, i) => {
      if (Number(ele) * 1000 === timer.setTime) calloutRefs[i].current.play();
    });
    if (timer.setTime === 7000) calloutRefs[40].current.play();
  }, [timer.setTime]);

  const calloutRefs = calloutsArray.map((ele) => {
    return createRef();
  });

  const calloutElements = calloutsArray.map((ele, i) => {
    return (
      <audio preload="auto" ref={calloutRefs[i]}>
        <source key={ele} src={calloutsFile[i]} />
      </audio>
    );
  });

  function initialiseAudio() {
    console.log("initializing audio");
    calloutsArray.map((_, i) => {
      calloutRefs[i].current.play();
    });
  }

  return <div>{calloutElements}</div>;
};

export default AudioLibrary;
