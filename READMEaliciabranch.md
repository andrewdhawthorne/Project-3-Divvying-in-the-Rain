# Project-3-Divvying-in-the-Rain-Side Project
Is there anything that will stop bikers in Chicago? 

Link to website: https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/

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
* [Processing the Data for Interactive Visualizations](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#processing-the-data-for-interactive-visualization)
* [Key Takeaways](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#key-takeaways)
* [Citations](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/blob/aliciabranch/READMEaliciabranch.md#citations)

 ## Project Overview

My goal was to answer the following questions about Divvy riders between January 1st, 2022 to December 31st, 2022.
* What was the average minimum and maximum temperature over this timeframe?
* What was the average precipitation over this timeframe?
* How many Divvy riders were there based on precipitation, separated into both seasons and months?
* How did the population vary by the Top 10 Starting Stations and Top 10 Ending Stations?


## Languages Used
* Python: pyMongo, flask, flask_cors, pandas, matplotlib, scipy
* JavaScript
* HTML
* CSS

## Processing/Using the Data for Interactive Visualizations and Statistical Analysis
1. Imported data, ran partner's queries, and ensured accuracy of data.
2. Used logic3.js file to create charts and dropdown menu chart.
3. Created a new database to store new data information in. 
4. Used Census.ipynb file to pull in Census population data and analyse it.
5. Saved data to .json files.

## Key Takeaways
1. The average minimum and average maximum temperature generally followed the same curve.
2. The highest average precipitation was in July.
3. Divvy rides were generally greater when there was little precipitation, with the exception of April.
4. The mean statistic for the Top 10 Ending Stations was higher than the mean statistic for the Top 10 Starting Stations.
5. The mean bike count usage was also higher for the Top 10 Ending Stations.
6. Although the total number of stations was low, a t-test was performed for both starting and ending stations.  There is no significant difference in station usage between highly populated and less populated areas for both the Top 10 Start Stations and the Top 10 End Stations.

## Citations
1. Bureau, U. C. (2021, October 8). American Community survey 2015-2019 5-year data release. Census.gov. https://www.census.gov/newsroom/press-kits/2020/acs-5-year.html 
2. Delete Documents. MongoDB. (n.d.). https://www.mongodb.com/docs/manual/tutorial/remove-documents/ 
3. Free reverse geocoding API, Geocoding API, Autocomplete API. LocationIQ. (n.d.). https://locationiq.com/ 
4. OpenWeather. (n.d.). One Call API - Historical weather data. https://openweathermap.org/api/one-call-3#history_daily_aggregation_how
5. Stack Overflow. (2019, June 18). Ignoring null values within an aggregate operation in MongoDB. https://stackoverflow.com/questions/56131463/ignoring-null-values-within-an-aggregate-operation-in-mongodb