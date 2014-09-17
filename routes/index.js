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


/*
//When user clicks vote, it should aim at /:id/uservote to save to db
router.post('/:id/uservote', function(req, res) {

});

//When user submits comments they wrote/agreed with, aim here
router.post('/:id/reasons', function(req, res) {

});

//When user upvotes/downvotes individual comments
router.post('/:id/minivote', function(req,res) {

});

//When user sparks debate, store that in main poll json
router.post('/:id/spark', function(req,res) {

});
*/

module.exports = router;

