import hash from 'bcrypt';

class Password {
  // hash password
  static hashPassword(key) {
    const hashedPassword = hash.hashSync(key, 10);
    return hashedPassword;
  }
}

export default Password;
