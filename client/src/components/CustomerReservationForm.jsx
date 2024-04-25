import { useState, useEffect } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom';
import './GuestReservationForm.css'

function CustomerReservationForm() {
    const today = new Date().toISOString().split('T')[0];
    const [party_size, setPartySize] = useState(0);
    const [date, setDate] = useState(today);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [timeDisplay, setTimeDisplay] = useState(0);
    const location = useLocation();
    const customer_data = location.state;

    function handlePartySizeChange(event) {
        setPartySize(event.target.value);
    }

    function handleDateChange(event) {
        setDate(event.target.value);
    }

    useEffect(() => {
        if (party_size !== 0 && date !== today) {
            console.log('Checking availability...');
            fetch('http://127.0.0.1:5000/check-availability?party_size=' + party_size + '&date=' + date)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                setAvailableTimes(data);
                setTimeDisplay(1);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    }, [party_size, date])

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting reservation...');
        
        const formData = new FormData(event.target);
    
        fetch('http://127.0.0.1:5000/reserve-customer-table', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Reservation successful');
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with your reservation:', error);
        });
    }

    return (
        <>
        <h1>Make a reservation </h1>

        <form onSubmit={handleSubmit}>
            <hr></hr>

            <section>
                <h2>Personal Information</h2>
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" name="fname" value={customer_data.first_name} readOnly required></input>
                <label htmlFor="lname">Last name:</label>
                <input type="text" id="lname" name="lname" value={customer_data.last_name} readOnly required></input>
                <input type="hidden" id="custid" name="custid" value={customer_data.customer_id} readOnly required></input>
            </section>

            <hr></hr>

            <section>
                <h2>Contact Information:</h2>
                <label htmlFor="phonenumber">Phone number:</label>
                <input type="text" id="phonenumber" name="phonenumber" value={customer_data.phone_number} readOnly required></input>
            </section>
            

            <hr></hr>

            <section>
                <h2>Reservation</h2>

                <label htmlFor="partysize">Party Size</label>
                <select id="partysize" name="partysize" onChange={handlePartySizeChange} required>
                    <option value="" selected disabled hidden></option>
                    {[...Array(12).keys()].map(num =>
                        <option key={num + 1} value={num + 1}>{num + 1} people</option>
                    )}
                </select>
                <small>Note: If you are unsure of the size of your party, please select the MAXIMUM number of people that may attend your reservation.</small>

                <label htmlFor="resdate">Date</label>
                <input type="date" id="resdate" name="resdate" min={new Date().toISOString().split('T')[0]} max={new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} onChange={handleDateChange} required></input>

                <>
                {timeDisplay === 0 ? (
                    <h6>Please select a party size and date to view available reservation times.</h6>
                ) : ( 
                    <>
                {availableTimes.length === 0 ? (
                    <h5>Sorry, there are no tables big enough for your party on this date. Please select another date.</h5>
                ) : (
                    <>
                    <label htmlFor="restime">Time</label>
                    <select id="restime" name="restime" required>
                        <option value="" selected disabled hidden></option>
                        {availableTimes.map(time =>
                            <option key={time} value={time}>{new Date(`01/01/2022 ${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</option>
                        )}
                    </select> 
                    <small>Restaurant hours are 10 AM to 10 PM.</small>
                    </>
                )}</>
                )}
                </>
            </section>

            <hr></hr>

            <input type="submit" value="Submit"></input>
        </form>
        </>
    );
}

export default CustomerReservationForm;