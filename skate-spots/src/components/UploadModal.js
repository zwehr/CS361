import '../styles/UploadModal.css'

export default function UploadModal() {
  return (
    <div className='UploadModal'>
      <div className='message-container'>
        <div className='message'>
          <p>One Moment Please...</p>
          <p>(Uploading images and adding records to database.)</p>
        </div>
      </div>
    </div>
  )
}