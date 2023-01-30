import { Link } from 'react-router-dom'
import '../styles/MapLegend.css'
import { CgScrollV } from 'react-icons/cg'
import { GiClick } from 'react-icons/gi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BiMouseAlt } from 'react-icons/bi'

export default function MapLegend() {
  return (
    <div className='MapLegend'>
      <ul>
        <li><CgScrollV />Use your scroll wheel to zoom in and out.</li>
        <li><BiMouseAlt />Hold left click and drag to move around the map.</li>
        <li><GiClick /> Click on a pin to view more information about the spot.</li>
        <li><AiOutlineUnorderedList /> You can also view the spots as a list <Link to='/spots-list'>here</Link>.</li>
      </ul>
    </div >
  )
}