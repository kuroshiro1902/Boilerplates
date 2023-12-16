import { EStatusCode } from '../common/constants/status-code.constant';
import { ApiResponse } from '../common/models/api.model';

export const serverError = (
  res: ApiResponse,
  message = 'Internal Server Error!'
) => {
  return res.status(EStatusCode.SERVER_ERROR).json({ message });
};
