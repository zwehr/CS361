export default function Login() {
  return (
    <div className='Log In'>
      <h2>Login</h2>
      <form>
        <label htmlFor='email'>
          <input type='email' name='email' id='email'></input>
        </label>
        <label htmlFor='password'>
          <input type='password' name='password' id='password'></input>
        </label>
        <input type='submit' value='Log In'></input>
      </form>
    </div>
  )
}