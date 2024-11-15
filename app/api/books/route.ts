import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
};

export async function GET() {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query<Book[] & RowDataPacket[]>('SELECT * FROM books');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('错误详情:', error.message, error.stack);
    return NextResponse.json(
      { message: '数据库连接失败', error: error.message },
      { status: 500 }
    );
  }
}
