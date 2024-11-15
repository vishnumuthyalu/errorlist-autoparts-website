import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from '../backend/firebase';
import { doc, getDoc, collection } from "firebase/firestore";
import '../styles/ServiceDetails.css';

export const ServiceDetails = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                setLoading(true);
                const mainCollectionRef = collection(firestore, "Services");
                const documentRef = doc(mainCollectionRef, "b4575LEUMxJ7FPzE0j68");
                const subCollectionRef = collection(documentRef, "ServiceList");
                const serviceDocRef = doc(subCollectionRef, serviceId);

                const docSnap = await getDoc(serviceDocRef);
                if (docSnap.exists()) {
                    setService({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Service not found.");
                }
            } catch (err) {
                setError("Failed to load service details.");
                console.error("Error fetching service details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetails();
    }, [serviceId]);

    <button
        className="book-service-button"
        onClick={() => navigate('/book-service')}
    >
        Book Service
    </button>

    const handleBookService = () => {
        navigate('/book-service');
    };


    return (
        <div className="service-details-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : service ? (
                <div className="service-details-card">
                    <img src={service.Image} alt={service.Name} className="service-details-image" />
                    <h2>{service.Name}</h2>
                    <p>{service.Description}</p>
                    <p>Price: ${service.Price}</p>
                    <button className="book-service-button" onClick={handleBookService}>
                        Book Service
                    </button>
                </div>
            ) : (
                <p>Service not found.</p>
            )}
        </div>
    );
};
