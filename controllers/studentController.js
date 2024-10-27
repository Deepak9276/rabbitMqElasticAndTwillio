const { body, validationResult } = require("express-validator");
const helper = require("../helper");
const bcrypt = require("bcrypt");
const studentService = require("../services/studentService");
//const { response } = require('express');

exports.register = [
  body("name")
    .isLength({ min: 1 })
    .isAlphanumeric()
    .withMessage("Name Must Be Required"),
  body("mobile_number")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Mobile Number Must Be Required"),
  body("email")
    .isEmail()
    .withMessage("Email Must Be Required")
    .custom(async (value) => {
      let email = value.toLowerCase();
      let student = await studentService.getStudentByEmail(email);
      console.log(student);
      if (student.length > 0) {
        return Promise.reject("Email Already In Use");
      }
    }),
  body("password")
    .isLength({ min: 6, max: 10 })
    .trim()
    .withMessage("Password Must Be Required"),
  // sanitizeBody('*').escape(),

  (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty())
        return helper.validationErrorResponse(
          res,
          "Validation Error",
          errors.array()
        );

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        req.body.password = hash;
        req.body.email = req.body.email.toLowerCase();
        studentService.register(req.body).then((responseData) => {
          if (responseData.status === false)
            return helper.errorResponse(res, "Student Not Saved");
          else return helper.successResponse(res, "Saved", responseData.data);
        });
      });
    } catch (err) {
      return helper.errorResponse(res, err);
    }
  },
];

// exports.login = [
//     body('email').isEmail().withMessage('Email Must Be Required'),
//     body('password').isNumeric().withMessage('Password Must Be Required'),

// ]

exports.getStudentByEmail = async (req, res) => {
  const resdData = await studentService.getStudentByEmail(req.params.email);
  return helper.successResponse(res, "Details Fetched", resdData);
};
