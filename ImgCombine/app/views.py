#!/usr/bin/python
# -*- coding :UTF-8 -*-

from app import app
from flask import Flask,jsonify,render_template,request
import json
import urllib,httplib
import urllib2
import time
import sys

global newTab

reload(sys)
sys.setdefaultencoding('utf-8')

#index page
@app.route("/")
@app.route("/index")

def index():
	return render_template("index.html")

#demp page
@app.route("/demo")

def index1():
	return render_template("draft.html")


#result page
@app.route("/result")

def index111():
	return render_template("new.html")



@app.route('/draftResult',methods = ['POST'])
def draft():
	ServerURL = "http://10.108.125.20:8900/flaskr2/serverDraft"
	draft_jsondata = {}
	i=0
	while i<len(dict(request.form).values()[0]):
		json_data = {key:dict(request.form)[key][i] for key in dict(request.form)}
		value = json_data.get('value[]')
		key = 'value'+str(i)
		draft_jsondata[key] = value
		i = i + 1
	encode_json = json.dumps(draft_jsondata)
	headers = {'Content-Type': 'application/json'}
	request_draft = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_draft = urllib2.urlopen(request_draft)
	Server_json = json.load(response_draft)['result']
	return jsonify(result = Server_json)

#draft data convert
@app.route('/draftSelf',methods = ['POST'])
def draftA():
	ServerURL = "http://10.108.125.20:8900/flaskr2/serverDraft"
	draft_jsondata = {}
	value = request.form.get('value')
	key = 'value0'
	draft_jsondata[key] = value
	encode_json = json.dumps(draft_jsondata)
	headers = {'Content-Type': 'application/json'}
	request_draft = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_draft = urllib2.urlopen(request_draft)
	Server_json = json.load(response_draft)['result']
	return jsonify(result = Server_json)


#draft data convert
@app.route('/ImgStyle',methods = ['POST'])
def ImgStyle():
	ServerURL = "http://10.108.125.20:8900/flaskr2/imgStyle"
	img_Style_Count = len(request.form)
	style_jsondata = {}
	value0 = request.form.get('base')
	style_jsondata["base"] = value0
	i=0
	while(i<img_Style_Count-1):
		#value+str(i+1) = request.form.get("value"+str(i+1))
		#key+str(i+1) = "value"+str(i+1)
		style_jsondata["value"+str(i+1)] = request.form.get("value"+str(i+1))
		i=i+1
	encode_json = json.dumps(style_jsondata)
	headers = {'Content-Type': 'application/json'}
	request_style = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_style = urllib2.urlopen(request_style)
	Server_json = json.load(response_style)['result']
	return jsonify(result = Server_json)


#rotate left-right data convert
@app.route('/rotateLR',methods = ['POST'])
def rotateLR():
	ServerURL = "http://10.108.125.20:8900/flaskr2/rotateLR"
	getdata_json = {}
	value = request.form.get("value")
	key = 'value'
	getdata_json[key] = value
	encode_json = json.dumps(getdata_json)
	#print encode_json
	headers = {'Content-Type': 'application/json'}
	request_rotateLR = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_rotateLR = urllib2.urlopen(request_rotateLR)
	RotateLR_json = json.load(response_rotateLR)
	return jsonify(RotateLR_json)

#rotate top-bottom data convert
@app.route('/rotateTB',methods = ['POST'])
def rotateTB():
	ServerURL = "http://10.108.125.20:8900/flaskr2/rotateTB"
	getdata_json = {}
	value = request.form.get("value")
	key = 'value'
	getdata_json[key] = value
	encode_json = json.dumps(getdata_json)
	#print encode_json
	headers = {'Content-Type': 'application/json'}
	request_rotateLR = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_rotateLR = urllib2.urlopen(request_rotateLR)
	RotateLR_json = json.load(response_rotateLR)
	return jsonify(RotateLR_json)


#simple crop data convert 
@app.route('/getdata',methods = ['POST'])
def geedata():
	ServerURL = "http://10.108.125.20:8900/flaskr2/cropdata"
	getdata_json = {}
	value1 = request.form.get("value")
	value2 = request.form.get("imagedata")
	key1 = 'value'
	key2 = 'imagedata'
	getdata_json[key1] = value1
	getdata_json[key2] = value2
	encode_json = json.dumps(getdata_json)
	#print encode_json
	headers = {'Content-Type': 'application/json'}
	request_crop = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_crop = urllib2.urlopen(request_crop)
	Crop_json = json.load(response_crop)
	return jsonify(Crop_json)


