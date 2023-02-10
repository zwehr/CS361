import '../styles/TagBubbles.css'
import { v4 as uuidv4 } from 'uuid'

export default function TagBubbles(props) {
  return (
    <div className='TagBubbles'>
      {props.tags.map((tag) => <div key={uuidv4()} className='tag-in-list'>{tag}</div>)}
    </div>
  )
}