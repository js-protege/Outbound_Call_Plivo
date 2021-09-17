const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const callCtrl = require("@app/controllers/call.controller.js");
const {
  connectValidate,
  disconnectValidate
} = require('@app/validations/call.validation');


router.route('/connect').post(validate(connectValidate), callCtrl.makeCall);

router.route('/disconnect').post(validate(disconnectValidate), callCtrl.hangUp);

module.exports = router; 
