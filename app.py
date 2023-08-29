# Import the dependencies
from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
from pymongo import MongoClient
import os

#############
#new for heroku
connection_string = os.environ.get("CONNECTION_STRING")
client = MongoClient(connection_string)
db = client.chicago_bikes
#################################################
# Database Setup
#################################################

# Connect to MongoDB
#mongo = MongoClient(port=27017)
#db = mongo.chicago_bikes

divvy_ridedata_merged = db['divvy_ridedata_merged']
Top10StartStations = db['Top10StartStations']
Top10EndStations = db['Top10EndStations']
Top10Routes = db['Top10Routes']
weather_daily = db['weather_daily']
divvy_rides_by_month = db["divvy_rides_by_month"]
divvy_rides_by_season = db["divvy_rides_by_season"]
station_names = db['distinct_station_names']
sig_prcp_no_month_string = db["sig_prcp_no_month_with_string_id"]
sig_prcp_yes_month_string = db["sig_prcp_yes_month_with_string_id"]
#withoutStation = db['withoutStationName']
#withStation = db['withStationName']
#withLatLong = db['withLatLong']
#RouteDistance = db['RouteDistance']

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
        "/api/v1.0/rides_by_month<br/>"
        "/api/v1.0/rides_by_season<br/>"
        "/api/v1.0/rides_sig_prcp_no_month<br/>"
        "/api/v1.0/rides_sig_prcp_yes_month<br/>"
    )

@app.route("/api/v1.0/stations")

def stations():
    """Return a list of stations from the dataset."""
    station_cursor = db['distinct_station_names'].find()
    return jsonify(list(station_cursor))


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

@app.route("/api/v1.0/rides_by_month")

def rides_by_month():
    """Return collection of rides by month."""
    divvy_rides_by_month = db["divvy_rides_by_month"].find()

    # Convert ObjectId to string
    monthly_rides = []
    for ride in divvy_rides_by_month:
        ride['_id'] = str(ride['_id']) # Convert ObjectId to string
        monthly_rides.append(ride)

    return jsonify(monthly_rides)

@app.route("/api/v1.0/rides_by_season")

def rides_by_season():
    """Return list of rides by season."""
    divvy_rides_by_season = db["divvy_rides_by_season"].find()
    return jsonify(list(divvy_rides_by_season))

@app.route("/api/v1.0/rides_sig_prcp_no_month")

def rides_sig_prcp_no_month():
    """Return list of rides by season."""
    sig_prcp_no_month_string = db["sig_prcp_no_month_with_string_id"].find()
    return jsonify(list(sig_prcp_no_month_string))

@app.route("/api/v1.0/rides_sig_prcp_yes_month")

def rides_sig_prcp_yes_month():
    """Return list of rides by season."""
    sig_prcp_yes_month_string = db["sig_prcp_yes_month_with_string_id"].find()
    return jsonify(list(sig_prcp_yes_month_string))

if __name__ == "__main__":
    #app.run(debug=True)
    #Switched to false for heroku
    app.run(debug=False)

    #new code
    # Use the Heroku-assigned port or default to 5000 if not provided
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)