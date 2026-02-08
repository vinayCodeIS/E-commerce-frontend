import { useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Items from "./pages/Items"
import Cart from "./pages/Cart"
import OrderPlaced from "./pages/OrderPlaced"

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "items" : "login"
  )

  if (page === "signup") {
    return <Signup onSignup={() => setPage("login")} />
  }

  if (page === "login") {
    return (
      <Login
        onLogin={() => setPage("items")}
        onSignup={() => setPage("signup")}
      />
    )
  }

  if (page === "cart") {
    return (
      <Cart
        goBack={() => setPage("items")}
        goToOrderPlaced={() => setPage("orderPlaced")}
      />
    )
  }

  if (page === "orderPlaced") {
    return <OrderPlaced goToItems={() => setPage("items")} />
  }

  return (
    <Items
      goToCart={() => setPage("cart")}
      onLogout={() => setPage("login")}
    />
  )
}

export default App
