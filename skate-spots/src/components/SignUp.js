import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { createUser } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className='SignUp'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          <input onChange={(e) => setEmail(e.target.value)} type='email' name='email' id='email'></input>
        </label>
        <label htmlFor='password'>
          <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' id='password'></input>
        </label>
        <input type='submit' value='Sign Up' disabled></input>
      </form>
    </div>
  )
}