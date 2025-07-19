import mongoose from "mongoose";

async function pool() {
    mongoose.connect('mongodb://melques:12345@localhost:27017/projeto3');
    return mongoose.connection;
}

export default pool;