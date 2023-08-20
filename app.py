# Import the dependencies
from flask import Flask, jsonify
import pymongo
from pymongo import MongoClient

#################################################
# Database Setup
#################################################

# Connect to MongoDB
mongo = MongoClient(port=27017)
db = mongo.chicago_bikes

divvy_rides = db['divvy_ridedata']

# Create a Flask app
app = Flask(__name__)

# Define your Flask routes

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/api/v1.0/stations<br/>"
    )

@app.route("/api/v1.0/stations")

def stations():
    """Return a list of stations from the dataset."""
    station_list = divvy_rides.distinct("start_station_name")
    return jsonify(station_list)

if __name__ == "__main__":
    app.run(debug=True)