# Import the dependencies
from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
from pymongo import MongoClient

#################################################
# Database Setup
#################################################

# Connect to MongoDB
mongo = MongoClient(port=27017)
db = mongo.chicago_bikes

divvy_ridedata_merged = db['divvy_ridedata_merged']

# Create a Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

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
        "/api/v1.0/start_stations<br/>"
    )

@app.route("/api/v1.0/stations")

def stations():
    """Return a list of stations from the dataset."""
    station_list = divvy_ridedata_merged.distinct("start_station_name")
    return jsonify(station_list)

@app.route("/api/v1.0/start_stations")

def start_stations():
    """Return a top to start stations from the dataset."""

    # Use aggregation pipeline to find top ten start stations 
    pipeline = [
        {
            "$group": {
                "_id": "$start_station_name",
                "count": {"$sum": 1},
                "latitude": {"$first": "$start_lat"},
                "longitude": {"$first": "$start_lng"}
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$limit": 11
        }
    ]

# Perform the aggregation
    start_station_result = list(divvy_ridedata_merged.aggregate(pipeline))
    return jsonify(start_station_result)

if __name__ == "__main__":
    app.run(debug=True)