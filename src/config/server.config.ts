import { config } from 'dotenv'
import configGW from '../api/server.api'
import { Application } from "express";
import { Server } from 'http'
import logger from "./login.config";
var grpc = require("@grpc/grpc-js");
import getServerGrpc from './grpc.config'

config()


async function configServer(app: Application) {
    let config = await configGW.getConfig();
    const PORT: Number = config["server.port"] || 3000;

    process.env.USER = config["database.user"];
    process.env.HOST = config["database.host"];
    process.env.DATABASE = config["database.name"];
    process.env.PASSWORD = config["database.password"];
    process.env.PORTDB = config["database.port"];


    const server: Server
        = app.listen(PORT, () => logger.info(`Server is on Port: ${PORT}`))


    let routeServer = getServerGrpc();
    routeServer.bindAsync(
        "127.0.0.1:9910",
        grpc.ServerCredentials.createInsecure(),
        () => {
            routeServer.start();
            logger.info(`Server Grpc  is on Port: 127.0.0.1:9910`)
        }
    )

}

export default configServer;