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

    const handleBookService = () => {
        alert("Booking service feature coming soon!");
    };

    return (
        <div className="indiv-service-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : service ? (
                <div className={"service-details-container"}>
                    <img src={service.Image} alt={service.Name} className="service-details-image"/>
                    <div className="service-details-card">
                        <h2 className={"service-name"}>{service.Name}</h2>
                        <p className={"service-price"}>Price: ${service.Price}</p>
                        <p className={"service-des"}>{service.Description}</p>
                        <button className="more-info-btn" onClick={handleBookService}>
                            Book Service
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
