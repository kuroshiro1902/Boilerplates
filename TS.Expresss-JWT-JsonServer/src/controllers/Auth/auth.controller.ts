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

      const existedUser = await this.findByUsername(username);
      if (
        !existedUser ||
        existedUser.length < 1 ||
        !bcrypt.compareSync(password, existedUser[0].password)
      ) {
        return res
          .status(EStatusCode.UNAUTHORIZED)
          .json({ message: 'Wrong password!' });
      }

      const token = jwt.sign({ username }, env.SECRET_KEY!, {
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

      const existedUser = await this.findByUsername(username);
      if (!!!existedUser || existedUser.length > 0) {
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

  private async findByUsername(username: string) {
    const res = await axios.get<IUser[]>(
      authDbPath + paramsSerialize({ username })
    );
    return res.data;
  }
}

export default new AuthController();
