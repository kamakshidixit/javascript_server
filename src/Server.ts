import * as express from 'express';
import * as bodyparser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import routes from  './router';

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
    }
    run() {
        const {app, config: {PORT}} = this;
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`App is running on port ${PORT}`);

        });
        return this;
    }
}
export default Server;
