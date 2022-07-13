import axios from "axios";
import client from 'cloud-config-client'
import { config } from 'dotenv'
import logger from "../config/login.config";

config()

async function getConfig() {

  logger.info('Loading resource from cloud config server .........')

  let port = await client
    .load({
      endpoint: "http://localhost:8900",
      name: "order-service",
      profiles: "local",
    })
    .then((config) => {
      return config.properties;
    });
  return port;
}
const configAPI = {
  getConfig,
};

export default configAPI;