# Project-3-Divvying-in-the-Rain
Is there anything that will stop bikers in Chicago? 

## Team Members
* Jason Pealy
* Andrew Hawthorne
* Ben Richardson
* Aileen Alvarez
* Alicia Hlavac

## Table of Contents

 * [Project Overview](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/edit/aileen/README.md#project-overview)
 * [Languages Used](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/edit/aileen/README.md#languages-used)
 * [Preparing the Data](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/edit/aileen/README.md#preparing-the-data)
 * [Processing the Data for Interactive Visualizations](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/edit/aileen/README.md#processing-the-data-for-interactive-visualizations)
 * [Key Takeaways](https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/edit/aileen/README.md#key-takeaways)

## Project Overview

## Languages Used
* Python: pyMongo, flask, flask_cors
* JavaScript
* HTML
* CSS

## Preparing the Data
### 1. Sourcing the Data:
Downloaded [Monthly Historical Divvy Trip Data](https://divvybikes.com/system-data) in CSV format for all of 2022. 
### 2. Converting API To CSV
Within OpenWeather.ipynb we took our OpenWeather API and created it into a Dataframe to then export as a CSV
### 3. Imported CSVs to MongoDB format
<img width="618" alt="Screenshot 2023-08-28 at 4 15 48 PM" src="https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/assets/131564308/013fe41b-becc-460a-89f0-2988d1400170">

## Processing the Data for Interactive Visualization
### 1. Created and Cleaned Collections to parse through the data
   Removing null, empty strings, and zeros. 
### 2. Converted Queries to JSON data using Flask
<img width="455" alt="Screenshot 2023-08-28 at 4 23 10 PM" src="https://github.com/andrewdhawthorne/Project-3-Divvying-in-the-Rain/assets/131564308/025bc253-a81c-4296-b935-a1c524fd2851">
### 3. Utilized Javascript files to create map with dropdown option and create charts
### 4. Incorporated our CSS file with HTML to build out the dashboard.

## Key Takeaways
*Increased awareness of the process of using various applications to display findings to end user
*Performing significant data merges on MongoDB vs. SQL


