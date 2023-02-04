import '../styles/TagBubbles.css'

export default function TagBubbles(props) {
  return (
    <div className='TagBubbles'>
      {props.tags.map((tag) => <div className='tag-in-list'>{tag}</div>)}
    </div>
  )
}