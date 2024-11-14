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

    const main_collection_ref = collection(firestore, "Services");
    const document_ref = doc(main_collection_ref, "b4575LEUMxJ7FPzE0j68");
    const sub_collection_ref = collection(document_ref, "ServiceList");

    useEffect(() => {
        const getServices = async () => {
            try {
                setLoading(true);
                const data = await getDocs(sub_collection_ref);
                const servicesList = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setServices(servicesList);
            } catch (err) {
                setError("Failed to load services.");
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, []);

    return (
            <div className="services-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="service-list">
                        {services.map((service) => (
                            <div key={service.id} className="service-card" onClick={() => navigate(`/service/${service.id}`)}>
                                <img src={service.Image} alt={service.Name} className="service-image" />
                                <h3>{service.Name}</h3>
                                <p>Price: ${service.Price}</p>
                                <button className="service-details-button">View Details</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };