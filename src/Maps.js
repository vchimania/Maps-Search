import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [45, 45],
});

//default position for boston
const position = [42.364506, -71.038887];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}

export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <>
      <MapContainer
        center={position}
        zoom={5}
        className="map-container"  
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=XlYONRmVil68IsTnDPCZ"
        />
        {selectPosition && (
          <Marker position={locationSelection} icon={icon}>
            <Popup>
              {selectPosition.display_name}
            </Popup>
          </Marker>
        )}
        <GeoJSON data={selectPosition?.geojson} key={selectPosition?.place_id} />
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
      <style>{`
        .map-container{
          height: 100%;
          width: 100%;
        }
        @media only screen and (max-width: 1200px){
          .map-container{
            height: 70vh;
            width: 100%;
          }
        }
          `}
      </style>
    </>
  );
}