var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require('fh-mbaas-api');

function getTodo(cb){
  var todoArray = [];
  var options = {
  "act": "list",
  "type": "todo", // Entity/Collection name
  };
  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
    } else {
      console.log(JSON.stringify(data));
      data.list.forEach(function(listItem){
        todoArray.push(listItem.fields);
      })
      cb(data.list);
    
    }
  });
}

function addTodo(todo,cb){
  var options = {
    "act" : "create",
    "type" : "todo",
    "fields": todo
  };

  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
      cb(err);
    } else {
      console.log(JSON.stringify(data));
      cb(data);
    
    }
  });
}


function updateTodo(todo,guid,cb){
  var options = {
    "act" : "update",
    "type" : "todo",
    "guid":guid,
    "fields": todo
  };

  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
      cb(err);
    } else {
      console.log(JSON.stringify(data));
    //   data.list.forEach(function(listItem){
    //     tasksArray.push(listItem.fields);
    //   })
      cb(data);
    
    }
  });
}

function deleteTodo(guid,cb){
  var options = {
    "act" : "delete",
    "type" : "todo",
    "guid":guid
  };

  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
      cb(err);
    } else {
      console.log(JSON.stringify(data));
    //   data.list.forEach(function(listItem){
    //     tasksArray.push(listItem.fields);
    //   })
      cb(data);
    
    }
  });
}


function todoRoute() {
  var todo = new express.Router();
  todo.use(cors());
  todo.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
//   todo.get('/', function(req, res) {
//     console.log(new Date(), 'In hello route GET / req.query=', req.query);
//     var world = req.query && req.query.todo ? req.query.todo : 'World';

//     // see http://expressjs.com/4x/api.html#res.json
//     res.json({msg: 'Hello ' + world});
//   });

  todo.get('/', function(req, res) {
//     console.log(new Date(), 'In todo route GET / req.query=', req.query);
    getTodo(function(todoList){
      res.json(todoList);
    });
    
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  todo.post('/', function(req, res) {
    //console.log(req.body);
    //res.json({success:true});
    var todo = req.body;
    todo.createdBy = Date.now();
    todo.updatedBy = Date.now();
    console.log(todo);
    addTodo(todo, function(err){
      if (err){
        res.json({err: err});
      } else {
        res.json({msg: todo});
      }
    });

  });


  todo.put('/', function(req, res) {
    var todo = req.body.fields;
    todo.updatedBy = Date.now();
    var guid = req.body.guid;
    updateTodo(todo,guid, function(err){
      if (err){
        res.json({err: err});
      } else {
        res.json({msg: todo});
      }
    });

  });


  todo.delete('/', function(req, res) {
    
    var guid = req.body.guid;
    deleteTodo(guid, function(err){
      if (err){
        res.json({err: err});
      } else {
        res.json({msg: todo});
      }
    });

  });




  return todo;
}









module.exports = todoRoute;


