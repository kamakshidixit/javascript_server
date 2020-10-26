import * as express from 'express';
class Server {
    // tslint:disable-next-line: semicolon
    app
    constructor(private config) {
        this.app = express();
    }
    bootstrap() {
        this.SetupRoutes();
        return this;
    }
    SetupRoutes() {
        const {app} = this;
        app.get('/health-check', (req, res, next) => {
            res.send('i am ok');
        });
        return this;
    }
    run() {
        const {app, config: {PORT}} = this;
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`App is running on port ${PORT}`);
        // tslint:disable-next-line: semicolon
        })
    }
}
export default Server;
