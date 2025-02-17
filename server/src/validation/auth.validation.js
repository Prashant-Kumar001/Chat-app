import joi from "joi";
import ResponseHandler from "../utils/responseHandler.js";
import statusCodes from "../utils/statusCodes.js";

const validateUserInput = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    bio: joi.string().max(500).required(),
  });

  const { username, email, password, bio } = req.body;
  const { file } = req;

  const { error } = schema.validate({ username, email, password, bio });

  if (error) {
    return ResponseHandler.error(
      res,
      statusCodes.BAD_REQUEST,
      error.details[0].message
    );
  }

  if (!file || file.length === 0) {
    return ResponseHandler.error(
      res,
      statusCodes.BAD_REQUEST,
      "No files uploaded."
    );
  }

  next();
};

const loginValidator = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  const { email, password } = req.body;
  console.log(req.body);

  const { error } = schema.validate({ email, password });

  if (error) {
    return ResponseHandler.error(
      res,
      statusCodes.BAD_REQUEST,
      error.details[0].message
    );
  }
  next()
};

export { validateUserInput, loginValidator };
