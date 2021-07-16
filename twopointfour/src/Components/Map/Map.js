import React, { useEffect, useRef, useState } from "react";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import { LineLayer, IconLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import navicon from "../Assets/navlocation.png";
import naviconLarge from "../Assets/navlocationlarge.png";
import MetricsNumber from "../UI/Metrics/MetricsNumber";
import MetricsCard from "../UI/Metrics/MetricsCard";
import styles from "./Map.module.css";
import { distanceFromLatLon, findCurrentBearing, msToMinS, msToS } from "../Helper/Complementary";
import Button from "../UI/Button";
import Icons from "../Assets/Icons";
import LargeClock from "../Timer/LargeClock";
import SmallClock from "../Timer/SmallClock";
import { useDispatch, useSelector } from "react-redux";
import { startTimer, timerAction } from "../../store/mainSlice";
import LargeMeasurement from "../UI/Measurement/LargeMeasurement";
import DistanceGroup from "../UI/Measurement/DistanceGroup";
import DigitGroup from "../UI/Measurement/DigitGroup";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam9zZXN0ZXZlbnNvbiIsImEiOiJja3ExN2UzdHcwYzU1MnZxZ2ltbXd2cjcyIn0.if4N21r2VWKcH2lKDaMJow";
// Viewport settings

// Data to be used by the LineLayer
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 400, height: 400, mask: true },
};

