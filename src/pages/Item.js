import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
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
                        <button className = "item-add-to-cart-button">Add To Cart</button>
                        </div>
                    </div>
            ) : null}
        </div>
    );
};
