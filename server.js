const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://Frank:lakers16@ds159661.mlab.com:59661/name-score',{useNewUrlParser: true}, (err, client)=>{
	if (err) return console.log(err);
	db = client.db('name-score');
	app.listen(3000, ()=>{
		console.log('listening on 3000');
	});
});

app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/index.html');
	var cursor = db.collection('scores').find().toArray((err,results)=>{
		console.log(results);
	});
});

app.post('/scores',(req,res)=>{
	db.collection('scores').save(req.body, (err, result)=>{
		if(err) return console.log(err);

		console.log('saved to database');
		res.redirect('/');
	});
});
