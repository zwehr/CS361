import { v4 as uuidv4 } from 'uuid'
import '../styles/BubbleLinksInteractive.css'

export default function BubbleLinksInteractive(props) {
  return (
    <div className='BubbleLinksInteractive'>
      {props.links.map((link) =>
        <div
          key={uuidv4()}
          className='link-container'>
          <p className='url'>{link}</p>
          <div className='delete-button' onClick={() => props.handleDeleteYoutube(link)}>X</div>
        </div>)}
    </div>
  )
}