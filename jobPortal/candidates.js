var events = require('events');
var fs = require('fs');
var mkdirp = require('mkdirp');
var async = require('async');


// API to create Candidate - /candidates/createCandidate
exports.createCandidate = function(req, res){
	console.log("Candidate to create", req.body);
	console.log("FILES: ",req.files);
	
	var eventEmitter = new events.EventEmitter();
	
	var newCandidate = req.body;
	var collection = req.app.schema.candidates;
	
	
	eventEmitter.on('checkIfCandidateExists', function(newCandidate){
		var query = {
			phone : newCandidate.phone
		};		
		req.app.crud.getOneDoc(query, collection, {}, req.app, function(err, doc){
			if(err){
				console.log("Error in getting single candidate: ",err);
				res.json({message: "Unexpected error", data: {}, res: false});
			} else {
				console.log("Got single Candidate: ",doc);
				if(doc){					
					res.json({message: "Candidate already exists", data: {}, res: false});
				} else {
					if(req.files){
						eventEmitter.emit('checkUploadFolders', newCandidate);
					} else {
						eventEmitter.emit('createCandidate', newCandidate);
					}					
				}
			}
		});
	});
	
	eventEmitter.on('checkUploadFolders', function(newCandidate){
		var uploadDestination = './uploads/' + newCandidate.phone;
		if (fs.existsSync(uploadDestination)) {
			console.log("folder exist");
			eventEmitter.emit('uploadFiles', newCandidate);
		} else {
			console.log("Setting Path : ",uploadDestination);
			mkdirp(uploadDestination, function(err) {
				 if (err) {
					console.log("Error creating upload folders: ", err);
					res.json({message: "Unexpected error", data: {}, res: false});
				} else {
					console.log("folders created");
					eventEmitter.emit('uploadFiles', newCandidate, uploadDestination);
				}
			});
		}
	});
	
	eventEmitter.on('uploadFiles', function(newCandidate, uploadDestination){
		var files = req.files;
		var filename;
		async.forEach(Object.keys(files), function (item, callback){
			var path = uploadDestination;
			var fileObj = req.files[item];
			var sourceFileLoc = fileObj.path;
			var originalname = fileObj.fieldname;
			var extension = fileObj.extension;
			
			console.log("File Obj: ",fileObj);
			if(item == originalname){
				filename = originalname + "." + extension;
			}
			if (fs.existsSync(path)) {
				path += "/" + filename;
				console.log("To upload File Path: ",path);
				fs.createReadStream(sourceFileLoc).pipe(fs.createWriteStream(path));
				callback();
			}
		}, function(err){
			if(err){
				res.json({message: "Unexpected error", data: {}, res: false});
			} else {
				eventEmitter.emit('createCandidate', newCandidate);
			}
		});
	});
	
	eventEmitter.on('createCandidate', function(newCandidate, uploadDestination){
		req.app.crud.ceateDocument(newCandidate, collection, req.app, function(err, doc){
			if(err){
				console.log("Error in creating candidate: ",err);
				res.json("Unexpected error");
			} else {
				console.log("Created Candidate: ",doc);
				res.json({message: "Success", data: doc, res: true});
			}
		});
	});
	
	eventEmitter.emit('checkIfCandidateExists', newCandidate);		
};

// API to update Candidate - /candidates/updateCandidate/:id
exports.updateCandidate = function(req, res){
	console.log("Fields that has to be updated: ", req.body);
	
	var candidateId = req.params.id;
	var toUpdateDoc = req.body;
	var collection = req.app.schema.candidates;
	var query = {
		_id : candidateId
	}
	
	req.app.crud.updateDocument(query, toUpdateDoc, collection, {}, req.app, function(err, doc){
		if(err){
			console.log("Error in updating candidates: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Updated Candidate: ",doc);
			res.json(doc);
		}
	});
};

// API to get single Candidate - /candidates/getCandidate/:id
exports.getCandidate = function(req, res){
	console.log("Candidate to get: ", req.params);
	
	var candidateId = req.params.id;
	var collection = req.app.schema.candidates;
	var selection = {};
	var query = {
		_id : candidateId
	}
	
	req.app.crud.getOneDoc(query, collection, selection, req.app, function(err, doc){
		if(err){
			console.log("Error in getting single candidate: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Got single Candidate: ",doc);
			res.json(doc);
		}
	});
};

// API to get all Candidates - /candidates/getAllCandidates
exports.getAllCandidates = function(req, res){
	var collection = req.app.schema.candidates;
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


// API to get matching candidates for a job - /candidates/getCandidatesForJob/:id
exports.getCandidatesForJob = function(req, res){
	
	var jobId = req.params.id;
	
	var eventEmitter = new events.EventEmitter();
	
	eventEmitter.on('getJobDoc', function(jobId){
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
				eventEmitter.emit('getCandidatesForJob', doc);
			}
		});
	});
	
	eventEmitter.on('getCandidatesForJob', function(job){
		console.log("job",job);
		var collection = req.app.schema.candidates;
		var selection = {};
		var query = {technicalSkills: {$in:job.skillsRequired}, locationPrefernce: job.jobLocation};
		
		req.app.crud.getAll(query, collection, selection, req.app, function(err, docs){
			if(err){
				console.log("Error in getting all jobs: ",err);
				res.json("Unexpected error");
			} else {
				console.log("Got Candidates: ",docs);
				res.json(docs);
			}
		});
	});
	
	eventEmitter.emit('getJobDoc', jobId);
	
};