#combine data convert
@app.route('/getimgdata',methods = ['POST'])
def getimgdata():
	global newTab
	ServerURL = "http://10.108.125.20:8900/flaskr2/combData"
	getimgdata_json = {}
	key = 'value'
	value = request.form.get("value")
	getimgdata_json[key] = value
	i=0
	while (i<(len(request.form.keys()) / 6)):
		if(request.form.get('imagedata['+str(i)+'][id]')):
			key = 'imagedata['+str(i)+'][id]'
			value = request.form.get('imagedata['+str(i)+'][id]')
			getimgdata_json[key] = value
		if(request.form.get('imagedata['+str(i)+'][x1]')):
			key = 'imagedata['+str(i)+'][x1]'
			value = request.form.get('imagedata['+str(i)+'][x1]')
			getimgdata_json[key]= value
		if(request.form.get('imagedata['+str(i)+'][y]')):
			key = 'imagedata['+str(i)+'][y]'
			value = request.form.get('imagedata['+str(i)+'][y]')
			getimgdata_json[key]= value
		if(request.form.get('imagedata['+str(i)+'][width]')):
			key = 'imagedata['+str(i)+'][width]'
			value = request.form.get('imagedata['+str(i)+'][width]')
			getimgdata_json[key]= value
		if(request.form.get('imagedata['+str(i)+'][height]')):
			key = 'imagedata['+str(i)+'][height]'
			value = request.form.get('imagedata['+str(i)+'][height]')
			getimgdata_json[key]= value
		if(request.form.get('imagedata['+str(i)+'][rotate]')):
			key = 'imagedata['+str(i)+'][rotate]'
			value = request.form.get('imagedata['+str(i)+'][rotate]')
			getimgdata_json[key]= value
		i = i + 1
	encode_json = json.dumps(getimgdata_json)
	#print encode_json
	headers = {'Content-Type': 'application/json'}
	request_comb = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_comb = urllib2.urlopen(request_comb)
	Comb_json = json.load(response_comb)
	
	newTab = Comb_json['result']
	return jsonify(Comb_json)



#image download through Bing
@app.route('/bingDown',methods = ['POST'])
def downloadBing():
	ServerURL = "http://10.108.125.20:8900/flaskr2/result3"
	SendURL = "http://10.108.125.20:8900/"
	value = request.form.get("value")
	key = 'value'
	convert_data = {}
	convert_data[key] = value
	encode_json = json.dumps(convert_data)
	headers = {'Content-Type': 'application/json'}
	request_bing = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_bing = urllib2.urlopen(request_bing)
	Bing_json = json.load(response_bing)['result']
	Bing_json = SendURL + Bing_json.split("./")[1]
	localtime = time.strftime("%Y%m%d%H%M%S",time.localtime())
	localUrl = './app/static/img/'+localtime+'backdown.jpg'
	urllib.urlretrieve(Bing_json,localUrl)
	return jsonify(result = localUrl)

#image download
@app.route('/convert',methods = ['POST'])
def convert():

	tmpImgUrl = request.form.get("value")
	localtime = time.strftime("%Y%m%d%H%M%S",time.localtime())
	localUrl = './app/static/img/'+localtime+'text.jpg'
	urllib.urlretrieve(tmpImgUrl,localUrl)
	return jsonify(result = localUrl)

#not used
@app.route('/further',methods = ['POST'])
def further():
	ServerURL = "http://10.108.125.20:8900/flaskr2/further"
	further_data ={}
	value = request.form.get("value")
	key = 'value'
	further_data[key] = value
	encode_json = json.dumps(further_data)
	headers = {'Content-Type': 'application/json'}
	request_further = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_further = urllib2.urlopen(request_further)
	Further_json = json.load(response_further)['result']
	return jsonify(result = Further_json)

#Crop Final
@app.route('/furtherCrop',methods = ['POST'])
def furtherCrop():
	ServerURL = "http://10.108.125.20:8900/flaskr2/furtherCrop"
	further_data ={}
	value = request.form.get("value")
	base = request.form.get("base64")
	scale = request.form.get("scale")

	key2 = 'base'
	key1 = 'value'
	key3 = 'scale'

	further_data[key1] = value
	further_data[key2] = base
	further_data[key3] = scale
	
	encode_json = json.dumps(further_data)
	headers = {'Content-Type': 'application/json'}
	request_further = urllib2.Request(url=ServerURL, headers=headers, data=encode_json)
	response_further = urllib2.urlopen(request_further)
	Further_json = json.load(response_further)['result']
	return jsonify(result = Further_json)

