import hash from 'bcrypt';
import generateToken from '../helpers/processToken';
import processPassword from '../helpers/processPassword';
import model from '../db/models/index';

const { User } = model;
class userController {
  // add a new user ----------------------------------------------------------------------------
  static async registerUser(req, res) {
    try {
      const {
        userId, firstName, lastName, gender, department, type, email,
        phoneNo, password
      } = req.userInfo;
      const hashedPassword = processPassword.hashPassword(password);

      const newUser = {
        userId, firstName, lastName, gender, department, type, email,
        phoneNo, password: hashedPassword, status: 'active'
      };
      const register = await User.create(newUser);
        if (register) {
        const token = await generateToken.signToken(req.body);
        return res.status(201).json({
          status: 201,
          message: 'user created',
          token,
        });
      }
      throw register;
    } catch (error) {
      return res.status(400).json({
        error: error.errors[0].message
      });
    }
  }

  // user login -------------------------------------------------------------------------------------
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ where: {email}});
      if (findUser) {
        const passkey = hash.compareSync(password, findUser.dataValues.password);
        if (passkey) {
            const { userId, firstName, lastName, email, type } = findUser.dataValues; 
          const userPayload = {
            userId,
            firstName,
            lastName,
            email,
            type
          };
          const jwtoken = await generateToken.signToken(userPayload);
          return res.status(200).json({
            status: 200,
            data: {
              token: jwtoken,
              data: userPayload
            },
          });
        } return res.status(400).json({ status: 400, error: 'incorrect password' });
      } return res.status(404).json({ status: 404, error: 'user with that email doesn\'t exist' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'internal server error' });
    }
  }

  // disable a user ---------------------------------------------------------------------------------
//   static async disableUser(req, res) {
//     try {
//       const user = await con.query(userTable.searchUserById, [req.params.userId]);
//       if (user.rowCount !== 0) {
//         await con.query(userTable.updateUser, [req.body.status, req.params.userId]);
//         return res.status(200).json({
//           status: 200,
//           message: `${user.rows[0].firstname} ${user.rows[0].lastname} has been ${req.body.status}`,
//         });
//       }
//       return res.status(404).json({
//         status: 404,
//         message: 'user not found',
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: 500,
//         error: 'internal server error',
//       });
//     }
//   }

//   //   remove a user ----------------------------------------------------------------------------------
//   static async removeUser(req, res) {
//     try {
//       const user = await con.query(userTable.searchUserById, [req.params.userId]);
//       if (user.rowCount !== 0) {
//         const deleteUser = await con.query(userTable.removeUser, [req.params.userId]);
//         if (deleteUser.rowCount !== 0) {
//           return res.status(200).json({
//             status: 200,
//             message: `${user.rows[0].firstname} ${user.rows[0].lastname} has been removed`,
//           });
//         }
//         throw Error;
//       }
//       return res.status(404).json({
//         status: 404,
//         message: 'user not found',
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: 500,
//         error: 'internal server error',
//       });
//     }
//   }

//   //   change user password -----------------------------------------------------------------------------
//   static async resetPassword(req, res) {
//     try {
//       const findUSer = await con.query(userTable.searchUser, [req.params.email]);

//       if (findUSer.rowCount !== 0) {
//         const { oldPassword, password } = req.body;
//         const passwordCompare = hash.compareSync(oldPassword, findUSer.rows[0].password);
//         if (passwordCompare) {
//           const hashedPassword = processPassword.hashPassword(password);
//           await con.query(userTable.changePassword, [hashedPassword, findUSer.rows[0].userid]);
//           return res.status(200).json({
//             status: 200,
//             message: 'password changed successfully',
//           });
//         }
//         return res.status(401).json({
//           status: 401,
//           error: 'incorrect password',
//         });
//       }
//       return res.status(404).json({
//         status: 404,
//         error: `user with ${req.params.email} not found`,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: 500,
//         error: 'internal server error',
//       });
//     }
//   }

//   // display all users -----------------------------------------------------------------------------------
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users) {
        return res.status(200).json({
          status: 200,
          data: users,
        });
      }
      throw Error;
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'no user found',
      });
    }
  }

//   // search a specific user ------------------------------------------------------------------------------
//   static async searchUser(req, res) {
//     try {
//       const user = await con.query(userTable.searchUserById, [req.params.userId]);
//       if (user.rowCount !== 0) {
//         return res.status(200).json({
//           status: 200,
//           data: {
//             userId: user.rows[0].userid,
//             firstName: user.rows[0].firstname,
//             lastName: user.rows[0].lastname,
//             gender: user.rows[0].gender,
//             department: user.rows[0].department,
//             type: user.rows[0].type,
//             email: user.rows[0].email,
//             phoneNo: user.rows[0].phoneno,
//             status: user.rows[0].status,
//             isAdmin: user.rows[0].isadmin
//           }
//         });
//       }
//       throw Error;
//     } catch (error) {
//       return res.status(404).json({
//         status: 404,
//         error: `user with Id: ${req.params.userId} not found`,
//       });
//     }
//   }
}
export default userController;
