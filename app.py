import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from sqlalchemy import create_engine
from flask import Response,json
from flask import Flask, render_template

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://hqbkvuzhrlymzx:c08cc2098824445764cd8413ee9d5f79d029847ac2c6cf949ce50d490de2df3d@ec2-3-214-136-47.compute-1.amazonaws.com:5432/d3itds64i4rb7k")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

results = engine.execute("SELECT  * FROM forbes_billionaires").fetchall()

new = []
for i in results:
    a = {"id":i[0],"name":i[1],"networth":str(i[2]),"country":i[3],"source":i[4],"rank":i[5],"age":i[6],"citizenship":i[7],"status":i[8],"children":i[9],"self_made":i[10],"degree":i[11],"university":i[12],"longitude":i[13],"latitude":i[14]}
    new.append(a)

# print(new)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
    return render_template("index.html")
    

@app.route("/forbes", methods=["GET"])
def welcome():
    """List all available api routes."""
    
    #response = Response(json.dumps(new[0]), mimetype='application/json')
    #response = jsonify(results)
    #response.headers.add("Access-Control-Allow-Origin", "*")
    return (jsonify(new))


if __name__ == '__main__':
    # app.config['CORS_ALLOW_HEADERS'] = "Content-Type"
    # app.config['CORS_RESOURCES'] = {r"/api/*": {"origins": "*"}}
    app.run(debug=True)
