import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import UserTable from '../database/models/UserModel';

class LoginService {
  model: UserTable;

  constructor() {
    this.model = new UserTable();
  }

  public login = async (email: string, password: string): Promise <string> => {
    const userData = await UserTable.findOne(
      {
        where: { email },
        raw: true },
    );

    if (!userData) {
      return 'User not found';
    }

    if (!bcrypt.compareSync(password, userData.password)) {
      return 'Incorrect password';
    }

    const token = JWT.sign(
      { id: userData.id },
      'jwt_secret',
      { expiresIn: '7d' },
    );

    return token;
  };
}

export default LoginService;
