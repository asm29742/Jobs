var multer = require('multer');
var uploading = multer({
  dest: '/tmp',
});


module.exports = function(app) {
	
	/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	
	// Initial Load API
	app.get("/", function(req, res){
		res.send("Job Portal Application");
	});
	
	/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	
	// Jobs APIS - Start
	app.post('/jobs/createJob', require('./jobPortal/jobs').createJob);
	app.put('/jobs/updateJob/:id', require('./jobPortal/jobs').updateJob);
	app.get('/jobs/getJob/:id', require('./jobPortal/jobs').getJob);
	app.get('/jobs/getAllJobs', require('./jobPortal/jobs').getAllJobs);
	app.get('/candidates/getJobsForCandidates/:id', require('./jobPortal/jobs').getJobsForCandidates);
	
	// Jobs APIS - End
	
	/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	
	// Candidate APIS - Start
	app.post('/candidates/createCandidate', uploading, require('./jobPortal/candidates').createCandidate);
	app.put('/candidates/updateCandidate/:id', require('./jobPortal/candidates').updateCandidate);
	app.get('/candidates/getCandidate/:id', require('./jobPortal/candidates').getCandidate);
	app.get('/candidates/getAllCandidates', require('./jobPortal/candidates').getAllCandidates);
	app.get('/candidates/getCandidatesForJob/:id', require('./jobPortal/candidates').getCandidatesForJob);
	
	// Candidate APIS - End
	
	/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	
	
};