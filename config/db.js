const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(`${process.env.MONGO_URL}evaluationunit7`);

module.exports = {connection};