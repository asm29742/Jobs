module.exports = function(app, mongoose){
	var jobsSchema = mongoose.Schema({
      'salary':{type: Number},
	  'postedDate': {type:Date, default: Date.now},
	  'jobLocation':{type: String},
	  'qualifications':{type: String},
	  'hiringOrganizationName':{type: String},
	  'orgainizationDescription':{type: String},
	  'skillsRequired':[{type: String}],
	  'workHours':{type: Number}, 
	  'workingDays':{type: Number},
	  'contactPersonName':{type: String},
	  'contactPersonEmail':{type: String},
	  'contactPersonPhNo':{type: String},
	  'status':{type: String}, // open, close
	  'jobType':{type: String},  // partTime ,fullTime
	  'jobDescription':{type: String},
	  'priority':{type: String},//normal,medium,high

  });
	var jobs = mongoose.model('jobs', jobsSchema);
	app.schema.jobs = jobs;	
};