#not used
@app.route('/furtherDown',methods = ['POST'])
def furtherDown():
	ServerURL = "http://10.108.125.20:8900/flaskr2/"
	tmpImgUrl = ServerURL + request.form.get("url").split("./")[1]
	tmpImgUrl1 = ServerURL + request.form.get("url1").split("./")[1]
	localtime = time.strftime("%Y%m%d%H%M%S",time.localtime())
	localUrl = './app/static/img/'+localtime+'convert.jpg'
	localUrl1 = './app/static/img/'+localtime+'convert1.jpg'
	urllib.urlretrieve(tmpImgUrl,localUrl)
	urllib.urlretrieve(tmpImgUrl1,localUrl1)
	return jsonify(result = localUrl,result1 = localUrl1)

#Before used many input Bing Search
@app.route('/result2',methods = ['POST'])
def text():
	headers = {
		# Request headers
		'Content-Type': 'multipart/form-data',
		'Ocp-Apim-Subscription-Key': 'b4f268f76170485ebc1e78a045554fae',
	}	
	#values={}
	#print len(request.form.keys())
	#print request.form.get('queryexpression[0][background]')

	#json_data = {key:dict(request.form)[key][0] for key in dict(request.form)}
	#print json_data
	imgURL1=[]
	imgURL2 = []
	k=0
	while(k<len(request.form.keys())):
		if(request.form.get('queryexpression['+str(k)+'][background]')):
			values={}
			values['q'] = request.form.get('queryexpression['+str(k)+'][background]')
			params = urllib.urlencode(values)
			#print params
			#try:
			conn = httplib.HTTPSConnection('api.cognitive.microsoft.com')
			conn.request("POST", "/bing/v5.0/images/search?%s" % params, "{body}", headers)
			response = conn.getresponse()
	
			data = response.read()
			ImgUrl = []
		
			hjsons = json.loads(data)
			ImgLength = len(hjsons['value'])
			i=0
			while(i<ImgLength):
				ImgUrl.append(hjsons['value'][i]['contentUrl'])
				#localUrl = './flaskr2/static/img/text'+str(i)+'.jpg'
				#urllib.urlretrieve(hjsons['value'][i]['contentUrl'],localUrl)
				#ImgUrl.append(localUrl)
				i=i+1
			i=0
			while(i<ImgLength):
				ImgUrl.append(hjsons['value'][i]['thumbnailUrl'])
				i=i+1
			imgURL1.append(ImgUrl)		
		elif(request.form.get('queryexpression['+str(k)+'][good]')):
			values={}
			values['q'] = request.form.get('queryexpression['+str(k)+'][good]')
			params = urllib.urlencode(values)
	
			conn = httplib.HTTPSConnection('api.cognitive.microsoft.com')
			conn.request("POST", "/bing/v5.0/images/search?%s" % params, "{body}", headers)
			response = conn.getresponse()
	
			data = response.read()
			ImgUrlA = []
	
			hjsons = json.loads(data)
			ImgLength = len(hjsons['value'])
	
			i=0
			while(i<ImgLength):
				ImgUrlA.append(hjsons['value'][i]['contentUrl'])
				#localUrl = './flaskr2/static/img/textA'+str(i)+'.jpg'
				#urllib.urlretrieve(hjsons['value'][i]['contentUrl'],localUrl)
				#ImgUrlA.append(localUrl)
				i=i+1
			i=0
			while(i<ImgLength):
				ImgUrlA.append(hjsons['value'][i]['thumbnailUrl'])
				i=i+1	
			imgURL2.append(ImgUrlA)
		k=k+1
	#conn.close()
	return jsonify(result = imgURL1,result1 = imgURL2)	

@app.route('/bingResult',methods = ['POST'])
def bingResult():
	headers = {
		# Request headers
		'Content-Type': 'multipart/form-data',
		'Ocp-Apim-Subscription-Key': 'b4f268f76170485ebc1e78a045554fae',
	}
	values = {}
	values['q'] = request.form.get('queryexpression')
	params = urllib.urlencode(values)
	try:
		conn = httplib.HTTPSConnection('api.cognitive.microsoft.com')
		conn.request("POST", "/bing/v5.0/images/search?%s" % params, "{body}", headers)
		response = conn.getresponse()
	
		data = response.read()
		ImgUrlA = []
		ImgUrlB = []
		hjsons = json.loads(data)
		ImgLength = len(hjsons['value'])
	
		i=0
		while(i<ImgLength):
			ImgUrlA.append(hjsons['value'][i]['contentUrl'])
			ImgUrlB.append(hjsons['value'][i]['thumbnailUrl'])
			i=i+1
		conn.close()
		return jsonify(result = ImgUrlA,result1 = ImgUrlB)
	except Exception as e:
		return jsonify(result = "error")
	else:
		return jsonify(result = "no exception")


@app.route('/display',methods = ['POST'])
def display():
	global newTab
	value = request.form.get("send")
	if(value == "send"):
		return jsonify(result = newTab)
	else:
		return jsonify(result = "error")

