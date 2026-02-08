import { useState } from "react"
import { loginUser } from "../api/api"
import "./Login.css"

function Login({ onLogin, onSignup }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      alert("Please enter username and password")
      return
    }

    setLoading(true)
    const res = await loginUser({ username, password })
    setLoading(false)

    if (res.error) {
      alert("Invalid username or password")
      return
    }

    localStorage.setItem("token", res.token)
    onLogin()
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome To E-commerce</h2>
        <p className="subtitle">Login to continue shopping</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="signup-text">
          Don’t have an account?
          <span onClick={onSignup}> Sign up</span>
        </p>
      </form>
    </div>
  )
}

export default Login
