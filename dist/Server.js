"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
    }
    bootstrap() {
        this.SetupRoutes();
        return this;
    }
    SetupRoutes() {
        const { app } = this;
        app.get('/health-check', (req, res, next) => {
            res.send('i am ok');
        });
        return this;
    }
    run() {
        const { app, config: { PORT } } = this;
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`App is running on port ${PORT}`);
            // tslint:disable-next-line: semicolon
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map