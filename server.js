var Model = require('./models/models.js'); 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//To create an instance of our application
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


var db = "mongodb://localhost/mean_end_to_end";

mongoose.connect(db, function(err, response){
	if(err){
		console.log('Failed to connected to ' + db);
	}else{
		console.log('Connected to connected ' + db);
	}
});
	
var router = express.Router();

//GET

router.get('/api/users', function(request, response){
	Model.find({}, function(err, users){
		if(err){
			response.status(404).send(err);	
		} else {
			response.status(200).send(users);
		}
	});
});

//DELETE
router.delete('/api/users/:id', function(request, response){
	var id = request.params.id;
	Model.remove({_id: id}, function(err, res){
		if(err){
			response.status(500).send(err);
		} else {
			response.status(200).send({message: 'success on deleting user'});
		}
	})
});

//POST
router.post('/api/users', function(request, response){
	console.log(request.body);
	var model = new Model();
	model.name = request.body.name;
	model.age = request.body.age;
	model.save(function(err, user){
		if(err){
			response.status(500).send(err)
		}
		else {
			response.status(201).send(user)
		}
	});
});


app.use('/', router);

//Can use it as our logger
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
