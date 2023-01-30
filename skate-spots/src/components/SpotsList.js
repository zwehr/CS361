import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'

export default function SpotsList() {
  const [spots, setSpots] = useState([])

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
    <div className='SpotsList'>
      <h2>Spots List</h2>
      {spots.map((spot) => <p>{spot.name} | {spot.description}</p>)}
    </div>
  )
}