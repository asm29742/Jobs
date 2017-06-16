var events = require('events');

// API to create Job - /jobs/createJob
exports.createJob = function(req, res){
	console.log("Jobs to create: ", req.body);	
	
	var newJob = req.body;
	var collection = req.app.schema.jobs;
	
	req.app.crud.ceateDocument(newJob, collection, req.app, function(err, doc){
		if(err){
			console.log("Error in creating jobs: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Created Job: ",doc);
			res.json(doc);
		}
	});	
};

// API to update Job - /jobs/updateJob/:id
exports.updateJob = function(req, res){
	console.log("Fields that has to be updated: ", req.body);
	
	var jobId = req.params.id;
	var toUpdateDoc = req.body;
	var collection = req.app.schema.jobs;
	var query = {
		_id : jobId
	}
	
	req.app.crud.updateDocument(query, toUpdateDoc, collection, {}, req.app, function(err, doc){
		if(err){
			console.log("Error in updating jobs: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Updated Job: ",doc);
			res.json(doc);
		}
	});
};


// API to get single Job - /jobs/getJob/:id
exports.getJob = function(req, res){
	console.log("Job to get: ", req.params);
	
	var jobId = req.params.id;
	var collection = req.app.schema.jobs;
	var selection = {};
	var query = {
		_id : jobId
	}
	
	req.app.crud.getOneDoc(query, collection, selection, req.app, function(err, doc){
		if(err){
			console.log("Error in getting single job: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Got single Job: ",doc);
			res.json(doc);
		}
	});
};

// API to get all Jobs - /jobs/getAllJobs
exports.getAllJobs = function(req, res){
	var collection = req.app.schema.jobs;
	var selection = {};
	
	req.app.crud.getAll({}, collection, selection, req.app, function(err, docs){
		if(err){
			console.log("Error in getting all jobs: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Got Jobs: ",docs);
			res.json(docs);
		}
	});
};


// API to get matching jobs for a candidate - /candidates/getJobsForCandidates/:id
exports.getJobsForCandidates = function(req, res){
	
	var candidateId = req.params.id;
	
	var eventEmitter = new events.EventEmitter();
	
	eventEmitter.on('getCandidateDoc', function(candidateId){
		var collection = req.app.schema.candidates;
		var selection = {};
		var query = {
			_id : candidateId
		}		
		req.app.crud.getOneDoc(query, collection, selection, req.app, function(err, doc){
			if(err){
				console.log("Error in getting single job: ",err);
				res.json("Unexpected error");
			} else {
				console.log("Got single Job: ",doc);
				eventEmitter.emit('getJobsForCandidates', doc);
			}
		});
	});
	
	eventEmitter.on('getJobsForCandidates', function(candidate){
		var collection = req.app.schema.jobs;
		var selection = {};
		var query = {skillsRequired: {$in:candidate.technicalSkills}, jobLocation: candidate.locationPrefernce};
		
		req.app.crud.getAll(query, collection, selection, req.app, function(err, docs){
			if(err){
				console.log("Error in getting all jobs: ",err);
				res.json("Unexpected error");
			} else {
				console.log("Got Jobs: ",docs);
				res.json(docs);
			}
		});
	});
	
	eventEmitter.emit('getCandidateDoc', candidateId);
	
};