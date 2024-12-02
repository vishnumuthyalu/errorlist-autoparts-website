import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../backend/firebase';
import { collection, getDocs, doc, query, where, setDoc} from "firebase/firestore";
import '../styles/Category.css'

export const Category = () => {
    const { categoryName } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('default'); // Added sorting state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryItems = async () => {
            try {
                setLoading(true);

                const mainCollectionRef = collection(firestore, "Inventory");
                const documentRef = doc(mainCollectionRef, "QGUACBx2urBhlg7BFeFI");
                const subCollectionRef = collection(documentRef, "Products");

                const itemsQuery = query(subCollectionRef, where("Category", "==", getCategoryId(categoryName)));
                const data = await getDocs(itemsQuery);

                const categoryItems = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(categoryItems);
            } catch (err) {
                setError("Failed to load items for this category.");
                console.error("Error fetching category items:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryItems();
    }, [categoryName]);

    const getCategoryId = (name) => {
        const categoryMapping = {
            "Engine & Exhaust": 1,
            "Electrical & Ignition": 2,
            "Cooling & Air System": 3,
            "Braking & Suspension": 4,
            "Body & Accessories": 5,
        };
        return categoryMapping[name] || null;
    };

    const addToCart = async (product) => {
        const cartRef = collection(firestore, "Cart");
        const docRef = doc(cartRef, "Checkout");
        const itemRef = collection(docRef, "Item");
    
        try {
            // Use product.Name as the document ID
            await setDoc(doc(itemRef, product.Name), {
                ...product,
                quantity: 1, // Default quantity when first added
            });
            console.log("Item added to cart:", product);
            alert(product.Name + " has been added to the cart.");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    

    const handleSortChange = (e) => {
        setSortOrder(e.target.value); // Added sorting change handler
    };

    // Sorting the items based on sortOrder
    const sortedItems = [...items];
    if (sortOrder === 'low-to-high') {
        sortedItems.sort((a, b) => a.Price - b.Price);
    } else if (sortOrder === 'high-to-low') {
        sortedItems.sort((a, b) => b.Price - a.Price);
    } else if (sortOrder === 'default') {
        sortedItems.sort((a, b) => a.Name.localeCompare(b.Name));
    }

    return (
        <div className="category-page-container">
            <h1>{categoryName}</h1>
            <div className="sort-dropdown">
                <label htmlFor="sortOrder">Sort by Price: </label>
                <div className="custom-dropdown">
                    <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="product-list-shop">
                    {sortedItems.length > 0 ? (
                        sortedItems.map((item) => (
                            <div key={item.id} className="product-card" onClick={() => navigate(`/item/${item.id}`)}>
                                <img src={item.Image} alt={item.Name} className="product-image"/>
                                <h3>{item.Name}</h3>
                                <p>Price: ${item.Price}</p>
                                <button className="add-to-cart-button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            addToCart(item);
                                        }}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products available in this category.</p>
                    )}
                </div>
            )}
        </div>
    );
};

