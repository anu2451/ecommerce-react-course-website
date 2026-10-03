import {Link} from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard( {product} ){

    const { cartItems, addToCart } = useCart()
    const handleAddToCart = () => {
        addToCart(product.id);
    }

    const cartItem = cartItems.find(item => item.id === product.id);
    const addToCartLabel = cartItem ? `Add to Cart (${cartItem.quantity})` : "Add to Cart";

    return (
        <div className="product-card">
                        <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-card-image"/>
                        <div className="product-card-content">
                            <h3 className='product-card-name'>{product.name}</h3>
                            <p className='product-card-price'>${product.price}</p>
                        </div>
                        <div className='product-card-actions'>
                            <Link className='btn btn-secondary' to={`/products/${product.id}`}>
                                View Details
                            </Link>
                            <button className='btn btn-primary' onClick={handleAddToCart}>
                                {addToCartLabel}
                            </button>
                        </div>
                    </div>
    );
}