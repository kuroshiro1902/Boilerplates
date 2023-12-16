import jsonServer from 'json-server';
import path from 'path';

const dbFilePath = path.join(__dirname, 'db.json');

const database = jsonServer.create();
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();

database.use(middlewares);
database.use(router);

export default database;
