import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from '../backend/firebase';
import { doc, getDoc, collection } from "firebase/firestore";
import '../styles/NewBookService.css';

export const NewBookService = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleName: '',
        vehicleType: '',
        vehicleYear: '',
        date: '',
        time: '',
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Service Request:", formData);
        setBookingSuccess(true);
    };

    return (
        <div className="book-service-container">
            <h1>Book Service</h1>
            {bookingSuccess ? (
                <p className="success-message">Service successfully booked. Thank you!</p>
            ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="vehicleName"
                        placeholder="Vehicle Name"
                        value={formData.vehicleName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="vehicleType"
                        placeholder="Vehicle Type"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="vehicleYear"
                        placeholder="Vehicle Year"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="submit-button">Submit Service Request</button>
                </form>
            )}
        </div>
    );
};
