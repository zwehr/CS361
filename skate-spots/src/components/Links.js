import { v4 as uuidv4 } from 'uuid'

export default function Links(props) {
  return (
    <div className='Links'>
      <ul>
        {props.links.map((link) =>
          <li key={uuidv4()}>
            <a href={link}>{link}</a>
            <button type='button' onClick={() => props.delete(link)}>Delete Link</button>
          </li>
        )}
      </ul>
    </div>
  )
}