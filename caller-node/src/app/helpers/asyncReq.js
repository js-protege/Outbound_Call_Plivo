const responseHandler = require('./responseHandler');
const logger = require('@plugins/logger');

/**
 * @param   {Object}       req                  request object of request
 * @param   {Object}       res                  response object of request
 * @param   {Object}       responseBody         response body of api
 * @returns {Promise}
 */
const handleRequest = async (res, responseBody) => {
  try {
    responseHandler.sendValidResponse(res, responseBody);
  } catch (err) {
    logger.error(err);
    if (!err.statusCode) {
      responseHandler.sendValidResponse(res, {
        statusCode : 500,
        error : 'some error occurred'
      });
    } else {
      responseHandler.sendValidResponse(res, err);
    }
  }
};

module.exports = function (responseBody) {
  return async (req, res, next) => {
    try {
      await handleRequest(res, responseBody);
    }
    catch(ex) {
      next(ex);
    }
  };  
};
