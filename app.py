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
weather_daily = db['weather_daily']
divvy_ridedata_merged = db['divvy_ridedata_merged']
withoutStation = db['withoutStationName']
withStation = db['withStationName']
withLatLong = db['withLatLong']
Top10StartStations = db['Top10StartStations']
Top10EndStations = db['Top10EndStations']
Top10Routes = db['Top10Routes']
RouteDistance = db['RouteDistance']
divvy_rides_by_month = db["divvy_rides_by_month"]
divvy_rides_by_season = db["divvy_rides_by_season"]

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
        "/api/v1.0/end_stations<br/>"
        "/api/v1.0/top_routes<br/>"
    )

@app.route("/api/v1.0/stations")

def stations():
    """Return a list of stations from the dataset."""
    station_list = divvy_ridedata_merged.distinct("start_station_name")
    return jsonify(station_list)

@app.route("/api/v1.0/start_stations")

def start_stations():
    """Return a top to start stations from the dataset."""
    Top10StartStations = db['Top10StartStations'].find()
    return jsonify(list(Top10StartStations))

@app.route("/api/v1.0/end_stations")

def end_stations():
    """Return a top to start stations from the dataset."""
    Top10EndStations = db['Top10EndStations'].find()
    return jsonify(list(Top10EndStations))

@app.route("/api/v1.0/top_routes")

def top_routes():
    """Return a top to start stations from the dataset."""
    Top10EndStations = db['Top10EndStations'].find()
    return jsonify(list(Top10EndStations))

if __name__ == "__main__":
    app.run(debug=True)