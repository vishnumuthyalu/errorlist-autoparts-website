import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import { firestore } from '../backend/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const TAX_RATE = 0.1;

    useEffect(() => {
        const fetchCartItems = async () => {
            const cartRef = collection(firestore, "Cart");
            const docRef = doc(cartRef, "Checkout");
            const itemRef = collection(docRef, "Item");
            const data = await getDocs(itemRef);

            setCartItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchCartItems();
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);
    };

    const handleQuantityChange = async (itemId, delta) => {
        
        const updatedItems = cartItems.map((item) => {
            if (item.id === itemId) {
                const newQuantity = Math.max(item.quantity + delta, 1);
                updateDoc(doc(firestore, "Cart", "Checkout", "Item", itemId), {
                   quantity: newQuantity
                });
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const removeItem = async (itemId) => {
        try {
            // Remove the item from Firebase
            await deleteDoc(doc(firestore, "Cart", "Checkout", "Item", itemId));
            
            // Remove the item from local state
            setCartItems(cartItems.filter((item) => item.id !== itemId));
            console.log(`Item with ID ${itemId} removed successfully.`);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleCheckout = async () => {
        try {
            const cartRef = collection(firestore, "Cart");
            const docRef = doc(cartRef, "Checkout");
            const itemRef = collection(docRef, "Item");
            const cartSnapshot = await getDocs(itemRef);
            
            cartSnapshot.forEach(async (item) => {
                await deleteDoc(doc(itemRef, item.id));
            });
            
            console.log("Cart cleared successfully.");
            navigate('/');
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const total = calculateTotal();
    const tax = total * TAX_RATE;
    const subtotal = total + tax;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="cart-list">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.Image} alt={item.Name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.Name}</h3>
                                    <p>Price: ${item.Price}</p>
                                </div>
                                
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                </div>
                                <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                                
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="checkout-container">
                <h2>Order Summary</h2>
                <p>Total: ${total.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Subtotal (with tax): ${subtotal.toFixed(2)}</p>
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};
