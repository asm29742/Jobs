module.exports = function(app, mongoose){	
	var candidatesSchema = mongoose.Schema({
   'name': {type: String},
   'phone': {type: String},
   'email':{type: String},
   'technicalSkills':[{type: String}],   
   'totalExperience':{type: Number},   
   'locationPrefernce':{type: String},
   'currentLocation':{type: String},
   'noticePeriod': {type: Number},
   'educationQualification': {type: String},
   'resumeUrl':{type: String},
   'imageUrl':{type: String}
  });
	var candidates = mongoose.model('candidates', candidatesSchema);
	app.schema.candidates = candidates;
};