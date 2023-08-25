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
# weather_daily = db['weather_daily']
# withoutStation = db['withoutStationName']
# withStation = db['withStationName']
# withLatLong = db['withLatLong']
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
        "/api/v1.0/daily_weather<br/>"
        "/api/v1.0/without_station<br/>"
        "/api/v1.0/with_station<br/>"
        "/api/v1.0/with_lat_long<br/>"
        "/api/v1.0/route_distance<br/>"
        "/api/v1.0/rides_by_month<br/>"
        "/api/v1.0/rides_by_season<br/>"
    )

@app.route("/api/v1.0/stations")

def stations():
    """Return a list of stations from the dataset."""
    station_list = divvy_ridedata_merged.distinct("start_station_name")
    return jsonify(station_list)

@app.route("/api/v1.0/start_stations")

def start_stations():
    """Return top ten start stations from the dataset."""
    Top10StartStations = db['Top10StartStations'].find()
    return jsonify(list(Top10StartStations))

@app.route("/api/v1.0/end_stations")

def end_stations():
    """Return top ten end stations from the dataset."""
    Top10EndStations = db['Top10EndStations'].find()
    return jsonify(list(Top10EndStations))

@app.route("/api/v1.0/top_routes")

def top_routes():
    """Return a list of top ten routes from the dataset."""
    Top10Routes = db['Top10Routes'].find()
    return jsonify(list(Top10Routes))

@app.route("/api/v1.0/daily_weather")

def daily_weather():
    """Return daily_weather dataset."""
    weather_daily = db['weather_daily'].find()

     # Convert ObjectId to string in each document
    weather_daily = [
        {**weather, '_id': str(weather['_id'])} for weather in weather_daily
    ]

    return jsonify(list(weather_daily))

@app.route("/api/v1.0/without_station")

def without_station():
    """Return list of rides without start and/or end stations."""
    withoutStation = db['withoutStationName'].find()

    # Convert ObjectId to string in each document and remove nested _id from weather_data
    rides_without_station = [
        {
            **ride,
            '_id': str(ride['_id']),
            'weather_data': {
                key: value for key, value in ride['weather_data'].items() if key != '_id'
            }
        } for ride in withoutStation  # Use withoutStation here
    ]

    return jsonify(list(rides_without_station))

@app.route("/api/v1.0/with_station")

def with_station():
    """Return list of rides with start and/or end stations."""
    withStation = db['withStationName'].find()

    # Convert ObjectId to string in each document and remove nested _id from weather_data
    rides_with_station = [
        {
            **ride,
            '_id': str(ride['_id']),
            'weather_data': {
                key: value for key, value in ride['weather_data'].items() if key != '_id'
            }
        } for ride in withStation  # Use withStation here
    ]

    return jsonify(list(rides_with_station))

@app.route("/api/v1.0/with_lat_long")

def with_lat_long():
    """Return data based on latitude and longitude."""

    return jsonify(formatted_rides)

@app.route("/api/v1.0/route_distance")

def route_distance():
    """Return list of rides with distance between start and end points."""
    RouteDistance = db['RouteDistance'].find()
    return jsonify(list(RouteDistance))

@app.route("/api/v1.0/rides_by_month")

def rides_by_month():
    """Return list of rides by month."""
    divvy_rides_by_month = db["divvy_rides_by_month"].find()
    return jsonify(list(divvy_rides_by_month))

@app.route("/api/v1.0/rides_by_season")

def rides_by_season():
    """Return list of rides by season."""
    divvy_rides_by_season = db["divvy_rides_by_season"].find()
    return jsonify(list(divvy_rides_by_season))

if __name__ == "__main__":
    app.run(debug=True)