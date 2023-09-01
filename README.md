Overview of contributions: 

- "database" notebook: imported 12 divvy ride csv files and set up 'chicago_bikes' database with 'divvy_ridedata' collection 
- "AH-queries" notebook: converted precipication value in 'weather_daily' collection from mm to inches; created new 'sig_prcp' field with 'yes' or 'no' based on significant precipitaton being >= .1 inches; created new field for avg temp based on morning, afternoon, and evening temps in the weather data
- "collections" folder: created a notebook to have a print(.find_one()) for each collection in the database for easier visibility; attempted to remove dictionary that was inside 'weather_data' field in several of the collections that had resulted from the initial merge of ride data and weather data, and was causing issues with Flask API routes - ultimately several routes were not needed/used 
- provided live assistance with queries in "final" and "all" notebookes 
- "app.py": created the routes for top start and end stations, top routes, daily weather, rides by month, and rides by season 
- visualizations: created the monthly rides line chart and seasonal rides pie chart in logic2.js with corresponding updates to html and css; found the header image and made the dashboard title banner  

Along with each group member doing their own pieces, we also were available to go over each other's questions/trobleshooting and worked on the majority of the pieces together! 