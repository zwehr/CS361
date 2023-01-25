import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <Link to="/">Home (Map)</Link>
      <Link to="/add-spot">Add Spot</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}