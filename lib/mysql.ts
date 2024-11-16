import mysql, { Connection } from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'rootroot',
  database: process.env.MYSQL_DATABASE || 'novel_db',
};

export const connectToDatabase = async (): Promise<Connection> => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection successful');
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};
