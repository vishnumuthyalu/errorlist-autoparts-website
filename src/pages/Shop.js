import {useState, useEffect} from 'react';
import '../styles/Shop.css';
import { firestore } from '../firebase.js';
import { collection, getDocs, doc } from "firebase/firestore";

export const Shop = () => {

    const [Inventory, setInventory] = useState([]);

    const main_collection_ref = collection(firestore, "Inventory");
    const document_ref = doc(main_collection_ref, "QGUACBx2urBhlg7BFeFI");
    const sub_collection_ref = collection(document_ref, "Products");

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(sub_collection_ref);
            const productList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));  // Corrected doc.data()
            setInventory(productList);  // Set the inventory data
            console.log(data);
        };

        getProducts();
    }, [sub_collection_ref]);

    return (
        <div className={"shop-container"}>
            <h1>Shop</h1>
            <div className={"product-list"}>
                {Inventory.length > 0 ? (
                    Inventory.map(product => (
                        <div key={product.id} className={"product-card"}>
                            <img src={product.Image} alt={product.Name} className={"product-image"} />
                            <h2>{product.Name}</h2>
                            <p>Price: ${product.Price}</p>
                            <p>Quantity: {product.Quantity}</p>
                        </div>
                    ))
                ):(
                    <p>No Products Available</p>
                )}
            </div>
        </div>
    );
};