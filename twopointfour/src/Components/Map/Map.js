// import { useEffect, useState } from "react";
// import styles from "./Map.module.css";
// import ReactMapGL, { Marker } from "react-map-gl";
// import { StaticMap } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import DeckGL from "@deck.gl/react";
// import { LineLayer } from "@deck.gl/layers";

// const Map = () => {
//   // const [position, setPosition] = useState([]);
//   // const markers = position.map((ele) => {
//   //   return (
//   //     <Marker latitude={ele.latitude} longitude={ele.longitude}>
//   //       \|/
//   //     </Marker>
//   //   );
//   // });

//   // console.log(position);

//   // const [viewport, setViewPort] = useState({
//   //   latitude: 1.3565952,
//   //   longitude: 103.7631488,
//   //   zoom: 18,
//   //   width: "100vw",
//   //   height: "90vh",
//   // });

//   // useEffect(() => {
//   //   const options = {
//   //     enableHighAccuracy: true,
//   //     timeout: 5000,
//   //     maximumAge: 0,
//   //   };
//   //   function error(err) {
//   //     console.warn(err.message);
//   //   }
//   //   function success(pos) {
//   //     console.log(pos.coords);
//   //     setPosition((prev) => {
//   //       return [...prev, { latitude: pos.coords.latitude, longitude: pos.coords.longitude }];
//   //     });
//   //     setViewPort((prevState) => {
//   //       return { ...prevState, latitude: pos.coords.latitude, longitude: pos.coords.longitude };
//   //     });
//   //   }
//   //   const geo = navigator.geolocation.watchPosition(success, error, options);
//   // }, []);

//   const initial_location = {
//     latitude: 1.3565952,
//     longitude: 103.7631488,
//     zoom: 18,
//     width: "100vw",
//     height: "90vh",
//   };
//   let data;
//   let layers;
//   useEffect(() => {
//     data = [
//       {
//         sourcePosition: [1.3554365270253899, 103.76835719776156],
//         targetPosition: [1.3569381433233472, 103.76740769577029],
//       },
//     ];
//     layers = [new LineLayer({ id: "line-layer", data })];
//   }, []);

//   return (
//     // <div>
//     //   <ReactMapGL
//     //     mapboxApiAccessToken={
//     //       "pk.eyJ1Ijoiam9zZXN0ZXZlbnNvbiIsImEiOiJja3ExN2UzdHcwYzU1MnZxZ2ltbXd2cjcyIn0.if4N21r2VWKcH2lKDaMJow"
//     //     }
//     //     {...viewport}
//     //     onViewportChange={(newView) => setViewPort(newView)}
//     //   >
//     //     {markers}
//     //   </ReactMapGL>
//     // </div>
//     <div>
//       <DeckGL initialViewState={initial_location} controller={true} layers={layers}>
//         <StaticMap
//           mapboxApiAccessToken={
//             "pk.eyJ1Ijoiam9zZXN0ZXZlbnNvbiIsImEiOiJja3ExN2UzdHcwYzU1MnZxZ2ltbXd2cjcyIn0.if4N21r2VWKcH2lKDaMJow"
//           }
//         />
//         {/* <LineLayer id="line-layer2" data={data} /> */}
//       </DeckGL>
//     </div>
//   );
// };

// export default Map;

import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam9zZXN0ZXZlbnNvbiIsImEiOiJja3ExN2UzdHcwYzU1MnZxZ2ltbXd2cjcyIn0.if4N21r2VWKcH2lKDaMJow";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 103.76835719776156,
  latitude: 1.3554365270253899,
  zoom: 18,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer

function Map() {
  console.log("Start Current Render");
  const [data, setData] = useState([]);
  const [layers, setLayers] = useState();
  const [coordInitial, setCoordInitial] = useState();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function error(err) {
    console.warn(err.message);
  }
  function success(pos) {
    console.log("success!");
    setData((prevData) => {
      if (prevData.length === 0) {
        return [
          {
            sourcePosition: [pos.coords.longitude, pos.coords.latitude],
            targetPosition: [null, null],
          },
        ];
      }
      const [lng1, lat1] = prevData.slice(-1)[0].sourcePosition;
      const [lng2, lat2] = prevData.slice(-1)[0].targetPosition;
      if (lng1 === pos.coords.longitude && lat1 === pos.coords.latitude) return [...prevData];
      if (!lat2 || !lng2) {
        return [
          {
            sourcePosition: [lng1, lat1],
            targetPosition: [pos.coords.longitude, pos.coords.latitude],
          },
        ];
      }
      if (lng2 === pos.coords.longitude && lat2 === pos.coords.latitude) return [...prevData];
      return [
        ...prevData,
        {
          sourcePosition: [lng2, lat2],
          targetPosition: [pos.coords.longitude, pos.coords.latitude],
        },
      ];
    });
    console.log(data);
  }
  useEffect(() => {
    console.log("Start Initialize Geolocation");
    const geo = navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    console.log("Start Layer Update");
    setLayers([new LineLayer({ id: "line-layer", data })]);
  }, [data]);

  console.log("Current Render Data", data);

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      {console.log("End Current Render!")}
    </DeckGL>
  );
}

export default Map;
