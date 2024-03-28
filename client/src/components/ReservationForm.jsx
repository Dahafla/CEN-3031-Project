import { useState } from 'react'
import '../App.css'

function ReservationForm() {
    return (
        <form>
            <h2>Reserve a table</h2>
            <hr></hr>

            <section>
                <h3>Personal Information</h3>
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" name="fname" required></input>
                <label htmlFor="lname">Last name:</label>
                <input type="text" id="lname" name="lname" required></input>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required></input>
            </section>

            <hr></hr>

            <section>
                <h3>Contact Information:</h3>
                <label htmlFor="phonenumber">Phone number:</label>
                <input type="tel" id="phonenumber" name="phonenumber" required></input>
            </section>

            <hr></hr>

            <section>
                <h3>Reservation</h3>

                    <label htmlFor="resdate">Date</label>
                    <input type="date" id="resdate" name="resdate" required></input>
                    <label htmlFor="restime">Time</label>
                    <input type="time" id="restime" name="restime" required></input>
                    <label htmlFor="partysize">Party Size</label>
                    <input type="number" id="partysize" name="partysize" required></input>
                    <label htmlFor="table">Table</label>
                    <input type="number" id="table" name="table" required></input>
            </section>

            <hr></hr>

            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default ReservationForm;