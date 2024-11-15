import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';
import { firestore } from '../backend/firebase.js';
import { collection, getDocs, doc } from "firebase/firestore";

export const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    return (
        <div className="service-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h1>Services</h1>
                    <div className="service-list">
                        {services.map((service) => (
                            <div key={service.id} className="service-card"
                                 onClick={() => navigate(`/service/${service.id}`)}>
                                <img src={service.Image} alt={service.Name} className="service-image"/>
                                <h3>{service.Name}</h3>
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
            )}
        </div>
    );
};
