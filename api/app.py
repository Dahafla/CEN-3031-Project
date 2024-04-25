from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timedelta
import os
import pymysql

app = Flask(__name__)
CORS(app)

load_dotenv()
db_host = os.getenv('HOST')
db_user = os.getenv('USER')
db_password = os.getenv('PASSWORD')
db_name = os.getenv('DATABASE')

all_times = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00']

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

# # Populate the availability table for the first time
# @app.route('/populate')
# def populate_table():
#     today = datetime.now().date()
#     dates = [today + timedelta(days=i) for i in range(32)]
#     connection, cursor = connect_db()
#     cursor.execute("SELECT table_number FROM tables")
#     table_numbers = cursor.fetchall()
#     for table_number in table_numbers:
#         for date in dates:
#             for time in all_times:
#                 cursor.execute(f"INSERT INTO availability (table_number, date, time) VALUES ({table_number[0]}, '{date}', '{time}')")
#     connection.commit()
#     close_connection(connection, cursor)
#     return 'Table populated'

# Insert a guest reservation
@app.post('/reserve-guest-table')
def reserve_guest():
    try:
        guest_first_name = request.form['fname']
        guest_last_name = request.form['lname']
        # guest_dob = request.form['dob']
        guest_phone_number = request.form['phonenumber']
        reservation_date = request.form['resdate']
        reservation_time = request.form['restime']
        party_size = request.form['partysize']

        # Select the smallest table that can accommodate the party
        connection, cursor = connect_db()
        cursor.execute(f"SELECT table_number FROM tables WHERE table_size >= {party_size} ORDER BY table_size ASC")
        for table_number in cursor.fetchall():
            cursor.execute(f"SELECT * FROM availability WHERE table_number = {table_number[0]} AND date = '{reservation_date}' AND time = '{reservation_time}'")
            availability = cursor.fetchone()
            if availability is not None:
                break
        table_number = availability[0]
        # table_number = cursor.fetchone()[0]

        cursor.execute(f"INSERT INTO upcoming_reservations (first_name, last_name, phone_number, date, time, party_size, table_number) VALUES ('{guest_first_name}', '{guest_last_name}', '{guest_phone_number}', '{reservation_date}', '{reservation_time}', '{party_size}', '{table_number}')")
        cursor.execute(f"DELETE FROM availability WHERE table_number = {table_number} AND date = '{reservation_date}' AND time = '{reservation_time}'")
        connection.commit()
        close_connection(connection, cursor)
        return 'Table reserved!'
    except Exception as e:
        print(e)
        return str(e)

# Insert a customer reservation
@app.post('/reserve-customer-table')
def reserve_customer():
    try:
        customer_first_name = request.form['fname']
        customer_last_name = request.form['lname']
        customer_id = request.form['custid']
        customer_phone_number = request.form['phonenumber']
        reservation_date = request.form['resdate']
        reservation_time = request.form['restime']
        party_size = request.form['partysize']

        # Select the smallest table that can accommodate the party
        connection, cursor = connect_db()
        cursor.execute(f"SELECT table_number FROM tables WHERE table_size >= {party_size} ORDER BY table_size ASC")
        for table_number in cursor.fetchall():
            cursor.execute(f"SELECT * FROM availability WHERE table_number = {table_number[0]} AND date = '{reservation_date}' AND time = '{reservation_time}'")
            availability = cursor.fetchone()
            if availability is not None:
                break
        table_number = availability[0]
        # table_number = cursor.fetchone()[0]

        cursor.execute(f"INSERT INTO upcoming_reservations (first_name, last_name, phone_number, date, time, party_size, table_number, customer_id) VALUES ('{customer_first_name}', '{customer_last_name}', '{customer_phone_number}', '{reservation_date}', '{reservation_time}', {party_size}, {table_number}, {customer_id})")
        cursor.execute(f"DELETE FROM availability WHERE table_number = {table_number} AND date = '{reservation_date}' AND time = '{reservation_time}'")
        connection.commit()
        close_connection(connection, cursor)
        return 'Table reserved!'
    except Exception as e:
        print(e)
        return str(e)

# Check for a customer account
@app.get('/customer-login')
def check_customer_account():
    try:
        phone_number = request.args.get('phone')
        print(phone_number)
        connection, cursor = connect_db()
        cursor.execute(f"SELECT * FROM customers WHERE phone_number = '{phone_number}'")
        customer = cursor.fetchone()
        close_connection(connection, cursor)
        if customer is not None:
            return {
                'customer_id': customer[0],
                'first_name': customer[1],
                'last_name': customer[2],
                'phone_number': customer[3]
            }
        else:
            return {
                'phone_number': phone_number
            }
    except Exception as e:
        print(e)
        return str(e)

# Create a customer account
@app.post('/create-customer-account')
def create_customer_account():
    try:
        first_name = request.form['fname']
        last_name = request.form['lname']
        phone_number = request.form['phonenumber']
        connection, cursor = connect_db()
        cursor.execute(f"INSERT INTO customers (first_name, last_name, phone_number) VALUES ('{first_name}', '{last_name}', '{phone_number}')")
        cursor.execute(f"SELECT customer_id FROM customers WHERE phone_number = '{phone_number}'")
        customer_id = cursor.fetchone()[0]
        cursor.execute(f"UPDATE upcoming_reservations SET customer_id = {customer_id} WHERE phone_number = '{phone_number}'")
        connection.commit()
        close_connection(connection, cursor)
        return {
                'customer_id': customer_id,
                'first_name': first_name,
                'last_name': last_name,
                'phone_number': phone_number
            }
    except Exception as e:
        return str(e)

# Check availbility for tables with X seats
@app.get('/check-availability')
def check_availability():
    try:
        party_size = request.args.get('party_size')
        date = request.args.get('date')
        connection, cursor = connect_db()
        cursor.execute(f"SELECT table_number FROM tables WHERE table_size >= {party_size}")
        large_enough_tables = cursor.fetchall()
        all_availabile_tables = []
        for table in large_enough_tables:
            cursor.execute(f"SELECT time FROM availability WHERE table_number = {table[0]} AND date = '{date}'")
            available_tables = cursor.fetchall()
            all_availabile_tables.extend(available_tables)
        close_connection(connection, cursor)
        # Convert timedelta objects to strings
        all_availabile_tables = [str(time[0]) for time in all_availabile_tables]
        all_availabile_tables = list(set(all_availabile_tables))
        return all_availabile_tables
    except Exception as e:
        print(e)
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)