import '../styles/DeleteWarningPopup.css'

export default function DeleteWarningPopup(props) {
  const handleCancelClick = () => {
    props.toggleDeleteWarning()
  }

  return (
    <div className='DeleteWarningPopup'>
      <p>Are you sure you want to delete?</p>
      <button>Confirm Delete</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}