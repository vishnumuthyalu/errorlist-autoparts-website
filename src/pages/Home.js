import React, {useEffect, useState} from 'react';
import "../styles/Home.css"
import { useNavigate } from 'react-router-dom';
import banner from '../assets/home-banner.png';
import {collection, doc, getDocs} from "firebase/firestore";
import {firestore} from "../backend/firebase";

export const Home = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const inventoryCollection = collection(firestore, "Inventory");
    const productsDoc = doc(inventoryCollection, "QGUACBx2urBhlg7BFeFI");
    const productList = collection(productsDoc, "Products");

    const servicesCollection = collection(firestore, "Services");
    const servicesDoc = doc(servicesCollection, "b4575LEUMxJ7FPzE0j68");
    const serviceList = collection(servicesDoc, "ServiceList");

    useEffect(() => {
        const fetchFeaturedItems = async () => {
            try {
                const productData = await getDocs(productList);
                const products = productData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const serviceData = await getDocs(serviceList);
                const services = serviceData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                setFeaturedProducts(selectRandomItems(products, 7));
                setFeaturedServices(selectRandomItems(services, 6));
            } catch (error) {
                console.error("Error fetching featured items: ", error);
            }finally {
                setLoading(false);
            }
        };
        fetchFeaturedItems();
    }, []);

    const selectRandomItems = (items, count) => {
        const shuffled = items.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    {/**/}
    return (
        <div className="home-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <img className={"banner-image"} src={banner} alt={"banner for home page"}/>
                    <div className={"featured-items"}>
                        <h1 className={"featured-name"}>Featured Products</h1>
                        <div className={"product-list-home"}>
                            {featuredProducts.map((product) => (
                                <div key={product.id} className={"product-card"}
                                     onClick={() => navigate(`/item/${product.id}`)}>
                                    <img src={product.Image} alt={product.Name} className={"product-image"}/>
                                    <h3>{product.Name}</h3>
                                    <p>Price: ${product.Price}</p>
                                    <button className={"add-to-cart-button"}>Add To Cart</button>
                                </div>
                            ))}
                        </div>
                        <h1 className={"featured-name"}>Featured Services</h1>
                        <div className={"service-list-home"}>
                            {featuredServices.map((service) => (
                                <div key={service.id} className={"service-card"}
                                     onClick={() => navigate(`/service/${service.id}`)}>
                                    <img src={service.Image} alt={service.Name} className={"service-image"}/>
                                    <h3 className={"service-name"}>{service.Name}</h3>
                                    <button
                                        className="more-info-btn"
                                        onClick={() => navigate(`/service/${service.id}`)}
                                    >
                                        More Info
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};