import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import DeleteWarningPopup from './DeleteWarningPopup'
import '../styles/SpotsList.css'

export default function SpotsList() {
  const [spots, setSpots] = useState([])
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)

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

  const handleClick = () => {
    setShowDeleteWarning(true)
  }

  const toggleDeleteWarning = () => {
    showDeleteWarning ? setShowDeleteWarning(false) : setShowDeleteWarning(true)
  }

  return (
    <div className='SpotsList'>
      <h2>Spots List</h2>
      {spots.map((spot) => <div className='single-spot'>{spot.name} | {spot.description}<button onClick={handleClick}>Delete</button></div>)}
      {showDeleteWarning && <DeleteWarningPopup toggleDeleteWarning={toggleDeleteWarning} />}
    </div>
  )
}