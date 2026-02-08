import { useState } from "react"
import { signupUser } from "../api/api"

function Signup({ onSignup }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    if (!username || !password) {
      alert("Username and password required")
      return
    }

    const res = await signupUser({ username, password })

    if (res.id || res.username) {
      alert("Signup successful. Please login.")
      onSignup()
    } else {
      alert("Signup failed")
    }
  }

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Signup
