import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { Link } from 'react-router-dom'
import DeleteWarningPopup from './DeleteWarningPopup'
import '../styles/SpotsList.css'
import TagBubblesStatic from './TagBubblesStatic'

export default function SpotsList() {
  const [spots, setSpots] = useState([])
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [currentSpot, setCurrentSpot] = useState(null)
  const spotCollectionRef = collection(db, 'spots')

  useEffect(() => {
    const getSpots = async () => {
      const data = await getDocs(spotCollectionRef)
      setSpots(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getSpots()
  }, [])

  const handleDeleteClick = (spot) => {
    setShowDeleteWarning(true)
    setCurrentSpot(spot)
  }

  const deleteDocument = async () => {
    const spotDoc = doc(db, 'spots', currentSpot.id);
    await deleteDoc(spotDoc)
    setShowDeleteWarning(false)
    alert(currentSpot.name + ' has been deleted.')
  }

  const toggleDeleteWarning = () => {
    showDeleteWarning ? setShowDeleteWarning(false) : setShowDeleteWarning(true)
  }

  return (
    <div className='SpotsList'>
      <h2 className='h2-header'>Spots List</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Spot Name</th>
              <th>Spot Description</th>
              <th>Tags</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot) =>
              <tr key={spot.id}>
                <td>{spot.name}</td>
                <td>{spot.description}</td>
                <td><TagBubblesStatic tags={spot.tags} /></td>
                <td>{Number(spot.lat).toFixed(4)}</td>
                <td>{Number(spot.lng).toFixed(4)}</td>
                <td><Link to={`/edit-spot/${spot.id}`} state={{ spotData: spot }}><button>Edit</button></Link></td>
                <td><button onClick={() => { handleDeleteClick(spot) }}>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showDeleteWarning &&
        <DeleteWarningPopup
          toggleDeleteWarning={toggleDeleteWarning}
          deleteDocument={deleteDocument}
          currentSpotName={currentSpot.name}
        />
      }
    </div>
  )
}