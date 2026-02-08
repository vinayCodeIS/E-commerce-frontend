import { useEffect, useState } from "react"
import "./Cart.css"

function Cart({ goBack, goToOrderPlaced }) {
  const [cart, setCart] = useState([])

  // Load cart from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || []
    setCart(data)
  }, [])

  // Save cart helper
  const saveCart = (updatedCart) => {
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  // Increase quantity
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    )
    saveCart(updated)
  }

  // Decrease quantity
  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0)

    saveCart(updated)
  }

  // Remove item completely
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id)
    saveCart(updated)
  }

  // ✅ CHECKOUT → ORDER PLACED PAGE
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    // Clear cart
    localStorage.removeItem("cart")
    setCart([])

    // Navigate to Order Placed page
    goToOrderPlaced()
  }

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                ❌
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}

      <button className="back-btn" onClick={goBack}>
        ← Back to Items
      </button>
    </div>
  )
}

export default Cart
