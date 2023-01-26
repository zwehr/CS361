import { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import pin from '../images/location-pin.png'

export default function SpotsMap() {
  const [spots, setSpots] = useState([])
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    getFirestoreData();
  }, [])

  async function getFirestoreData() {
    const querySnapshot = await getDocs(collection(db, "spots"));
    querySnapshot.forEach((spot) => {
      console.log(spot.id, " => ", spot.data());
      setSpots((currentSpots) => ([...currentSpots, spot.data()]))
    });
    console.log('at the end, spots is: ', spots)
  }

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

      {spots.map((spot) => (
        <Marker latitude={spot.x} longitude={spot.y}>
          <img src={pin} />
        </Marker>
      ))}

    </Map>
  );
}