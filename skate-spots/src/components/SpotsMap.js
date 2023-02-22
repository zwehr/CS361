import { useState, useEffect } from 'react'
import axios from 'axios'
import Map, { Marker, Popup } from 'react-map-gl'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import MapLegend from './MapLegend'
import '../styles/SpotsMap.css'
import pin from '../images/location-pin.png'
import TagBubbles from './TagBubblesStatic'

export default function SpotsMap() {
  const defaultSpot = { name: 'test', lat: -90, lng: 10, id: 'abc', youtubeLinks: ['https://www.youtube.com/embed/nufgmoSNq0E?start=24'], tags: ['one'] }

  const [spots, setSpots] = useState([])
  const [popupInfo, setPopupInfo] = useState(defaultSpot)
  const [weatherData, setWeatherData] = useState({})
  const [imageUrls, setImageUrls] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  // YouTube index isn't currently changing, but will in the future.
  const [youtubeIndex, setYoutubeIndex] = useState(0)
  const [popupClicked, setPopupClicked] = useState(false)

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

  // Loads images when popupInfo changes (when Marker is clicked)
  useEffect(() => {
    if (popupClicked === true)
      popupInfo.images.forEach((image) => {
        const storage = getStorage()
        getDownloadURL(ref(storage, `spots/${image}`))
          .then((url) => {
            setImageUrls(oldArr => [...oldArr, url])
          })
      })
    axios.get(`https://cs361weather.onrender.com/weather?lat=${popupInfo.lat !== null ? popupInfo.lat : 0}&long=${popupInfo.lng}`)
      .then(res => {
        setWeatherData(res.data)
        console.log(weatherData)
        console.log(popupInfo)
      })
  }, [popupInfo])

  // set state variables back to defaults when Popup closes
  const resetMap = () => {
    setPopupInfo(defaultSpot)
    setImageUrls([])
    setPopupClicked(false)
    setImageIndex(0)
  }

  const incrementImageIndex = () => {
    if (imageIndex === imageUrls.length - 1) {
      setImageIndex(0)
    } else {
      setImageIndex(oldIndex => oldIndex + 1)
    }
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
              resetMap()
              e.originalEvent.stopPropagation();
              setPopupClicked(true)
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
            onClose={resetMap}
            focusAfterOpen={true}
          >
            <div>
              <h3>{popupInfo.name}</h3>
              <p><strong>Type:</strong> {popupInfo.type}</p>
              <p><strong>Weather:</strong> {weatherData.temp_fahrenheit} degrees F ({weatherData.phrase})</p>
              <p><strong>Skate-stopped:</strong> {popupInfo.skateStopped}</p>
              <p><strong>Description:</strong> {popupInfo.description}</p>
              <img className='spot-image' onClick={incrementImageIndex} src={imageUrls[imageIndex]} />
              {popupInfo.youtubeLinks[youtubeIndex] && <iframe
                /* Default width and height are 560 and 315 respectively. */
                width="336"
                height="189"
                src={popupInfo.youtubeLinks[youtubeIndex]}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
              </iframe>}
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