# Import Dependencies

import pandas as pd
import csv
import json
from flask import Flask, render_template, request, jsonify
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask_sqlalchemy import SQLAlchemy

# Flask Setup
app = Flask(__name__)

# The database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wwii_flights"

db = SQLAlchemy(app)


#Reflect an existing database into a new model
Base = automap_base()

#Reflect the tables
Base.prepare(db.engine, reflect=True)

# Save reference to the table
Missions = Base.classes.wwii_flights
total_flights = Base.classes.total_flights
aircraft = Base.classes.aircraft
missionsByYear = Base.classes.missions
country_flying = Base.classes.flying_country
starburst = Base.classes.starburst
flights_by_year = Base.classes.flights_by_year

# Route Home Page
@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")

@app.route("/Columns")
def WWII_Flight_Columns():
    """Return WWII flight Columns"""

    # Using Pandas
    stmt = db.session.query(Missions).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jsonify(list(df.columns))

@app.route("/flights")
def total_flight_missions():
    """Return Total Flight Missions"""

    flight = db.session.query(total_flights.name,
        total_flights.missions,
        total_flights.latitude,
        total_flights.longitude)

    flight_list = []
    for flights in flight:
        flight_data = {}
        flight_data['name'] = flights.name
        flight_data['missions'] = flights.missions
        flight_data['latitude'] = flights.latitude
        flight_data['longitude'] = flights.longitude
        flight_list.append(flight_data)

    return jsonify(flight_list)

@app.route("/geo_flights")
def geo_flights():

    flight = db.session.query(total_flights.name,
        total_flights.missions,
        total_flights.latitude,
        total_flights.longitude)
    
    flight_list = []
    for flights in flight:
        feature = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [flights.longitude, flights.latitude],
            },
            'properties': {
                'missions': flights.missions,
                'name': flights.name
            }
        }
        flight_list.append(feature)
    return json.dumps(flight_list)    

@app.route("/aircraft")
def aircraft_flights():

    aircraft_used = db.session.query(aircraft.aircraft, aircraft.flights)

    aircraft_list =[]
    for aircrafts in aircraft_used:
        aircraft_data = {}
        aircraft_data['type'] = aircrafts.aircraft
        aircraft_data['flights'] = aircrafts.flights
        aircraft_list.append(aircraft_data)

    return jsonify(aircraft_list)

@app.route("/yearly_missions")
def yearly_missions():

    missions_by_year = db.session.query(missionsByYear.year, missionsByYear.flights)

    year_list =[]
    for years in missions_by_year:
        year_data = {}
        year_data['year'] = years.year
        year_data['missions'] = years.flights
        year_list.append(year_data)

    return jsonify(year_list)

@app.route("/country_flying")
def country_flying_year():

    missions_by_country = db.session.query(country_flying.first,
                                            country_flying.year,
                                            country_flying.country,
                                            country_flying.missions)

    country_list =[]
    for country in missions_by_country:
        country_data = {}
        country_data['index'] = country.first
        country_data['year'] = country.year
        country_data['country'] = country.country
        country_data['missions'] = country.missions
        country_list.append(country_data)

    return jsonify(country_list)

@app.route("/starburst")
def starburst_plot():

    starburstP = db.session.query(starburst.key,
                                  starburst.year,
                                  starburst.aircraft,
                                  starburst.tgt_country,
                                  starburst.ally_country,
                                  starburst.flights)

    starburst_list =[]
    for sb in starburstP:
        starburst_data = {}
        starburst_data['key'] = sb.key
        starburst_data['year'] = sb.year
        starburst_data['aircraft'] = sb.aircraft
        starburst_data['target_country'] = sb.tgt_country
        starburst_data['ally_country'] = sb.ally_country
        starburst_data['flights'] = sb.flights
        starburst_list.append(starburst_data)

    return jsonify(starburst_list)

@app.route("/flights_by_year")
def year_flights():

    dFlights = db.session.query(flights_by_year.key,
                                flights_by_year.year,
                                flights_by_year.aircraft_name,
                                flights_by_year.missions)

    yFlights_list =[]
    for yflights in dFlights:
        yflights_data = {}
        yflights_data['key'] = yflights.key
        yflights_data['year'] = yflights.year
        yflights_data['aircraft_name'] = yflights.aircraft_name
        yflights_data['missions'] = yflights.missions
        yFlights_list.append(yflights_data)

    return jsonify(yFlights_list)

if __name__ == '__main__':
    app.run(debug=True)
