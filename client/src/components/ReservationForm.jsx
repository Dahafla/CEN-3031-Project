import { useState } from 'react'
import './ReservationForm.css'

function ReservationForm() {
    return (
        <form>
            <h1>Reserve a table</h1>
            <hr></hr>

            <section>
                <h2>Personal Information: </h2>
            </section>

            <section>
                <label htmlFor="fname">First name: </label>
                <input type="text" id="fname" name="fname"></input>
                <label htmlFor="lname">Last name: </label>
                <input type="text" id="lname" name="lname"></input>
            </section>

            <section>
                
                <label htmlFor="dob">Date of Birth: </label>
                <input type="date" id="dob" name="dob"></input>
            </section>

            <hr></hr>

            <section>
                <h2>Contact Information: </h2>
            </section>

            <section>
                <label htmlFor="phonenumber">Phone number: </label>
                <input type="text" id="phonenumber" name="phonenumber"></input>
            </section>

            <hr></hr>

            <section>
                <l>Reservation: </l>
            </section>

            <section>
                <label htmlFor="resdate">Date: </label>
                <input type="date" id="resdate" name="resdate"></input>
                <label htmlFor="restime">Time: </label>
                <input type="time" id="restime" name="restime"></input>
            </section>

            <section>
                <label htmlFor="partysize">Party Size: </label>
                <input type="number" id="partysize" name="partysize"></input>
                <label htmlFor="table">Table: </label>
                <input type="text" id="table" name="table"></input>
            </section>

            <hr></hr>

            <input type="submit" id="Submit" name="Submit"></input>

        </form>

    )
}

export default ReservationForm