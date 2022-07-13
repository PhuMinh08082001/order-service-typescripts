import express, { json, urlencoded, Request, Response, NextFunction, ErrorRequestHandler, Application } from "express";
import { Server } from 'http'
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import createHttpError from "http-errors";
import { config } from "dotenv";
import configServer from './config/server.config'
import cookieParser from "cookie-parser";
import router from './routes/index.route'
import runKafkaServer from './kafka/kafka.server'

config()

const app: Application = express()
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(morgan("tiny"));
  app.use(helmet());
  app.use(compression());
}

app.use(router)
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send("Hello from ts app");
// })

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message
  })
}

app.use(errorHandler)

configServer(app)
runKafkaServer()

module.exports = app;