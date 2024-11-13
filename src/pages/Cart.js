import React, { useEffect, useState } from 'react';
import '../styles/Cart.css'
import { firestore } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const TAX_RATE = 0.1; // Example tax rate (10%)

    useEffect(() => {
        const fetchCartItems = async () => {
            const cartRef = collection(firestore, "Cart");
            const docRef = doc(cartRef, "Checkout");
            const itemRef = collection(docRef, "Item");
            const data = await getDocs(itemRef);
            /*
            */
            setCartItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchCartItems();
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);
    };
    
    const handleCheckout = async () => {
        try {
            const cartRef = collection(firestore, "cart");
            const docRef = doc(cartRef, "Checkout");
            const itemRef = collection(docRef, "Item");

            const cartSnapshot = await getDocs(itemRef);
            
            // Loop through each item in the cart and delete it
            cartSnapshot.forEach(async (item) => {
                const itemDocRef = doc(firestore, "cart", item.id);
                await deleteDoc(itemDocRef);
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
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                
                                <div className="cart-item-details">
                                    <h3>{item.Name}</h3>
                                    <p>Price: ${item.Price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p>Total: ${total.toFixed(2)}</p>
                        <p>Tax: ${tax.toFixed(2)}</p>
                        <p>Subtotal (with tax): ${subtotal.toFixed(2)}</p>
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};
