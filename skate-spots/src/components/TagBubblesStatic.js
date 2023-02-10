import '../styles/TagBubblesStatic.css'
import { v4 as uuidv4 } from 'uuid'

export default function TagBubblesStatic(props) {
  return (
    <div className='TagBubblesStatic'>
      {props.tags.map((tag) =>
        <div
          key={uuidv4()}
          className='tag-container'>
          <p className='tag-text'>{tag}</p>
        </div>)}
    </div>
  )
}