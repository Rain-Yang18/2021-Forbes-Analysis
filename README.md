![billionaires](img/billionaires.jpg)

Monash Data Bootcamp Project 2

The purpose of this project was to build a web application that visualizes data from the externally hosted database, on a HTML page.

# Data

There is one key source of data used:

* [forbes billionaires geo](https://www.kaggle.com/alexanderbader/forbes-billionaires-2021-30?select=forbes_billionaires_geo.csv) - kaggle dataset with data for 2755 billionaires


# Analysis

## Data Cleaning - Jupyter Notebook

* Split 'geometry' column into 'longitude' and 'latitude' columns

* Create 'groupednetworth' column

* Create 'fullname' column

## Data Deployment - PostgreSQL, Heroku

* Set up PostgreSQL database in Heroku

* Set up Heroku server in PostgreSQL

* Load data from Jupyter Notebook to PostgreSQL

## Flask Application

* Use SQLalchemy with Flask templating to create a HTML page that displays data from Heroku database server:

  * Create a root route `/` that will load template HTML file `index.html` 

  * Create a route called `/test` that will import data from database and make it available for other functions

## Webpage - HTML, CSS, JS

* Create Dashboard style frontend using Bootstrap

* Add Interactive Leaflet map 

* Create Interactive Bar Chart and Pie Charts using Plotly

* Create Interactive Scatter PLot with D3

## Webpage Deployment - Heroku

* Set up Heroku server and deploy the webpage through Github


# Demo

To see the Billionaires Data Visualization webpage visit https://forbes-monash.herokuapp.com/.


# Used Tools
 * Jupyter Notebook 
 * Pandas
 * Python
 * Flask
 * SQLalchemy  
 * PostgreSQL
 * JS (Leaflet, Plotly, D3, anime)
 * HTML
 * CSS
 * Heroku

