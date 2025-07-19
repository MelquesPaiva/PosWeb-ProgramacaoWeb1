import mongoose from "mongoose";

async function pool() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default pool;