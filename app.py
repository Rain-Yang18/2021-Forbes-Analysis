from flask import Flask, render_template, redirect, jsonify
from flask import Response,json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

engine_path = ("postgresql://hqbkvuzhrlymzx:c08cc2098824445764cd8413ee9d5f79d029847ac2c6cf949ce50d490de2df3d@ec2-3-214-136-47.compute-1.amazonaws.com:5432/d3itds64i4rb7k")
# engine_path = (f"postgres://hqbkvuzhrlymzx:c08cc2098824445764cd8413ee9d5f79d029847ac2c6cf949ce50d490de2df3d@ec2-3-214-136-47.compute-1.amazonaws.com:5432/d3itds64i4rb7k")


# Create engine
engine = create_engine(engine_path)

# Reflect an existing database into a new model
Base = automap_base()

Base.prepare(engine, reflect=True)

# Select and grab all data from the database
forbes = engine.execute('select * from forbes_billionaires').fetchall()

# Append the data into new array
new = []
for i in forbes:
    a = {"id":i[0],"name":i[1],"networth":str(i[2]),"country":i[3],"source":i[4],"rank":i[5],"age":i[6],"residence":i[7],"citizenship":i[8],"status":i[9],"children":i[10],"education":i[11],"self_made":i[12],"degree":i[13],"university":i[14], "longitude":str(i[15]), "latitude":str(i[16]), "groupednetworth":i[17], "fullname":i[18]}
    new.append(a)


# Create an instance of Flask
app = Flask(__name__)


# Route to render index.html template
@app.route("/")
def home():

    # Return template 
    return render_template("index.html")

# Route to return the data
@app.route("/test", methods=["GET"])
def scrape():

    # Return data from datbase in json format 
    return (jsonify(new))

if __name__ == "__main__":
    app.run(debug=True)