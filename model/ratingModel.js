const mongoose = require('mongoose');
const User = require("./UserModel");
const Astrologers = require('./astrologerModel');

const ratingSchema = new mongoose.Schema({
  astroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Astrologers',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
}, {
  timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
