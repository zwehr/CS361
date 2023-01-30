import { NavLink } from 'react-router-dom'
import '../styles/Nav.css'

export default function Nav() {
  return (
    <nav className='Nav'>
      <NavLink to='/'>Home (Map)</NavLink>
      <NavLink to='/spots-list'>Spots List</NavLink>
      <NavLink to='/add-spot'>Add Spot</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/sign-up'>Sign Up</NavLink>
    </nav>
  )
}