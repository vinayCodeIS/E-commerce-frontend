import { useEffect, useState } from "react"
import { getItems } from "../api/api"
import "./Items.css"

function Items({ goToCart }) {
  
  const [items, setItems] = useState([])
  const [ log, setLog ] = useState(false)   

  useEffect(() => {
    loadItems()
  }, [])
 

  const loadItems = async () => {
    const data = await getItems()

    // Enhance data for UI (frontend-only)
    const enhanced = data.map((item) => ({
      ...item,
      description:
        item.description ||
        "High quality product with excellent performance and durability.",
      category: item.category || "Electronics",
      rating: item.rating || (Math.random() * 2 + 3).toFixed(1), // 3.0 – 5.0
      stock: "In Stock",
    }))

    setItems(enhanced)
  }

  const handleAddToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    const existing = cart.find((c) => c.id === item.id)

    if (existing) {
      existing.qty += 1
    } else {
      cart.push({ ...item, qty: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Item added to cart")
  }
  const setlog = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("cart")
    setLog(true)
  }


  return (
    <div className="shop-container">
      <header className="shop-header">
        <h2>🛍 My E-Commerce Store</h2>
        <button onClick={goToCart}>Cart</button>
        <button className="logout-btn" onClick={log ? null : setlog}>
            Logout
          </button>
      </header>

      <div className="product-grid">
       
        {items.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.images} alt={item.name } />

            <h3>{item.name}</h3>

            <p className="category">{item.category}</p>

            <p className="description">{item.description}</p>

            <p className="rating">⭐ {item.rating} / 5</p>

            <p className="price">₹{item.price}</p>

            <p className="stock">{item.stock}</p>

            <button onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
