import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './GuestReservationForm.css'

function CreateCustomerAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const customer_data = location.state;

    function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
    
        fetch('http://127.0.0.1:5000/create-customer-account', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            navigate('/customer-reservation', { state: data });
        })
        .catch(error => {
            console.error('There was a problem with your reservation:', error);
        });
    }

    return (
        <>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
            <hr></hr>

            <section>
                <h2>Personal Information</h2>
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" name="fname" required></input>
                <label htmlFor="lname">Last name:</label>
                <input type="text" id="lname" name="lname" required></input>
            </section>

            <hr></hr>

            <section>
                <h2>Contact Information:</h2>
                <label htmlFor="phonenumber">Phone number:</label>
                <input type="text" id="phonenumber" name="phonenumber" value={customer_data.phone_number} required></input>
            </section>

            <hr></hr>

            <input type="submit" value="Create Account"></input>
        </form>
        </>
    );
}

export default CreateCustomerAccount;