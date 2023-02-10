import { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import MapLegend from './MapLegend'
import '../styles/SpotsMap.css'
import pin from '../images/location-pin.png'
import TagBubbles from './TagBubbles'

export default function SpotsMap() {
  const [spots, setSpots] = useState([])
  const [popupInfo, setPopupInfo] = useState(null)

  useEffect(() => {
    console.log(`Length of spots variable is: ${spots.length}, which should equal and not exceed total number of spots.`)
  }, [spots])

  useEffect(() => {
    getFirestoreData();
  }, [])

  async function getFirestoreData() {
    const querySnapshot = await getDocs(collection(db, "spots"));
    let currSpots = []
    querySnapshot.forEach((spot) => {
      currSpots.push(spot.data())
      setSpots(currSpots)
    });
  }

  return (
    <div className='SpotsMap'>
      <Map
        initialViewState={{
          longitude: -20,
          latitude: 20,
          zoom: 2.5
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MB}
      >

        {spots.map((spot) => (
          <Marker
            className='marker'
            latitude={spot.lat}
            longitude={spot.lng}
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(spot)
            }}
          >
            <img src={pin} />
          </Marker>
        ))}

        {popupInfo && (
          <Popup className='popup'
            anchor="top"
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <h3>{popupInfo.name}</h3>
              <p><strong>Type:</strong> {popupInfo.type}</p>
              <p><strong>Skate-stopped:</strong> {popupInfo.skateStopped}</p>
              <p><strong>Description:</strong> {popupInfo.description}</p>
              <strong>Tags:</strong> <TagBubbles tags={popupInfo.tags} />
            </div>
          </Popup>
        )}

      </Map>
      <div className='map-legend-container'>
        <MapLegend />
      </div>
    </div>
  );
}