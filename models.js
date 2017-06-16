module.exports = function(app, mongoose) {
	require('./schemas/jobsSchema')(app, mongoose); // jobs Collection Schema
	require('./schemas/candidateSchema')(app, mongoose); // candidates Collection Schema
}