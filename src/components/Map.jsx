import React, { useContext } from "react";
import { Context } from "../context/Context";
// https://maps.google.com/maps?q=${searchValue}&t=&z=13&ie=UTF8&iwloc=&output=embed

const MapComponent = () => {
  const { area, setArea } = useContext(Context);


  const mapSrc = `https://maps.google.com/maps?q=2880%20Broadway,${area}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div id="map" style={{ textAlign: "center", width: "100%", height: "100%" }}>
      <iframe
        width="100%"
        height="100%"
        style={{ borderRadius: "10px", display: "block" }}
        id="gmap_canvas"
        src={mapSrc}
        frameBorder="0"
        scrolling="yes"
        marginHeight="0"
        marginWidth="0"
        title="Google Map"
      />
    </div>
  );
};

export default MapComponent;
