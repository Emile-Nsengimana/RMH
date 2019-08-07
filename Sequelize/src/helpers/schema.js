import joi from '@hapi/joi';
import { type } from 'os';

const userSchema = joi.object().keys({
  userId: joi.string().min(16).required(),
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  gender: joi.string().valid('male', 'female').required(),
  department: joi.string().min(3).required(),
  type: joi.string().min(3).required(),
  phoneNo: joi.string().trim().regex(/^[0-9]{10,13}$/).required(),
  email: joi.string().email().required(),
  password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),
  confirmPassword: joi.string().required(),
});

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
const assetSchema = joi.object().keys({
  serialNo: joi.string().alphanum().min(5).required(),
  name: joi.string().required().min(3),
  status: joi.string().alphanum().valid('inservice', 'under-maintenance', 'disposed').required(),
  category: joi.string().alphanum().min(3).required(),
  department: joi.string().min(5).required(),
  building: joi.string(),
});

export {
  userSchema,
  loginSchema,
  assetSchema,
};
