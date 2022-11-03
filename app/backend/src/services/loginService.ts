import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import UserTable from '../database/models/UserModel';
import TokenInterface from '../interfaces/TokenInterface';
import UserInterface from '../interfaces/UserInterface';

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

  public loginToken = async (token: string): Promise<string> => {
    const decodedToken = JWT.verify(token, 'jwt_secret') as TokenInterface;

    // https://sebhastian.com/sequelize-findone/
    const userData = await UserTable.findOne(
      { where: { id: decodedToken.id } },
    ) as UserInterface;

    return userData.role;
  };
}

export default LoginService;
