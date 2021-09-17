const httpStatus = require('http-status-codes');
const asyncReq = require('@app/helpers/asyncReq');
const loggerUtils = require('@app/utils/api/call.utils');
const { plivoConfiguration } = require('@constants/call.constants');
// const _ = require('lodash');
const plivo = require('plivo');
const phloClient = new plivo.Client(plivoConfiguration.auth_id, plivoConfiguration.auth_token);

console.log(loggerUtils)

exports.makeCall = async (req,res) => {
  const response = { statusCode : httpStatus.OK };
  const logDetail = {
    name: req.body.name,
    fromNumber: req.body.from,
    toNumber: req.body.to,
    duration: 60 * req.body.duration
  }
  phloClient.calls.create(
    logDetail.fromNumber,
    logDetail.toNumber,
    "http://s3.amazonaws.com/static.plivo.com/answer.xml", 
    {
      answerMethod: "GET",
      time_limit: logDetail.duration
    }
  ).then(async function (resp) {
      const result = await loggerUtils.logCallDetails(logDetail);
      response.success = 1;
      if (result) {
        response.message = resp.message;
        response.requestUuid = resp.requestUuid;
      } else {
        response.message = 'Failed to Log Call Details';
      }
      return asyncReq(response)(req, res);
  }, function (err) {
      response.success = 0;
      response.message = 'Unable to make call';
      return asyncReq(response)(req, res);
  });
}

exports.hangUp = async (req,res) => {
  const response = { statusCode : httpStatus.OK };
  phloClient.calls.hangup(
    req.body.requestId
  ).then(function (resp) {
      response.success = 1;
      response.message = resp.message;
      return asyncReq(response)(req, res);
  }, function (err) {
      response.success = 0;
      response.message = 'Call not found';
      return asyncReq(response)(req, res);
  });
}


