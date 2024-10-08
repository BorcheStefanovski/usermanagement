import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectionString = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

console.log('CONNECTION STRING', connectionString)
console.log(' DB NAME', dbName)

const connectToDB = async (): Promise<void> => {
    if (!connectionString || !dbName) {
        console.error('Missing database connection details in environment variables.');
        return;
    }

    try {
        await mongoose.connect(connectionString, {
            autoIndex: true,
            dbName: dbName
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

export default connectToDB;
