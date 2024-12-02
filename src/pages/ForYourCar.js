import { useState} from 'react';
import "../styles/ForYourCar.css";

function ForYourCar() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="for-your-car-container">
      <h1>For Your Car</h1>
      {isSubmitted ? (
        <div className="thank-you-message">
          <p>Thank you for your submission!</p>
          <p>Note: An associate will reach out to you within 3 business days for products/services suitable for your car.</p>
        </div>
      ) : (
        <form className="car-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type:</label>
            <input type="text" id="vehicleType" placeholder="e.g., Sedan, SUV" required />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleYear">Vehicle Year:</label>
            <input type="number" id="vehicleYear" placeholder="e.g., 2020" required />
          </div>
          <div className="form-group">
            <label htmlFor="make">Make:</label>
            <input type="text" id="make" placeholder="e.g., Toyota" required />
          </div>
          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" placeholder="e.g., Camry" required />
          </div>
          <div className="form-group">
            <label htmlFor="vin">17-Character VIN Number:</label>
            <input type="text" id="vin" placeholder="e.g., 1HGCM82633A123456" maxLength="17" required />
          </div>
          <button type="submit" className="submit-button">Submit</button>
          <p className="note">
            Note: On submission, an associate will reach out to you within 3 business days for products/services suitable for your car.
          </p>
        </form>
      )}
    </div>
  );
}

export { ForYourCar };

