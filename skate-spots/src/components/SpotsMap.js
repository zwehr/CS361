import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';

export default function SpotsMap() {
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  return (
    <Map
      initialViewState={{
        longitude: -98.5,
        latitude: 39.8283,
        zoom: 4
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MB}
    >

      {/* {spots.map((spot) => (
        <Marker key={spot.gid} latitude={spot.y} longitude={spot.x} at >
          <button onClick={(e) => {
            e.preventDefault();
            setSelectedSpot(spot)
            setShowPopup(true)
          }}>
            <img src={marker}></img>
          </button>
        </Marker>
      ))}


      {showPopup ? (<Popup
        longitude={selectedSpot.x}
        latitude={selectedSpot.y}
        anchor="bottom-left"
        closeOnClick={false}
        onClose={(e) => {
          setSelectedSpot(null)
          setShowPopup(false)
        }}
      >
        <h1>{selectedSpot.Name}</h1>
        {selectedSpot.description}
      </Popup>
      ) : null} */}

    </Map>
  );
}