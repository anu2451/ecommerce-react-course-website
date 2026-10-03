import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "../data/products.js";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetails(){

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const product = getProductById(productId);

        if(!product){
            navigate("/");
            
            return; // Redirect to home page if product not found
        }

        setProduct(product);

    }, [productId]);

    if(!product){
        return <div>Loading...</div>
    }
    const { cartItems, addToCart } = useCart()
    const handleAddToCart = () => {
        addToCart(product.id);
    }

    const cartItem = cartItems.find(item => item.id === product.id);
    const addToCartLabel = cartItem ? `Add to Cart (${cartItem.quantity})` : "Add to Cart";
    return <div className="page">
        <div className="container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-detail-content">
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-price">Price: ${product.price.toFixed(2)}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        {addToCartLabel}
                    </button>
                </div>
            </div>
        </div>
    </div>
}