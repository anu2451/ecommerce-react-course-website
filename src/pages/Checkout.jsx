import { useCart } from "../context/CartContext";

export default function Checkout(){

    const { getCartProducts, updateCartItemQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    

    function handlePlaceOrder() {
        // Here you would typically send the order to your backend server for processing.
        // For this example, we'll just clear the cart and show a confirmation message.
        clearCart();
        alert("Thank you for your order! Your order has been placed successfully.");
    }
    
    return <div className="page">
        <div className="container">
            <h1 className="page-title">Checkout</h1>
            <div className="checkout-container">
                <div className="checkout-items">
                    <h2 className="checkout-section-title">Order Summary</h2>
                    {getCartProducts().length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        getCartProducts().map(item => (
                            <div className="checkout-item">
                                <img 
                                src={item.image} 
                                alt={item.name}
                                className="checkout-item-image"/>
                                <div className="checkout-item-details">
                                    <h3 className='checkout-item-name'>{item.name}</h3>
                                    <p className='checkout-item-price'>${item.price.toFixed(2)} each</p>
                                    <p className='checkout-item-price'>Quantity: {item.quantity}</p>
                                </div>
                                <div className="checkout-item-controls">
                                    <div className="quantity-controls">
                                        <button className="quantity-btn" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="quantity-btn" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p className='checkout-item-total'>${(item.price * item.quantity).toFixed(2)}</p>
                                    <button className="btn btn-secondary btn-small" onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="checkout-summary">
                    <h2 className="checkout-section-title">Total</h2>
                    <div className="checkout-total">
                        <p className="checkout-total-label">Subtotal:</p>
                        <p className="checkout-total-value">${getCartTotal().toFixed(2)}</p>
                    </div>
                    <div className="checkout-total">
                        <p className="checkout-total-label">Total:</p>
                        <p className="checkout-total-value checkout-total-final">${getCartTotal().toFixed(2)}</p>
                    </div>
                    <button className="btn btn-primary btn-large btn-block" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    </div>
}