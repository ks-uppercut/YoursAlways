var express = require('express');
var routes = express.Router();
var rootPath = require('app-root-path');
var database = require(rootPath + '/common/databaseHelper');
var Letter = require(rootPath + '/models/modelLetter');

routes.get('/', function(req, res) {
	res.render('pages/main');
});

routes.get('/write', function(req, res) {
	res.render('pages/write', {letter: null});
});

routes.post('/newLetter', function(req, res) {
	var letter = {
		letterBody: req.body.letterBody
	};
	database.saveObject(letter,Letter);
	res.redirect('/read');
});

routes.get('/read', function(req,res){
	database.findObject({},Letter,function(result){
		res.render('pages/read', {letters: result});
	});
});

routes.post('/deleteLetter', function(req,res){
	var letter = {
		_id: req.body._id
	};
	database.deleteObject(letter,Letter);
	res.redirect('/read');
});

routes.post('/edit', function(req,res){
	var letter = {
		_id: req.body._id,
	};
	database.findObject(letter, Letter, function(result){
		res.render('pages/write', {letter: result});
	});
});

routes.post('/updateLetter', function(req,res){
	var query = {
		_id: req.body._id
	};
	var update = {
		letterBody: req.body.letterBody
	};
	database.updateObject(query,update,Letter);
	res.redirect('/read');
});

module.exports = routes;