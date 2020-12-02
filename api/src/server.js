const app =  require('./app');

const { connectDb } = require('./helpers/db');
const DB = process.env.MONGO_URL;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const mongoConnectionString = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

const PORT = process.env.PORT || 3001;

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Main API service started successfully on port ${PORT}, db path is ${DB} YOYO`);
        console.log('mongo connection  string ', mongoConnectionString)
    });
}

connectDb(mongoConnectionString)
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', startServer);