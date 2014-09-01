var express = require 'express'
var fs = require 'fs'
var path = require 'path'
var mongoose = require 'mongoose'

var pollSchema = mongoose.Schema({
  name: String,
  questions: [{ id: Number, text: String, A: String, B: String }],
  facts: [ text: String ]
});

var questionSchema = mongoose.Schema({
  id: Number,
  type: String,
  featured: Boolean,
  text: String,
  A: String,
  AVotes: Number,
  AMax: Number,
  AMin: Number,
  B: String,
  BVotes: Number,
  BMax: Number,
  BMin: Number,
  comments: [{ text: String, stance: String, uVotes: Number, dVotes: Number, replies[{text: String, stance: String, uVotes: Number, dVotes: Number}]],
  facts: [ text: String ]
});
