export interface IEnvironment {
  serverUrl: string;
  serverPort: number;
  dbUrl: string;
  dbPort: number;
}
export const DEV: IEnvironment = {
  serverUrl: 'http://localhost:3000/api/',
  serverPort: 3000,
  dbUrl: 'http://localhost:8000/',
  dbPort: 8000,
};

export const PROD: IEnvironment = {
  serverUrl: 'http://localhost:3000/api/',
  serverPort: 3000,
  dbUrl: 'http://localhost:8000/',
  dbPort: 8000,
};

export const env = (function () {
  if (process.env.NODE_ENV === 'production') {
    return PROD;
  } else {
    return DEV;
  }
})();
