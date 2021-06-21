import { ConnectionOptions } from 'typeorm'
import {SnakeNamingStrategy} from 'typeorm-naming-strategies'

const srcPath = __dirname
console.log('path:', srcPath, '\n');

// (cd build/src && ../../node_modules/.bin/typeorm migration:run)
// (cd src && ../node_modules/.bin/ts-node ../node_modules/typeorm/cli.js migration:run)

export default {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
    entities: [
        `${srcPath}/entity/**/*`
    ],
    migrations: [
        `${srcPath}/migration/**/*`
    ],
    subscribers: [
        `${srcPath}/subscriber/**/*.ts`
    ],
    cli: {
        "entitiesDir": `${srcPath}/entity`,
        "migrationsDir": `${srcPath}/migration`,
        "subscribersDir": `${srcPath}/subscriber`
    }
} as ConnectionOptions
