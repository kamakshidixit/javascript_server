import * as express from 'express';
import * as bodyparser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import routes from  './router';
import Database from './libs/Database';
import { disconnect } from 'process';

class Server {

    private app: any;
    constructor(private config) {
        this.app = express();
    }
    bootstrap() {
      this.initBodyParser();
        this.SetupRoutes();
        return this;
    }
    SetupRoutes() {
        this.app.use('/health-check', (req, res, next) => {
            res.send('i am ok');
        });

        this.app.use('/api', routes);

        this.app.use(notFoundHandler);

        this.app.use(errorHandler);
    }

    public initBodyParser() {
      this.app.use(bodyparser.json());
      this.app.use(bodyparser.urlencoded({ extended: false }))
    }
    run() {
        const {app, config: {PORT}} = this;
        Database.open('mongodb://localhost:27017/express-training')
        .then((res) => {
          console.log('successfully connected to mongo');
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
            }
            else{
            console.log(`App is running on port ${PORT}`);
            //Database.disconnect();
            }
           });
      })
       .catch(err => console.log(err));
        return this;
    }
}
export default Server;

