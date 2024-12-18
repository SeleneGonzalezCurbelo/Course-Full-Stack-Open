import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => (
    <form id="loginForm" aria-label="loginForm" onSubmit={handleLogin}>
      <div>
        Username
          <input
            data-testid="username"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        Password
          <input
            data-testid="password"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  LoginForm.propTypes = {
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  LoginForm.displayName = 'LoginForm'

  export default LoginForm
