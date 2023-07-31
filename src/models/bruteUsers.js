const BruteForceSchema = require('express-brute-mongoose/dist/schema');
const mongoose = require('mongoose');

module.exports = mongoose.model(
  'bruteforce',
  new mongoose.Schema(BruteForceSchema),
);
