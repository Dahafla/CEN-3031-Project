from flask import Flask
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

if __name__ == '__main__':
    app.run(debug=True)