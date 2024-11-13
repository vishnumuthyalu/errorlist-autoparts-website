import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../backend/firebase';
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import '../styles/Item.css';

export const Item = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const itemRef = doc(firestore, "Inventory/QGUACBx2urBhlg7BFeFI/Products", itemId);
                const itemDoc = await getDoc(itemRef);

                if (itemDoc.exists()) {
                    setItem(itemDoc.data());
                } else {
                    setError("Item not found.");
                }
            } catch (err) {
                setError("Failed to load item details.");
                console.error("Error fetching item details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    const addToCart = async(product) => {
        const cartRef = collection(firestore, "Cart");
        const docRef = doc(cartRef, "Checkout");
        const itemRef = collection(docRef, "Item");
        try {
            await addDoc(itemRef, {
                ...product,
                quantity: 1, // default to 1 when first added
                });
                console.log("Item added to cart:", product);
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
    };

    return (
        <div className="item-page-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : item ? (
                <div className="item-details-container">
                    <img src={item.Image} alt={item.Name} className="item-image" />
                    <div className = "item-details">
                        <h2>{item.Name}</h2>
                        <p>Price: ${item.Price}</p>
                        <p>Quantity: {item.Quantity}</p>
                        <p>{item.Description}</p>
                        <button className = "item-add-to-cart-button"
                            onClick={(event) => {
                                event.stopPropagation();
                                addToCart(item);
                                }}
                                >
                                    Add To Cart
                            </button>
                        </div>
                    </div>
            ) : null}
        </div>
    );
};
