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
Top10StartStations = db['Top10StartStations']
Top10EndStations = db['Top10EndStations']
Top10Routes = db['Top10Routes']
weather_daily = db['weather_daily']
divvy_rides_by_month = db["divvy_rides_by_month"]
divvy_rides_by_season = db["divvy_rides_by_season"]
station_names = db['distinct_station_names']
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
        #"/api/v1.0/without_station<br/>"
        #"/api/v1.0/with_station<br/>"
        #"/api/v1.0/with_lat_long<br/>"
        #"/api/v1.0/route_distance<br/>"
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

#@app.route("/api/v1.0/without_station")

#def without_station():
    #"""Return a collection of rides without start and/or end stations."""
    #rides_without_station = list(db['withoutStationName'].find())
    #for ride in rides_without_station:
            #ride['_id'] = str(ride['_id'])  # Convert ObjectId to string
            #if 'weather_data' in ride:
                #ride['weather_data']['_id'] = str(ride['weather_data']['_id'])  # Convert ObjectId to string in nested document

    #return jsonify(rides_without_station)

#@app.route("/api/v1.0/with_station")

#def with_station():
    #"""Return a collection of rides with start and/or end stations."""
    #rides_with_station = list(db['withStationName'].find())
    #for ride in rides_with_station:
        #for ride in rides_with_station:
            #ride['_id'] = str(ride['_id'])  # Convert ObjectId to string
            #if 'weather_data' in ride:
                #ride['weather_data']['_id'] = str(ride['weather_data']['_id'])  # Convert ObjectId to string in nested document

    #return jsonify(rides_with_station)

#@app.route("/api/v1.0/with_lat_long")

#def with_lat_long():
    #"""Return a collection of rides with latitude and longitude."""
    #rides_with_lat_long = list(db['withLatLong'].find())

    # Convert ObjectId to string and remove nested _id from weather_data
   #rides_list = []
    #for ride in rides_with_lat_long:
        #ride['_id'] = str(ride['_id'])  # Convert ObjectId to string
        #if 'weather_data' in ride:
            #ride['weather_data']['_id'] = str(ride['weather_data']['_id'])  # Convert ObjectId to string in nested document
            #del ride['weather_data']['_id']  # Remove nested _id field
        #rides_list.append(ride)

    #return jsonify(rides_list)

#@app.route("/api/v1.0/route_distance")

#def route_distance():
    #"""Return a collection of rides with distance between start and end points."""
    #rides_with_distance = list(db['RouteDistance'].find())

     # Convert ObjectId to string and remove nested _id from weather_data
    #rides_distance_list = []
    #for ride in rides_with_distance:
        #ride['_id'] = str(ride['_id'])  # Convert ObjectId to string
        #ride['weather_data']['_id'] = str(ride['weather_data']['_id'])  # Convert ObjectId to string in nested document
        #del ride['weather_data']['_id']  # Remove nested _id field
        #rides_distance_list.append(ride)

    #return jsonify(rides_distance_list)

if __name__ == "__main__":
    app.run(debug=True)