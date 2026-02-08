import "./OrderPlaced.css"

function OrderPlaced({ goToItems }) {
  return (
    <div className="order-page">
      <div className="order-card">
        <h1>✅ Order Placed Successfully!</h1>
        <p>Thank you for shopping with us.</p>

        <div className="order-info">
          <p>Your order has been confirmed.</p>
          <p>You will receive delivery updates soon.</p>
        </div>

        <button onClick={goToItems}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderPlaced
