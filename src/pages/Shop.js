import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';
import { firestore } from '../backend/firebase.js';
import {collection, getDocs, doc, addDoc} from "firebase/firestore";

export const Shop = () => {

    const [inventoryByCategory, setInventoryByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const main_collection_ref = collection(firestore, "Inventory");
    const document_ref = doc(main_collection_ref, "QGUACBx2urBhlg7BFeFI");
    const sub_collection_ref = collection(document_ref, "Products");

    const categoryMapping = {
        1 : "Engine & Exhaust",
        2 : "Electrical & Ignition",
        3 : "Cooling & Air System",
        4 : "Braking & Suspension",
        5 : "Body & Accessories"
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await getDocs(sub_collection_ref);
                const items = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                // categorize items so we are not viewing everything at once
                const categorizedItems = items.reduce((acc, item) => {
                    const category = categoryMapping[item.Category] || 'Uncategorized'; // Assume 'Uncategorized' if Category is missing
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(item);
                    return acc;
                }, {});

                setInventoryByCategory(categorizedItems);
            } catch (err) {
                setError("Failed to load products.");
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

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
        <div className="shop-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {Object.keys(inventoryByCategory).map((category) => (
                        <div key={category} className="category-section">
                            <h2 className="category-name">{category}</h2>
                            <div className="product-list-shop">
                                {inventoryByCategory[category].slice(0, 4).map((product) => (
                                    <div key={product.id} className="product-card" onClick={() => navigate(`/item/${product.id}`)}>
                                        <img src={product.Image} alt={product.Name} className="product-image" />
                                        <h3>{product.Name}</h3>
                                        <p>Price: ${product.Price}</p>
                                        <button className = "add-to-cart-button"
                                                onClick={(event) =>{
                                                    event.stopPropagation();
                                                    addToCart(product);
                                                } }
                                            >
                                                Add To Cart
                                            </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="show-more-button"
                                onClick={() => navigate(`/category/${category}`)}
                            >
                                Show More
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};