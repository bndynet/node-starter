"use strict"

import * as express from "express";

class Server {
    public app: express.Application;

    public static bootstap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
    }
}