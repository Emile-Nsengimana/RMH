import { loginSchema, userSchema, assetSchema } from '../helpers/schema';

class dataValidations {
  static validateUserInfo(req, res, next) {
    const {
      userId, firstName, lastName, gender, phoneNo, email, password, confirmPassword, department, type
    } = req.body;
    const newUser = userSchema.validate({
      userId,
      firstName,
      lastName,
      gender,
      phoneNo,
      email,
      department,
      type,
      password,
      confirmPassword,
    });
    if (newUser.error) {
      if (newUser.error.details[0].type === 'passwordComplexity.base') {
        return res.status(400).json({
          error: 'password length must be 8 with atleast an upper, lower case letter, and a number',
        });
      }
      if (newUser.error.details[0].path[0] === 'phoneNo') {
        return res.status(400).json({
          error: 'invalid phone number',
        });
      }
      return res.status(400).json({
        error: newUser.error.details[0].message.replace('"', ' ').replace('"', ''),
      });
    }
    req.userInfo = newUser.value;
    next();
  }

  // user sign in validation
  static checkSign(req, res, next) {
    try {
      const { email, password } = req.body;
      const credentials = loginSchema.validate({
        email: email.trim(),
        password,
      });

      if (credentials.error) {
        return res.status(400).json({
          error: credentials.error.details[0].message.replace('"', ' ').replace('"', ''),
        });
      }

      req.user = credentials.value;
      next();
    } catch (error) {
      return res.status(400).json({
        error: 'check if all reuired information has been provided',
      });
    }
  }

  static checkPassword(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        error: 'password doesn\'t match',
      });
    }
    next();
  }
  static checkAssetData(req, res, next) {
    const {
      serialNo, name, status, category,department, building,
    } = req.body;
    const assetInfo = assetSchema.validate({
      serialNo, name, status, category, department, building,
    }, { abortEarly: false });
    const errors = [];
    if(assetInfo.error){
      if(assetInfo.error.details.length > 1){
        for(let i=0; i < assetInfo.error.details.length; i+=1){
          errors.push(assetInfo.error.details[i].message.replace('"', ' ').replace('"', ''));
        }
        if(errors.length > 3) {
          return res.status(400).json({
            error: 'please fill all required information',
          });
        }
        return res.status(400).json({
          error: errors,
        });
      }
      return res.status(400).json({
        error :assetInfo.error.details[0].message.replace('"', ' ').replace('"', ''),
      });
    }  
    req.body = assetInfo.value;  
    next();
  }
}

export default dataValidations;
