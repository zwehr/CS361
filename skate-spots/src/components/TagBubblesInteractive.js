import '../styles/TagBubblesInteractive.css'
import { v4 as uuidv4 } from 'uuid'

export default function TagBubblesInteractive(props) {

  return (
    <div className='TagBubblesInteractive'>
      {props.tags.map((tag) =>
        <div
          key={uuidv4()}
          className='tag-container'>
          <p className='tag-text'>{tag}</p>
          <div className='delete-button' onClick={() => props.handleDeleteTag(tag)}>X</div>
        </div>)}
    </div>
  )
}