import { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import MapLegend from './MapLegend'
import '../styles/SpotsMap.css'
import pin from '../images/location-pin.png'
import TagBubbles from './TagBubblesStatic'

export default function SpotsMap() {
  const [spots, setSpots] = useState([])
  const [popupInfo, setPopupInfo] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    console.log(`spots.length is: ${spots.length}, which should equal (NOT EXCEED) total number of spots.`)
  }, [spots])

  useEffect(() => {
    getFirestoreData();
  }, [])

  async function getFirestoreData() {
    const querySnapshot = await getDocs(collection(db, "spots"));
    let currSpots = []
    querySnapshot.forEach((spot) => {
      currSpots.push({ ...spot.data(), id: spot.id })
    });
    setSpots(currSpots)
  }

  const getImage = () => {
    console.log('defined... time to find image URL')
    const storage = getStorage()
    getDownloadURL(ref(storage, popupInfo.image))
      .then((url) => {
        console.log('url is ', url)
        setImageUrl(url)
      })
  }

  return (
    <div className='SpotsMap'>
      <Map
        initialViewState={{
          longitude: -20,
          latitude: 25,
          zoom: 2
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MB}
      >

        {spots.map((spot) => (
          <Marker
            key={spot.id}
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
              <img className='spot-image' src={imageUrl} />
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