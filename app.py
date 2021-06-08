from flask import Flask, render_template, redirect, jsonify
from flask import Response,json
# from flask_pymongo import PyMongo
# import scrape_mars

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# from flask import Flask, jsonify

# use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
# engine_path = (f"postgresql://{username}:{password}@localhost:5432/forbes_db")

engine_path = (f"postgres://ymdgbfuxieokmr:e7dbcaac7c472421c6cbac10c2f4e12d5f482b69e4bfaf194eb460e29f024ec9@ec2-34-193-112-164.compute-1.amazonaws.com:5432/db33qasn137vis")

engine = create_engine(engine_path)


# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)

# # Save references to each table
forbes = engine.execute('select * from forbes_billionaires').fetchall()


# new = []
# for i in forbes:
#     a = {"id":i[0],"name":i[1],"networth":str(i[2]),"country":i[3],"source":i[4],"rank":i[5],"age":i[6],"residence":i[7],"citizenship":i[8],"status":i[9],"children":i[10],"education":i[11],"self_made":i[12],"degree":i[13],"university":i[14],"longitude":i[15],"latitude":i[16],"combined":i[17]}
#     new.append(a)

new = []
for i in forbes:
    a = {"id":i[0],"name":i[1],"networth":str(i[2]),"country":i[3],"source":i[4],"rank":i[5],"age":i[6],"residence":i[7],"citizenship":i[8],"status":i[9],"children":i[10],"education":i[11],"self_made":i[12],"degree":i[13],"university":i[14],"combined":i[17]}
    new.append(a)


# create an instance of Flask
app = Flask(__name__)


# route to render index.html template using data from Mongo
@app.route("/")
def home():
    # find one record of data from the mongo database
    # mars = mongo.db.marsinfo.find_one()
    
    # return template and data
    # return render_template("index.html", mars=mars)
    return render_template("index.html")


# route to trigger the scrape function
@app.route("/test", methods=["GET"])
def scrape():

    return (jsonify(new))
#     # run the scrape function
#     mars_data = scrape_mars.scrape()
    
#     # update the Mongo database
#     mongo.db.marsinfo.update({}, mars_data, upsert=True)
    
#     # redirect back to home page
#     return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)