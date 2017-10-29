var cluster = require("cluster");
var process = require("process");

// Code to run if we're in the master process
if (cluster.isMaster) {

	// Count the machine's CPUs
	var cpuCount = require("os").cpus().length;
	var forks = cpuCount/2;

	// Create a worker for each CPU
	for (var i = 0; i < forks; i += 1) {
		cluster.fork();
	}

// Code to run if we're in a worker process
} else {

	var R = require("ramda");
	var express = require("express");
	var morgan = require("morgan");

	var mongodb = require("mongodb");

	var mongo = mongodb.MongoClient;
	var ObjectId = mongodb.ObjectId;

	var mongoUrl = process.env.MONGODB_URL;

	var port = process.env.BACKEND_PORT;
	var host = process.env.BACKEND_HOST;

	var TAG_LIMIT = 200;
	var VID_LIMIT = 100;

	var app = express();
	var db = null;

	app.use(morgan("combined"));
	app.set("json spaces", 4);

	var sendCacheableResult = function(res, seconds, result) {
		res.header("Cache-Control", "public, max-age=" + seconds);
		res.json(result);
	};


	var sendNoCacheResult = function(res, result) {
		res.header("Cache-Control", "public, no-cache");
		res.json(result);
	};


	app.get("/tags", function(req, res) {
		
		var maxAge = 24*60*60;

		if(req.query.include) {

			var aggQuery = [
				{$match: {tags: { "$all": req.query.include.split(",")}}},
				{ "$project": { "tags":1 }},
				{ "$unwind": "$tags" },  
				{ "$group": { "_id": "$tags", "count": { "$sum": 1 } }}, 
				{ "$sort": {count: -1}},
				{ "$limit": TAG_LIMIT},
				{ "$project": { "_id":1 }},
				{ "$sort": {_id: 1}},
			];

			db
			.collection("videos")
			.aggregate(aggQuery)
			.toArray()
			.then(function(docs){
				sendCacheableResult(res, maxAge, R.pluck("_id", docs));
			})
			.catch(function(err) {
				service.sendException(req, res, err, "backend", "Failed to load aggregated tags.");
			});

		} else {

			db
			.collection("tags")
			.find({}, {_id:0, count:0})
			.sort({count:-1})
			.limit(TAG_LIMIT)
			.toArray()
			.then(function(docs) {
				sendCacheableResult(res, maxAge, R.pluck("name", docs).sort());
			})			
			.catch(function(err) {
				service.sendException(req, res, err, "backend", "Failed to load all tags.");
			});
		}

	});

	app.get("/videos/:videoid", function(req, res) {

		var videoid = req.params.videoid;

		if(videoid.length != 24) {
			service.sendException(req, res, err, "backend", "Malformed video id.", 400);
		} else {

			var query = {_id: new ObjectId(videoid)};

			db
			.collection("videos").findOne(query)
			.then(function(video) {

				if(!video)
					throw new Error("video not found");

				sendNoCacheResult(res, video);

				return db.collection("hits").update(
					{video_id: video["_id"]}, 
					{
						$inc: {hits: 1},
						$set: {video: video}
					},
					{upsert: true});


			})
			.catch(function(err){
				service.sendException(req, res, err, "backend", "Failed to load a video.");
			});
		}
	});

	app.get("/videos", function(req, res) {

		var maxAge = 0;

		if(!req.query.include) {
			
			maxAge = 60;

			db
			.collection("hits")
			.find({},{"video.link":1, "video.thumbfile":1, "video._id":1, _id:0, "video.thumbs":1 })
			.sort({hits: -1, _id: -1})
			.limit(VID_LIMIT)
			.toArray()
			.then(function(docs) {
				sendCacheableResult(res, maxAge, R.pluck("video",docs));

			}).catch(function(err){
				service.sendException(req, res, err, "backend", "Failed to load all hits.");
			});
		} else {
			maxAge = 24*60*60;

			var query = {};
			query.tags = {$all: req.query.include.split(",")};

			
			db
			.collection("videos")
			.find(query, { link: 1, thumbfile: 1, thumbs: 1})
			.sort({_id:-1})
			.limit(VID_LIMIT)
			.toArray()
			.then(function(docs) {
				sendCacheableResult(res, maxAge, docs);
			
			}).catch(function(err){
				service.sendException(req, res, err, "backend", "Failed to load all videos.");
			});
		}
	});
	mongo.connect(mongoUrl, {poolSize: 32})
	.then(function(con){
		db = con;
		app.listen(port, host);
	});
}
