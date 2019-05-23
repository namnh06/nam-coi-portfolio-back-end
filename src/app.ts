import express from 'express';
import cors from 'cors';
import auth from './middleware/auth.js';
import bodyParser from 'body-parser';
require('dotenv').config();
const app = express();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config(this.app);
  }
  private config(app: express.Application): void {
    app.use((req, res, next) => {
      next();
    });
    app.use(cors());
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE '
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    });

    app.post('/login', (req, res, next) => {
      // res.send(req);
      // console.log(req);
      res.send('ok');
    });

    app.use(auth);
  }
}

declare global {
  namespace Express {
    interface Request {
      isAuth?: Boolean;
      userId: any;
    }
  }
}

export default new App().app;