function Map() {
  // console.log("Start Current Render");
  const [data, setData] = useState([]);
  const [layers, setLayers] = useState();
  const [sourceCoord, setSourceCoord] = useState();
  const sourceCoordRef = useRef();
  sourceCoordRef.current = sourceCoord;
  const [totalDistance, setTotalDistance] = useState();
  const [averagePace, setAveragePace] = useState();
  const [currentPace, setCurrentPace] = useState();
  const [watchPositionID, setWatchPositionID] = useState();
  const dispatch = useDispatch();
  const minTimer = useSelector((state) => state.timer.smallTimeValue);
  const pause = useSelector((state) => state.timer.pause);
  const setCount = useSelector((state) => state.timer.setCount);
  const gpsStoredData = useSelector((state) => state.timer.gpsStoredData);
  const timerData = useSelector((state) => state.timer);

  const [initialViewState, setInitialViewState] = useState({
    longitude: 103.76835719776156,
    latitude: 1.3554365270253899,
    zoom: 16,
    pitch: 0,
    bearing: 0,
    transitionDuration: 5000,
  });
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function error(err) {
    // console.warn(err.message);
  }
  function success(pos) {
    console.log("Success activated!");
    if (!sourceCoordRef.current) {
      console.log("exit activated!");
      setSourceCoord([pos.coords.longitude, pos.coords.latitude]);
      console.log(sourceCoordRef.current);
      return;
    }
    setData((prevData) => {
      console.log("Set Data activated!");
      // if (prevData.length === 0) {
      //   return [
      //     {
      //       sourcePosition: [pos.coords.longitude, pos.coords.latitude],
      //       targetPosition: [null, null],
      //     },
      //   ];
      // }
      // const [lng1, lat1] = prevData.slice(-1)[0].sourcePosition;
      // const [lng2, lat2] = prevData.slice(-1)[0].targetPosition;
      // if (
      //   lng1 === pos.coords.longitude &&
      //   lat1 === pos.coords.latitude &&
      //   lng2 === pos.coords.longitude &&
      //   lat2 === pos.coords.latitude
      // )
      //   return [...prevData];
      // if (!lat2 || !lng2) {
      //   return [
      //     {
      //       timestamp: pos.timestamp,
      //       sourcePosition: [lng1, lat1],
      //       targetPosition: [pos.coords.longitude, pos.coords.latitude],
      //     },
      //   ];
      // }
      // if (lng2 === pos.coords.longitude && lat2 === pos.coords.latitude) return [...prevData];
      const currentSourceCoord = sourceCoordRef.current.slice();
      setSourceCoord([pos.coords.longitude, pos.coords.latitude]);
      console.log(sourceCoordRef.current);
      return [
        ...prevData,
        {
          timestamp: pos.timestamp,
          sourcePosition: [...currentSourceCoord],
          targetPosition: [pos.coords.longitude, pos.coords.latitude],
        },
      ];
    });
  }

  useEffect(() => {
    // console.log("Start Initialize Geolocation");
    const testWorkout = {
      id: "1002",
      workoutInfo: [
        {
          distance: 300,
          pace: 5000,
          sets: 9,
          rest: 40000,
        },
      ],
      type: "interval",
      measurement: "distance",
      alpha: 1.0,
      week: 1,
      global_score: 1000.0,
      difficultyMultiplier: 1.0,
    };

    const testWorkoutInfo = {
      distance: 300,
      pace: 5000,
      sets: 9,
      rest: 40000,
      setTime: 60000,
    };
    dispatch(timerAction.initialiseTimer(testWorkoutInfo));
    // const geo = navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    if (!pause) {
      const watchID = navigator.geolocation.watchPosition(success, error, options);
      setWatchPositionID(watchID);
    } else {
      navigator.geolocation.clearWatch(watchPositionID);
      setData([]);
    }
  }, [pause]);

  useEffect(() => {
    if (data.length > 0) dispatch(timerAction.updateStoredGPS(data));
    setData([]);
    console.log(gpsStoredData);
    const distanceData =
      gpsStoredData.length > 0 &&
      gpsStoredData.map((ele) => {
        if (ele.length <= 0) return;
        return ele.reduce((acc, point) => {
          return (acc += distanceFromLatLon(point.sourcePosition, point.targetPosition));
        }, 0);
      });
    console.log(distanceData);
  }, [setCount]);

  useEffect(() => {
    // console.log("Start Layer Update");
    const iconLayer = new IconLayer({
      id: "icon-layer",
      data,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas: naviconLarge,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => "marker",

      sizeScale: 15,
      getPosition: (d) => {
        const [targetlng, targetlat] = d.targetPosition;
        const [currentlng, currentlat] = data.slice(-1)[0].targetPosition;
        if (targetlat === currentlat && targetlng === currentlng) return [targetlng, targetlat];
        else return;
      },
      getSize: (d) => 10,
      getColor: (d) => [251, 191, 36],
    });
    if (data.length <= 1) return;
    const [currentlng, currentlat] = data.slice(-1)[0]?.targetPosition;
    const [previouslng, previouslat] = data.slice(-1)[0]?.sourcePosition;
    const bearing = parseInt(findCurrentBearing(previouslat, previouslng, currentlat, currentlng));
    // console.log("Bearing:", bearing);
    setInitialViewState((prevState) => {
      return {
        ...prevState,
        longitude: currentlng,
        latitude: currentlat,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 1000,
        bearing,
        // pitch: 80,
      };
    });

    setLayers([
      new LineLayer({
        id: "line-layer",
        data,
        pickable: true,
        getWidth: 6,
        getSourcePosition: (d) => d.sourcePosition,
        getTargetPosition: (d) => d.targetPosition,
        getColor: (d) => [251, 191, 36],
      }),
      iconLayer,
    ]);

    const currentDistance = data
      .reduce((acc, ele, i, arr) => {
        return (acc += parseFloat(distanceFromLatLon(ele.sourcePosition, ele.targetPosition)));
      }, 0)
      .toFixed(3);
    setTotalDistance(parseFloat(currentDistance));
    const collatedTimestamps = data
      .filter((ele, i, arr) => {
        if (i === 0) return ele.timestamp;
        if (i === arr.length - 1) return ele.timestamp;
      })
      .map((ele) => ele.timestamp);
    const [startTime, currentTime] = collatedTimestamps;
    const timeElapsed = currentTime - startTime;
    const avgPace = msToMinS(timeElapsed / currentDistance);
    setAveragePace(avgPace);
    // let recentIndex;
    // const recentDistance = data
    //   .reduceRight((acc, ele, i, arr) => {
    //     // console.log(acc);
    //     if (acc >= 0.1 && !recentIndex) recentIndex = i;
    //     if (acc >= 0.1) return acc;
    //     return (acc += parseFloat(distanceFromLatLon(ele.sourcePosition, ele.targetPosition)));
    //   }, 0)
    //   .toFixed(2);
    // // console.log("Recent Index:", recentIndex);
    // const recentTime = data[recentIndex].timestamp;
    // const recentElpased = currentTime - recentTime;
    // const currPace = recentElpased / recentDistance;
    // setCurrentPace(currPace);
    // console.log(data);
    // dispatch(timerAction.updateActiveGPS(data));
  }, [data]);

  function timerStartHandler() {
    dispatch(startTimer());
  }
  function timerPauseHandler() {
    dispatch(timerAction.pauseTimer(true));
  }
  // console.log("Current Render Data", data);
  // console.log("Layer Data", layers);
  return (
    <div>
      <div className={styles.map}>
        <DeckGL initialViewState={initialViewState} controller={true} layers={layers}>
          <StaticMap
            mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
          {/* {console.log("End Current Render!")} */}
        </DeckGL>
      </div>
      <div className={styles["timer__interface"]}>
        <div className={styles["clock__group"]}>
          <LargeMeasurement>
            {/* <DistanceGroup data={setDistance} /> */}
            <DigitGroup data={[...Object.values(timerData.bigTimeValue)]} />
          </LargeMeasurement>
          <SmallClock className={styles["small__clock"]} />
        </div>
        <div className={styles.metrics}>
          <MetricsCard title="Distance" number={totalDistance} units="km"></MetricsCard>
          <MetricsCard
            icon="pace"
            title="Average Pace"
            number={averagePace}
            units="/km"
          ></MetricsCard>
          <MetricsCard
            icon="pace"
            title="1 KM Pace"
            number={currentPace && msToMinS(currentPace)}
            units="min/km"
          ></MetricsCard>
          <MetricsCard
            icon="pace"
            title="100M Pace"
            number={currentPace && msToS(currentPace) / 10}
            units="s/100m"
          ></MetricsCard>
          <div className={styles["timer__actions"]}>
            <Button length="circle" className={styles["action__item"]} color="red-fill">
              {Icons["close"]}
            </Button>
            <Button
              length="circle"
              onClickHandler={timerStartHandler}
              className={styles["action__item"]}
              color="green-fill"
            >
              {Icons["play"]}
            </Button>
            <Button
              length="circle"
              onClickHandler={timerPauseHandler}
              className={styles["action__item"]}
              color="yellow-fill"
            >
              {Icons["pause"]}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Map;
