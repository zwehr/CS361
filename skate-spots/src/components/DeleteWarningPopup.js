import '../styles/DeleteWarningPopup.css'

export default function DeleteWarningPopup(props) {
  const handleCancelClick = () => {
    props.toggleDeleteWarning()
  }

  const handleDeleteClick = () => {
    props.deleteDocument()
  }

  return (
    <div className='DeleteWarningPopup'>
      <p>Are you sure you want to delete <strong>{props.currentSpotName}</strong>?</p>
      <button onClick={handleDeleteClick}>Confirm Delete</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}