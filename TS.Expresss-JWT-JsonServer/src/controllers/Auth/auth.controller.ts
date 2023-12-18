import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import env from '../../env';
import { IUser, UserDTO } from '../../common/models/user.model';
import { ApiRequest, ApiResponse } from '../../common/models/api.model';
import { paramsSerialize } from '../../common/utils/paramsSerialize.util';
import { EStatusCode } from '../../common/constants/status-code.constant';
import { serverError } from '../../errors';

export const authPath = '/users';
export const authDbPath = env.DB_URL + authPath;
export const tokenLifeTime = '7d';

class AuthController {
  async login(req: ApiRequest, res: ApiResponse) {
    try {
      const { username, password } = req.body;

      if (!!!username || !!!password) {
        return res
          .status(EStatusCode.INVALID_INPUT)
          .json({ message: 'Invalid username or password!' });
      }

      const user = await this.findOneByUsername(username);

      if (!user) {
        return res
          .status(EStatusCode.NOT_FOUND)
          .json({ message: 'Username not found.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(EStatusCode.UNAUTHORIZED)
          .json({ message: 'Wrong password!' });
      }

      const token = jwt.sign(UserDTO(user), env.SECRET_KEY!, {
        expiresIn: tokenLifeTime,
      });
      res.json({ isSuccess: true, data: token });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  }
  async signup(req: ApiRequest, res: ApiResponse) {
    try {
      const { username, password, name } = req.body;

      if (!!!username || !!!password || !!!name) {
        return res.status(400).json({ message: 'Missing field!' });
      }

      const existedUser = await this.findOneByUsername(username);
      if (existedUser) {
        return res
          .status(EStatusCode.CONFLICT)
          .json({ message: 'User already exists!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        username,
        password: hashedPassword,
        name,
      };
      const data = await axios.post<IUser>(authDbPath, user);
      res.status(EStatusCode.CREATED).json({ data: UserDTO(data.data) });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  }

  private async findOneByUsername(username: string) {
    const res = await axios.get<IUser[]>(
      authDbPath + paramsSerialize({ username })
    );
    if (res.data.length < 1) return null;
    return res.data[0];
  }
}

export default new AuthController();
