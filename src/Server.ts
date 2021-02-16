import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from  'cors';
import { IConfig } from './config/IConfig';
import { notFoundHandler, errorHandler } from './libs/routes';
import routes from  './router';
import Database from './libs/Database';
import { disconnect } from 'process';
import notFoundRoute from './libs/routes/notFoundRoute';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJsDoc from 'swagger-jsdoc';


class Server {

    private app: any;
    constructor(private config) {
        this.app = express();
    }
    bootstrap() {
      this.initBodyParser();
      this.app.use(cors());
        this.SetupRoutes();
        return this;
    }
    initSwagger = () => {
      const options = {
          definition: {
              info: {
                openapi: '3.0.0',
                description: 'An express app performing CRUD operation after authentication',
                  title: 'JavaScript-Server API Swagger',
                  version: '1.0.0',
              },
              properties: {
                email: 'kamakshi.dixit@successive.tech'
            },
              securityDefinitions: {
                  Bearer: {
                      type: 'apiKey',
                      name: 'Authorization',
                      in: 'headers'
                  }
              }
          },
          basePath: '/api',
          swagger: '4.1',
          apis: ['./src/controllers/**/routes.ts'],
      };
      const swaggerSpec = swaggerJsDoc(options);
      return swaggerSpec;
  }
    SetupRoutes() {
    const { app } = this;

        this.app.use('/health-check', (req: Request, res: express.Response, next: express.NextFunction) => {
            res.send('i am ok');
        });

        this.app.use('/api', routes);
        this.app.use('swagger', swaggerUI.serve, swaggerUI.setup(this.initSwagger()));



        this.app.use(notFoundRoute);


        this.app.use(errorHandler);
    }

    public initBodyParser() {
      this.app.use(bodyparser.json());
      this.app.use(bodyparser.urlencoded({ extended: false }));
    }
    run() {
        const { PORT, MONGO_URL } = this.config;
        Database.open(MONGO_URL)
        .then((res) => {
          console.log('successfully connected to mongo');
        this.app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
            }
            else {
            console.log(`App is running on port ${PORT}`);
            // Database.disconnect();
            }
           });
      })
       .catch(err => console.log(err));
        return this;
    }
}
export default Server;


