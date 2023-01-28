import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import '../styles/AddSpot.css'

export default function AddSpot() {
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = (e) => {
    console.log(e.lngLat)
    setLat(e.lngLat.lat)
    setLng(e.lngLat.lng)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "spots"), {
        description: description,
        name: name,
        lat: lat,
        lng: lng
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className='AddSpot'>
      <h2>Add Spot</h2>
      <div className='add-map-container'>
        <Map
          initialViewState={{
            longitude: -30,
            latitude: 30,
            zoom: 2
          }}
          style={{ width: "70vw", height: "60vh", margin: "0 auto", borderRadius: "10px", cursor: "crosshair" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MB}
          onClick={handleClick}
          className="add-map"
        >

        </Map>
      </div>
      <p>Click on the map to fill coordinate fields.</p>
      <form onSubmit={handleSubmit} className="add-form">
        <label htmlFor="lat">Latitude:
          <input type="text" name="lat" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} required></input>
        </label>
        <label htmlFor="lng">Longitude:
          <input type="text" name="lng" id="lng" value={lng} onChange={(e) => setLng(e.target.value)} required></input>
        </label>
        <label htmlFor="name">Name:
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required></input>
        </label>
        <label htmlFor="description">Description:
          <input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}