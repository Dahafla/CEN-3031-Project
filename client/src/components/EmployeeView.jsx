import { useState, useEffect } from 'react';
// import '../App.css';

const EmployeeView = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/host')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReservations(data.reservations);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }, []); // Empty dependency array to run the effect only once after the initial render

    return (
        <div>
            <h2>Upcoming Reservations</h2>
            <ul>
                {reservations.map((reservation, index) => (
                    <li key={index}>
                        {reservation.guest_first_name} {reservation.guest_last_name} - Date: {reservation.reservation_date}, Time: {reservation.reservation_time}, Party Size: {reservation.party_size}, Table: {reservation.table_number}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeView;