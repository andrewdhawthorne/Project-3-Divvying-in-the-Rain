# Project-3-Divvying-in-the-Rain-Side Project
Is there anything that will stop bikers in Chicago? 

Link to GitHub branch: https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/

## Team Members for this Section
* Alicia Hlavac 
## Team Members for the Project
* Jason Pealy
* Andrew Hawthorne
* Ben Richardson
* Aileen Alvarez

## Table of Contents

* [Project Overview](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#project-overview)
* [Languages Used](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#languages-used)
* [Processing and Using the Data for Interactive Visualizations and Statistical Analysis](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#processing-and-using-the-data-for-interactive-visualizations-and-statistical-analysis)
* [Key Takeaways](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#key-takeaways)
* [Citations](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#citations)

 ## Project Overview

My goal was to answer the following questions about Divvy riders between January 1st, 2022 to December 31st, 2022:
* What was the average minimum and maximum temperature over this timeframe?
* What was the average precipitation over this timeframe?
* How many Divvy riders were there based on precipitation, separated into both seasons and months?
* How did the population vary by the Top 10 Starting Stations and Top 10 Ending Stations?


## Languages Used
* Python: pyMongo, flask, flask_cors, pandas, matplotlib, scipy
* JavaScript
* HTML
* CSS

## Processing and Using the Data for Interactive Visualizations and Statistical Analysis
1. Imported data, ran partner's queries, and ensured accuracy of data.
2. Used [logic3.js](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/static/js/logic3.js) file to create charts and dropdown menu chart where either months or seasons can be selected.
   
Dropdown chart of Divvy Rides by Precipitation Level with months displayed, Average Minimum and Maximum Temperature Per Month, and Average Precipitation per Month:
![Monthly Chart Showing](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/assets/127240852/c84bc270-01a2-4958-bb74-52905fb1a775)


Dropdown chart of Divvy Rides by Precipitation Level with seasons displayed, Average Minimum and Maximum Temperature Per Month, and Average Precipitation per Month:
![Season Chart Showing](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/assets/127240852/1776a98c-6b66-46e7-98b6-3f17385a213e)

4. Created a new database (db2) to store new data information in, along with copies of the collections for Top10StartStations and Top10EndStations. 
5. Used [Census.ipynb](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/Census.ipynb) file to pull in Census population data and analyse it.
6. Saved data to .json files [Top10StartStationsCopy.json](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/Top10StartStationsCopy.json) and [Top10EndStationsCopy.json](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/Top10EndStationsCopy.json).

## Key Takeaways
1. The average minimum and average maximum temperature generally followed the same curve.
2. The highest average precipitation was in July.
3. Divvy rides were generally greater when there was little to no precipitation, with the exception of April.
4. The mean statistic for the Top 10 Ending Stations was higher than the mean statistic for the Top 10 Starting Stations.
5. The mean bike count usage was also higher for the Top 10 Ending Stations.
6. Although the total number of stations was low, a t-test was performed for both starting and ending stations.  There is no significant difference in station usage between highly populated and less populated areas for both the Top 10 Start Stations and the Top 10 End Stations.

## Citations
1. Bureau, U. C. (2021, October 8). American Community survey 2015-2019 5-year data release. Census.gov. https://www.census.gov/newsroom/press-kits/2020/acs-5-year.html 
2. Delete Documents. MongoDB. (n.d.). https://www.mongodb.com/docs/manual/tutorial/remove-documents/ 
3. Free reverse geocoding API, Geocoding API, Autocomplete API. LocationIQ. (n.d.). https://locationiq.com/ 
4. OpenWeather. (n.d.). One Call API - Historical weather data. https://openweathermap.org/api/one-call-3#history_daily_aggregation_how
5. Stack Overflow. (2019, June 18). Ignoring null values within an aggregate operation in MongoDB. https://stackoverflow.com/questions/56131463/ignoring-null-values-within-an-aggregate-operation-in-mongodb
6. Syed Uzair UddinSyed Uzair Uddin (1962, December 1). Destroy chart.js bar graph to redraw other graph in same canvas. Stack Overflow. https://stackoverflow.com/questions/40056555/destroy-chart-js-bar-graph-to-redraw-other-graph-in-same-canvas 
