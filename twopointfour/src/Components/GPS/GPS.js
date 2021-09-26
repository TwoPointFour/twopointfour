import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vTfRAction } from "../../store/vTfRSlice";
import { vTvRAction } from "../../store/vTvRSlice";
import { fTfRAction } from "../../store/fTfRSlice";
import { fTvRAction } from "../../store/fTvRSlice";
import { distanceFromLatLon } from "../Helper/Complementary";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam9zZXN0ZXZlbnNvbiIsImEiOiJja3ExN2UzdHcwYzU1MnZxZ2ltbXd2cjcyIn0.if4N21r2VWKcH2lKDaMJow";
// Viewport settings

// Data to be used by the LineLayer
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 400, height: 400, mask: true },
};

function GPS(props) {
  // console.log("Start Current Render");
  const [sourceCoord, setSourceCoord] = useState();
  const sourceCoordRef = useRef();
  sourceCoordRef.current = sourceCoord;
  const [watchPositionID, setWatchPositionID] = useState();
  const dispatch = useDispatch();
  const setCount = useSelector((state) => state[props.timer].setCount);
  const gpsStoredData = useSelector((state) => state[props.timer].gpsStoredData);
  const gpsActiveData = useSelector((state) => state[props.timer].gpsActiveData);
  const gpsActiveDataRef = useRef();
  gpsActiveDataRef.current = gpsActiveData;
  const pause = useSelector((state) => state[props.timer].pause);
  const timerActionsObject = {
    vTfR: vTfRAction,
    vTvR: vTvRAction,
    fTfR: fTfRAction,
    fTvR: fTvRAction,
  };

  const timerAction = Object.entries(timerActionsObject).find((ele) => ele[0] === props.timer)[1];

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function error(err) {
    console.warn(err.message);
  }
  function success(pos) {
    if (!sourceCoordRef.current) {
      setSourceCoord([pos.coords.longitude, pos.coords.latitude]);
      return;
    }

    // Updating GPS Coordinates in the Redux state
    const currentSourceCoord = sourceCoordRef.current.slice();
    setSourceCoord([pos.coords.longitude, pos.coords.latitude]);
    dispatch(
      timerAction.updateActiveGPS({
        timestamp: pos.timestamp,
        sourcePosition: [...currentSourceCoord],
        targetPosition: [pos.coords.longitude, pos.coords.latitude],
      })
    );

    // Updating the current distance travelled for the current set
    // This data is required for GPS activated splits
    const currentDistance = gpsActiveDataRef.current
      .reduce((acc, ele, i, arr) => {
        return (acc += parseFloat(distanceFromLatLon(ele.sourcePosition, ele.targetPosition)));
      }, 0)
      .toFixed(3);
    dispatch(timerAction.updateSetDistance(currentDistance));
  }

  useEffect(() => {
    if (!pause) {
      const watchID = navigator.geolocation.watchPosition(success, error, options);
      setWatchPositionID(watchID);
    } else {
      navigator.geolocation.clearWatch(watchPositionID);
    }
  }, [pause]);

  return <div></div>;
}
export default GPS;
