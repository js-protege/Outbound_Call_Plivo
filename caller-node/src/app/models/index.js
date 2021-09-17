const fs = require('fs');
const path = require('path');
const logger = require('@plugins/logger');
const {Sequelize, DataTypes} = require('sequelize');
const { sequelize : sequelizeConfig } = require('config');

const filebasename = path.basename(__filename);

const primaryDatabase = new Sequelize(sequelizeConfig.primary.database, sequelizeConfig.primary.username,
  sequelizeConfig.primary.password, sequelizeConfig.primary.options);

const db = {};

// for mapping every model to database
fs.readdirSync(__dirname)
.filter(function(file) {
// removes index file from being mapped
return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function(file) {
  // const model = primaryDatabase['import'](path.join(__dirname, file));
  const model = require(path.join(__dirname, file))(primaryDatabase, DataTypes)
  db[model.name] = model;
});

// for creating association if present in any model
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
  db[modelName].associate(db);
  }
});

primaryDatabase.sync()
  .then((result) => {
  logger.info('Plivo database sync completed');
  }, (err) => {
  logger.error(err);
});

db.sequelize = primaryDatabase;
db.Op = Sequelize.Op;

module.exports = db;
