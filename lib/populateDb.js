'use strict';
var $fh = require('fh-mbaas-api');

function initialize(){
	var options = {
	  "act": "deleteall",
	  "type": "todo" // Entity/Collection name
	};
	$fh.db(options, function (err, data) {
	  if (err) {
	    console.error("Error " + err);
	  } else {
	    console.log(JSON.stringify(data));
	    var options = {
		  "act": "create",
		  "type": "todo", // Entity/Collection name
		  "fields": [
		        {id:1, title: 'Clean car',description:'Bumper to be fixed too.', username: 'Pranay', createdBy: 'Fri Dec 04 2015 15:00:00 GMT+0000 (GMT)',updatedBy: 'Fri Dec 04 2015 15:00:00 GMT+0000 (GMT)'},
		        {id:2, title: 'Groccory',description:'Shoes,board,skates', username: 'Pranay', createdBy: 'Fri Dec 04 2015 15:00:00 GMT+0000 (GMT)',updatedBy: 'Fri Dec 04 2015 15:00:00 GMT+0000 (GMT)'}
		        
		    ]
		};
		$fh.db(options, function (err, data) {
		  if (err) {
		    console.error("Error " + err);
		  } else {
		    console.log(JSON.stringify(data));

		  }
		});
	  }
	});
}

exports.initialize = initialize;