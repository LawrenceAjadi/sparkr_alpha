var express = require('express');
var router = express.Router();

//When poll with ID id loads, send poll summary to client
router.get('/:id', function(req,res) {

});

//when widget is loaded show this
router.get('/:id/widget_a', function(req,res) {

});


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

