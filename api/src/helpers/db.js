const mongoose = require('mongoose');

module.exports.connectDb = (db) => {

  console.log("inside function ***********", db);
  mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });

  const database = mongoose.connection;

  return database;
}