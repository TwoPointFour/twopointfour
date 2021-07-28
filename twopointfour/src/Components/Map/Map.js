import { useEffect, useState } from "react";
import styles from "./Map.module.css";

import DeckGL, { FlyToInterpolator } from "deck.gl";
import { LineLayer, IconLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { distanceFromLatLon, findCurrentBearing, msToMinS, msToS } from "../Helper/Complementary";
import naviconLarge from "../Assets/navlocationlarge.png";
import { useSelector } from "react-redux";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam9zZXN0ZXZlbnNvbiIsImEiOiJja3ExN2UzdHcwYzU1MnZxZ2ltbXd2cjcyIn0.if4N21r2VWKcH2lKDaMJow";
// Viewport settings

// Data to be used by the LineLayer
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 400, height: 400, mask: true },
};

const Map = (props) => {
  const [layers, setLayers] = useState();
  const gpsStoredData = useSelector((state) => state[props.timer].gpsStoredData);
  const gpsActiveData = useSelector((state) => state[props.timer].gpsActiveData);
  const timerData = useSelector((state) => state[props.timer]);
  const [initialViewState, setInitialViewState] = useState({
    longitude: 103.76835719776156,
    latitude: 1.3554365270253899,
    zoom: 16,
    pitch: 0,
    bearing: 0,
    transitionDuration: 5000,
  });

  useEffect(() => {
    //Defining the IconLayer
    const iconLayer = new IconLayer({
      id: "icon-layer",
      data: gpsActiveData,
      pickable: true,
      iconAtlas: naviconLarge,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => "marker",

      sizeScale: 15,
      getPosition: (d) => {
        const [targetlng, targetlat] = d.targetPosition;
        const [currentlng, currentlat] = gpsActiveData.slice(-1)[0].targetPosition;
        if (targetlat === currentlat && targetlng === currentlng) return [targetlng, targetlat];
        else return;
      },
      getSize: (d) => 10,
      getColor: (d) => [251, 191, 36],
    });

    // Identifying the bearing of latest movement
    if (gpsActiveData.length <= 1) return;
    const [currentlng, currentlat] = gpsActiveData.slice(-1)[0]?.targetPosition;
    const [previouslng, previouslat] = gpsActiveData.slice(-1)[0]?.sourcePosition;
    const bearing = parseInt(findCurrentBearing(previouslat, previouslng, currentlat, currentlng));

    //Updating the view state according to latest GPS Coords and Bearing of movement
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

    //Updating the layer with new layer
    setLayers([
      new LineLayer({
        id: "line-layer",
        data: gpsActiveData,
        pickable: true,
        getWidth: 6,
        getSourcePosition: (d) => d.sourcePosition,
        getTargetPosition: (d) => d.targetPosition,
        getColor: (d) => (!timerData.rest ? [251, 191, 36] : [52, 211, 153]),
      }),
      iconLayer,
    ]);
  }, [gpsActiveData]);

  return (
    <div className={styles.map}>
      <DeckGL initialViewState={initialViewState} controller={true} layers={layers}>
        <StaticMap
          mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </div>
  );
};

export default Map;
