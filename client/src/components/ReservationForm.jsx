import { useState } from 'react'
import './ReservationForm.css'

function ReservationForm() {
    return (
        <form>
            <p>Reserve a table</p>

            <l>Personal Information</l>
            <label htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname"></input>
            <label htmlFor="lname">Last name:</label>
            <input type="text" id="lname" name="lname"></input>
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob"></input>

            <l>Contact Information:</l>
            <label htmlFor="phonenumber">Phone number:</label>
            <input type="text" id="phonenumber" name="phonenumber"></input>

            <l>Reservation</l>
            <label htmlFor="resdate">Date</label>
            <input type="date" id="resdate" name="resdate"></input>
            <label htmlFor="restime">Time</label>
            <input type="time" id="restime" name="restime"></input>
            <label htmlFor="partysize">Party Size</label>
            <input type="number" id="partysize" name="partysize"></input>
            <label htmlFor="table">Table</label>
            <input type="text" id="table" name="table"></input>

            <input type="submit" value="Submit"></input>

        </form>

    )
}

export default ReservationForm