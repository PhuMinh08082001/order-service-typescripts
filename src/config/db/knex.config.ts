import {config} from './knex.file'
import { Knex, knex } from 'knex'
const environment = process.env.ENVIRONMENT || "development";
const configKnex: Knex.Config = config.development

const knexInstance = knex(configKnex);

export default knexInstance