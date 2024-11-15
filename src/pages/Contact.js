import React from 'react';
import '../styles/Contact.css';
import riaImage from '../assets/ria.jpg';
import connorImage from '../assets/connor.jpg';
import thanushImage from '../assets/thanush.jpg';
import vishnuImage from '../assets/vishnu.jpg';
import austinImage from '../assets/austin.jpg';
import kosisochukwuImage from '../assets/kosisochukwu.jpg';

export const Contact = () => {
    const teamMembers = [
        {name: "Ria James", email: "ria.james@my.utsa.edu", image: riaImage},
        {name: "Connor Haubrich", email: "connor.haubrich@my.utsa.edu", image: connorImage},
        {name: "Thanush Koshekay", email: "thanush.koshekay@my.utsa.edu", image: thanushImage},
        {name: "Vishnu Muthyalu", email: "vishnu.muthyalu@my.utsa.edu", image: vishnuImage},
        {name: "Austin Barthel", email: "barthelaus@gmail.com", image: austinImage},
        {name: "Kosisochukwu Mogekwu", email: "kosimogs@gmail.com", image: kosisochukwuImage }
        
    ]
    return (
        <div className={"contact-container"}>
            <h1>Contact Us</h1>
            <div className="team-grid">
                {teamMembers.map((member, index)=>(
                    <div className="team-member" key={index}>
                        <img src={member.image} alt={member.name} className='member-photo'/>
                        <h2>{member.name}</h2>
                        <button
                            className="email-button"
                            onClick={() => window.location.href = `mailto:${member.email}`}
                        >
                            Send An Email!
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};