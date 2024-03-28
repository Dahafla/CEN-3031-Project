from flask import Flask, request
from dotenv import load_dotenv
import os
import pymysql

app = Flask(__name__)

load_dotenv()
db_host = os.getenv('HOST')
db_user = os.getenv('USER')
db_password = os.getenv('PASSWORD')
db_name = os.getenv('DATABASE')

# Connect to the database
def connect_db():
    connection = pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        db=db_name
    )
    
    cursor = connection.cursor()
    return connection, cursor

# Close connection to the database
def close_connection(connection, cursor):
    cursor.close()
    connection.close()

# Insert a guest reservation
@app.post('/reserve-guest-table')
def reserve():
    try:
        guest_first_name = request.form['fname']
        guest_last_name = request.form['lname']
        guest_dob = request.form['dob']
        guest_phone_number = request.form['phonenumber']
        reservation_date = request.form['resdate']
        reservation_time = request.form['restime']
        party_size = request.form['partysize']
        table_number = request.form['tablenumber']

        connection, cursor = connect_db()
        cursor.execute(f"INSERT INTO guest_reservations (guest_first_name, guest_last_name, guest_dob, guest_phone_number, reservation_date, reservation_time, party_size, table_number) VALUES ('{guest_first_name}', '{guest_last_name}', '{guest_dob}', '{guest_phone_number}', '{reservation_date}', '{reservation_time}', '{party_size}', '{table_number}')")
        connection.commit()
        close_connection(connection, cursor)
        return 'Table reserved!'
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)