var express = require('express');
const bcrypt = require('bcrypt-nodejs');
const is = require('is_js');

const Users = require('../db/models/Users');
const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
const Enum = require('../config/Enum');
var router = express.Router();


/* GET users listing. */
router.get('/', async(req, res) => {
  try {
    let users = await Users.find({});

    res.json(Response.successResponse(users));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post('/add' , async (req, res) => {
  let body = req.body;
  try {

    if(!body.email) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "email field must be filled");
    if(is.not.email(body.email)) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "email field must be an email format");
    if(!body.password) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "password field must be filled");
    if (body.password.length < Enum.PASS_LENGTH) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "password length must be greater than " + Enum.PASS_LENGTH);

    let password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);

    await Users.create({
      email: body.email,
      password,
      is_active: true,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number
    });

    res.status(Enum.HTTP_CODES.CREATED).json(Response.successResponse({success: true}, Enum.HTTP_CODES.CREATED));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post('/update', async (req, res) => {
  let body = req.body;
  try {
    let updates = {};

    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id filed must be filled");

    if(body.password && body.password.length >= Enum.PASS_LENGTH)  updates.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);
    if(body.first_name) updates.first_name = body.first_name;
    if(typeof body.is_active === "boolean") updates.is_active = body.is_active;    if(body.last_name) updates.last_name = body.last_name;
    if(body.phone_number) updates.phone_number = body.phone_number;

    await Users.updateOne({_id: body._id}, updates);

    res.json(Response.successResponse({success: true}));
    
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/delete", async (req, res) => {
  let body = req.body;
  try {
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id filed must be filled");
    
    await Users.deleteOne({_id: body._id});

    res.json(Response.successResponse({success: true}));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post('/register' , async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({});

    if (user) {
      return res.sendStatus(Enum.HTTP_CODES.NOT_FOUND);
    }

    if(!body.email) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "email field must be filled");
    if(is.not.email(body.email)) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "email field must be an email format");
    if(!body.password) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "password field must be filled");
    if (body.password.length < Enum.PASS_LENGTH) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "password length must be greater than " + Enum.PASS_LENGTH);


    let password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);

    await Users.create({
      email: body.email,
      password,
      is_active: true,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number
    });

    res.status(Enum.HTTP_CODES.CREATED).json(Response.successResponse({success: true}, Enum.HTTP_CODES.CREATED));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
