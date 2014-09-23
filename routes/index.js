var express = require('express');
var router = express.Router();

router.get('/yesnob', function(req,res) {
  return res.render('ynpollb');
});

router.get('/yesnoc', function(req,res) {
  return res.render('ynpollc');
});

//when widget is loaded show this
router.get('/widget_a', function(req,res) {

});

//When poll with ID id loads, send poll summary to client
router.get('/1', function(req,res) {
  var db = req.db;
  var collection = db.get('tester');

  collection.find(function(e,docs) {
  	res.send(docs);
  });
});




//When poll with ID id loads, send poll summary to client
router.get('/11', function(req,res) {

  var db = req.db;
  var collection = db.get('tester');


  collection.findOne({}, function(err, cursor) {

  	console.log(cursor.text);

  	res.json({ "text" : cursor.text, "A" : cursor.A, "B" : cursor.B , "AMin": cursor.AMin, "AMax": cursor.AMax, "BMin": cursor.BMin, "BMax" : cursor.BMax, "AVotes" : cursor.AVotes, "BVotes" : cursor.BVotes , "comments" : cursor.comments});
  });



  //res.send({ namer: "Hello" , theinvisible: tessa });

});






router.get('/tester', function(req,res) {
  return res.render('tester');
});



//When user clicks vote, it should aim at /:id/uservote to save to db
router.post('/11/uservote', function(req, res) {
  var db = req.db;
  var collection = db.get('tester');
  if(req.body.stance == "A") {
  	collection.update({"id": 1}, { $inc : { "AVotes": 1 } });
  } else if(req.body.stance == "B") {
  	collection.update({"id": 1}, { $inc : { "BVotes": 1 } });
  }
});


//When user submits comments they wrote, aim here
router.post('/11/userreason', function(req, res) {
  var db = req.db;
  var collection = db.get('tester');
  var curNum;

  collection.findOne({"id": 1}, function(err, cursor) {
  	curNum = cursor.curCommentNum;
  	console.log(cursor.curCommentNum);

  	collection.update({"id": 1}, { $push : { "comments": {"id": curNum, "text": req.body.text, "stance": req.body.stance, "uVotes": 0, "dVotes": 0, "replies": [] } } })
    collection.update({"id": 1}, { $inc : { "curCommentNum": 1 } });

  })

  

});

/*
//When user submits comments agreed with, aim here
router.post('/:id/reasons', function(req, res) {

});
*/

//need to know which comment is in question here. save a local variable at client
//and then use this to aim at the right comment
router.post('/11/minivote', function(req,res) {
  var db = req.db;
  var collection = db.get('tester');

  var tempu = 'comments.'+(req.body.comment_id-1)+'.uVotes';
  var tempd = "comments."+(req.body.comment_id-1)+".dVotes";

  var incu = {};
  incu[tempu] = 1;

  var incd = {};
  incd[tempd] = 1;
  
  if(req.body.direction == "up") {

  	collection.update({ "id": 1 }, { $inc : incu });

  } else if(req.body.direction == "down") {

  	collection.update({ "id": 1 }, { $inc : incd });

  }

});


/*
//When user sparks debate, store that in main poll json
router.post('/:id/spark', function(req,res) {

});
*/

module.exports = router;

