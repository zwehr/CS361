import '../styles/Login.css'

export default function Login() {
  return (
    <div className='Login'>
      <h2 className='h2-header'>Login</h2>
      <form>
        <label htmlFor='email'>
          <input type='email' name='email' id='email'></input>
        </label>
        <label htmlFor='password'>
          <input type='password' name='password' id='password'></input>
        </label>
        <input type='submit' value='Log In' disabled></input>
      </form>
    </div>
  )
}