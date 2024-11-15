import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';
import { firestore } from '../backend/firebase.js';
import { collection, getDocs, doc } from "firebase/firestore";

export const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const navigate = useNavigate();

    const mainCollectionRef = collection(firestore, "Services");
    const documentRef = doc(mainCollectionRef, "b4575LEUMxJ7FPzE0j68");
    const subCollectionRef = collection(documentRef, "ServiceList");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await getDocs(subCollectionRef);
                const servicesList = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setServices(servicesList);
            } catch (err) {
                setError("Failed to load services.");
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const showMoreServices = () => {
        setVisibleCount(services.length);
    };

    return (
        <div className="shop-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <div className="product-list-shop">
                        {services.slice(0, visibleCount).map((service) => (
                            <div key={service.id} className="product-card">
                                <img src={service.Image} alt={service.Name} className="product-image" />
                                <h3>{service.Name}</h3>
                                <p>Price: ${service.Price}</p>
                                <button
                                    className="more-info-button"
                                    onClick={() => navigate(`/service/${service.id}`)}
                                >
                                    More Info
                                </button>
                            </div>
                        ))}
                    </div>
                    {visibleCount < services.length && (
                        <button className="show-more-button" onClick={showMoreServices}>
                            Show More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
