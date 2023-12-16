import 'dotenv/config';
import express from 'express';
import router from './routes';
import database from './database';
import env from './env';

const app = express();
app.use(express.json());
app.use(router);
app.use(database);

database.listen(env.DB_PORT, () => {
  console.log('Database listening on port ' + env.DB_PORT);
});

app.listen(env.PORT, () => {
  console.log('Server listening on port ' + env.PORT);
});
