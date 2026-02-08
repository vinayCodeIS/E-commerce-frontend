const API_URL = "https://e-commerce-backend-33gs.onrender.com"

// ---------- AUTH ----------
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ---------- ITEMS ----------
export const getItems = async () => {
  try {
    const res = await fetch(`${API_URL}/items`)
    if (!res.ok) throw new Error("Items fetch failed")
    return await res.json()
  } catch (err) {
    console.error("getItems error:", err)
    return []            // 👈 prevents app crash
  }
}

// ---------- CART ----------
export const addToCart = async (itemId, token) => {
  const res = await fetch(`${API_URL}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ itemId }),
  })
  return res.json()
}

export const getCart = async (token) => {
  const res = await fetch(`${API_URL}/carts`, {
    headers: { Authorization: token },
  })
  return res.json()
}

// ---------- ORDERS ----------
export const checkout = async (token) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { Authorization: token },
  })
  return res.json()
}

export const getOrders = async (token) => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: { Authorization: token },
  })
  return res.json()
}
