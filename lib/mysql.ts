import mysql, { Pool } from 'mysql2/promise';

let pool: Pool;

export const getDbPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'novel_db',
    });
  }
  return pool;
};

// 测试连接
(async () => {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT 1');
    console.log('MySQL 连接成功:', rows);
  } catch (error) {
    console.error('MySQL 连接失败:', error);
  }
})();
