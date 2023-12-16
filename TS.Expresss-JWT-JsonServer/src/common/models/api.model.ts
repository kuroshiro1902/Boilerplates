import { Request, Response } from 'express';

export interface IApiResponse {
  isSuccess?: boolean;
  message?: string;
  data?: any;
}

export type ApiRequest = Request;

export type ApiResponse = Response<IApiResponse>;
