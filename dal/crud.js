
// Function to insert document 

exports.ceateDocument = function (toSaveDoc, collection, app, callback){
	var newDoc = new collection(toSaveDoc);
	newDoc.save(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

// Function to update document

exports.updateDocument = function (query, toUpdateDoc, collection, options, app, callback){
	options.new = true;
	collection.findOneAndUpdate(query, toUpdateDoc, options).exec(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};


// Function to get document

exports.getOneDoc = function (query, collection, selection, app, callback){
	collection.findOne(query, selection).exec(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

// Function to get document

exports.getAll = function (query, collection, selection, app, callback){
	collection.find(query, selection).exec(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};