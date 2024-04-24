import { useState } from 'react'
import './GuestReservationForm.css'

function generateTimeOptions(startHour, endHour, interval) {
    const times = [];
    let hour = startHour;
    let minute = 30; // Start at 30 minutes for the 9:30 AM case

    while (hour < endHour || (hour === endHour && minute === 0)) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Convert 24-hour time format to 12-hour format for display
        const time12hr = new Date(`01/01/2020 ${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        times.push({ value: time, label: time12hr });

        minute += interval;
        if (minute >= 60) {
            minute = 0;
            hour++;
        }
    }
    return times;
}


function ReservationForm() {
    const timeOptions = generateTimeOptions(9, 21, 30);
    return (
        <>
        <h2>Make a reservation </h2>
        <hr></hr>
        <form>
            <hr></hr>

            <section>
                <h2>Reservation</h2>

                <label htmlFor="resdate">Date</label>
                <input type="date" id="resdate" name="resdate" required></input>

                <label htmlFor="restime">Time</label>
                <select id="restime" name="restime" required>
                    {timeOptions.map(time =>
                        <option key={time.value} value={time.value}>{time.label}</option>
                    )}
                </select>

                <label htmlFor="partysize">Party Size</label>
                <select id="partysize" name="partysize" required>
                    {[...Array(20).keys()].map(num =>
                        <option key={num + 1} value={num + 1}>{num + 1} people</option>
                    )}
                </select>
            </section>


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
                <input type="text" id="phonenumber" name="phonenumber" required></input>
            </section>

            <hr></hr>

            <input type="submit" value="Submit"></input>
        </form>
        </>
    );
}

export default ReservationForm;