const { response } = require('express');
const logger = require('@plugins/logger');
/**
 * Summary                            used to send response for a request
 * @param   {Object}   res            response object
 * @param   {Object}   responseBody   object indicating the statuscode and body/error message to be sent(if any)
 */
exports.sendValidResponse = (res, responseBody) => {
  logger.info('Response is : ' + JSON.stringify(responseBody));
  res.statusCode = responseBody.statusCode;
  if (responseBody.error) {
    res.send({
      error : responseBody.error
    });
  } else if (responseBody.message) {
    res.send({
      ...responseBody
    });
  }
  else if (responseBody.success == 0 || responseBody.success == 1) {
    res.send(responseBody);
  }
  else {
    res.send({});
  }
};
