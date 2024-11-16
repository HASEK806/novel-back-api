import { connectToDatabase } from '@/lib/mysql';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM books');
    await connection.end();

    return NextResponse.json(rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
};
