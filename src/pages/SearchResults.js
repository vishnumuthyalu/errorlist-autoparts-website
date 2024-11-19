import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { firestore } from '../backend/firebase.js';
import { query } from 'firebase/database';
import { addDoc, collection, doc, where, getDocs } from "firebase/firestore";

export const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchName = queryParams.get('query');
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchName) {
            fetchResults(searchName);
        }
    }, [searchName]);

    const fetchResults = async (searchTerm) => {
        setLoading(true);
        setError(null);

        try {
            const subCollectionRef = collection(firestore, "Inventory/QGUACBx2urBhlg7BFeFI/Products");
            const dbQuery = query(subCollectionRef);

            const snapshot = await getDocs(dbQuery);
            const search = String(searchTerm).toLowerCase();

            if (!snapshot.empty) {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                let sortedData = [];
                if(search.includes(' ')){
                    const splitSearch = search.split(' ');
                    sortedData = data.filter(doc => splitSearch.some(element => doc.Name.toLowerCase().includes(element)));
                }
                else{
                    sortedData = data.filter(doc => doc.Name.toLowerCase().includes(search));
                }

                setResults(sortedData);
            } else {
                setResults([]);
            }
        } catch (err) {
            setError("Failed to fetch results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product) => {
        const cartRef = collection(firestore, "Cart");
        const docRef = doc(cartRef, "Checkout");
        const itemRef = collection(docRef, "Item");
        try {
            await addDoc(itemRef, {
                ...product,
                quantity: 1,
            });
            console.log("Item added to cart:", product);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <div>
            <h1>Search Results</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className="product-list-shop">
                {results.length > 0 ? (
                    results.map((item) => (
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
                    !loading && <p>No results found for "{searchName}"</p>
                )}
            </div>
        </div>
    );
};
