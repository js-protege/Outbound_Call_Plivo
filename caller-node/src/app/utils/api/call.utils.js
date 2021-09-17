const callModels = require('@app/models');

exports.logCallDetails = async callDetails => {
  return callModels.CallLog.create(callDetails)
};


