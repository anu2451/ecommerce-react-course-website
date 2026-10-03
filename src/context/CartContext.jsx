import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products.js";

export const CartContext = createContext(null);

export default function CartProvider({ children }){

    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {

        const existingItem = cartItems.find(item => item.id === productId);

        if (existingItem) {

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { id: item.id, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartItems(prevItems => [...prevItems, { id: productId, quantity: 1 }]);

        }
    }

    function getCartProducts(){
        return cartItems.map(item => {
            const product = getProductById(item.id);
            return {
                ...product,
                quantity: item.quantity
            }
        });
    }

    function updateCartItemQuantity(productId, quantity) {
        if (quantity <= 0) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        } else {
            setCartItems(prevItems =>
                prevItems.map(item => item.id === productId ? { ...item, quantity } : item)
            );
        }
    }

    function removeFromCart(productId) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }

    function getCartTotal() {
        return getCartProducts().reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function clearCart() {
        setCartItems([]);
    }

    return <CartContext.Provider value={{ cartItems, addToCart, getCartProducts, updateCartItemQuantity, removeFromCart, getCartTotal, clearCart }}>{children}</CartContext.Provider>
}

export function useCart(){

    const context = useContext(CartContext);

    return context;
}