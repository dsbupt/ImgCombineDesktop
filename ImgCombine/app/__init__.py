from flask import Flask,jsonify,render_template,request

app = Flask(__name__)
from app import views
