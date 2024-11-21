import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mysql';

// GET 方法：获取小说列表
export async function GET() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM books');
    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST 方法：创建小说
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cover, title, author, description } = body;

    const connection = await connectToDatabase();
    const [result] = await connection.query(
      'INSERT INTO books (cover, title, author, description) VALUES (?, ?, ?, ?)',
      [cover, title, author, description]
    );
    await connection.end();

    return NextResponse.json({ message: 'Created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT 方法：更新小说
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const body = await req.json();
    const { cover, title, author, description } = body;

    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    const connection = await connectToDatabase();
    const [result] = await connection.query(
      'UPDATE books SET cover = ?, title = ?, author = ?, description = ? WHERE id = ?',
      [cover, title, author, description, id]
    );
    await connection.end();

    return NextResponse.json({ message: 'Updated successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE 方法：删除小说
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    const connection = await connectToDatabase();
    const [result] = await connection.query('DELETE FROM books WHERE id = ?', [id]);
    await connection.end();

    return NextResponse.json({ message: 'Deleted successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
