import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mysql';

// GET 方法：获取小说列表
export async function GET() {
  try {
    const connection = await connectToDatabase(); // 连接数据库
    const [rows] = await connection.query('SELECT * FROM books'); // 查询小说数据
    await connection.end(); // 关闭数据库连接

    // 返回查询结果，状态码 200 表示成功
    return NextResponse.json({
      status: 'success',  // 请求成功状态
      code: 200,          // HTTP 状态码
      message: '获取成功', // 请求成功的消息
      data: rows          // 返回的小说数据
    }, { status: 200 });
  } catch (error) {
    console.error('获取小说列表时发生错误:', error);
    // 出现错误时返回 500 状态码并显示错误信息
    return NextResponse.json({
      status: 'error',    // 错误状态
      code: 500,          // HTTP 状态码
      message: '服务器内部错误', // 错误信息
      data: []            // 错误时返回空数据
    }, { status: 500 });
  }
}

// POST 方法：创建小说
export async function POST(req: Request) {
  try {
    const body = await req.json();  // 获取请求体中的数据
    const { cover, title, author, description } = body;  // 解构小说数据

    const connection = await connectToDatabase(); // 连接数据库
    const [result] = await connection.query(
      'INSERT INTO books (cover, title, author, description) VALUES (?, ?, ?, ?)',
      [cover, title, author, description] // 插入数据到数据库
    );
    await connection.end(); // 关闭数据库连接

    // 返回创建成功的消息，状态码 201 表示已创建
    return NextResponse.json({
      status: 'success',
      code: 201,
      message: '创建成功',
      result // 返回插入的结果
    }, { status: 201 });
  } catch (error) {
    console.error('创建小说时发生错误:', error);
    // 出现错误时返回 500 状态码并显示错误信息
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: '服务器内部错误',
      data: []  // 错误时返回空数据
    }, { status: 500 });
  }
}

// PUT 方法：更新小说
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url); // 获取请求 URL
    const id = url.searchParams.get('id'); // 获取查询参数中的 id
    const body = await req.json(); // 获取请求体中的数据
    const { cover, title, author, description } = body; // 解构小说数据

    // 如果没有提供 ID，返回 400 错误
    if (!id) {
      return NextResponse.json({
        status: 'error',
        code: 400,
        message: '必须提供小说 ID',
      }, { status: 400 });
    }

    const connection = await connectToDatabase(); // 连接数据库
    const [result] = await connection.query(
      'UPDATE books SET cover = ?, title = ?, author = ?, description = ? WHERE id = ?',
      [cover, title, author, description, id] // 更新数据
    );
    await connection.end(); // 关闭数据库连接

    // 返回更新成功的消息，状态码 200 表示请求成功
    return NextResponse.json({
      status: 'success',
      code: 200,
      message: '更新成功',
      result // 返回更新的结果
    }, { status: 200 });
  } catch (error) {
    console.error('更新小说时发生错误:', error);
    // 出现错误时返回 500 状态码并显示错误信息
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: '服务器内部错误',
      data: []  // 错误时返回空数据
    }, { status: 500 });
  }
}

// DELETE 方法：删除小说
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url); // 获取请求 URL
    const id = url.searchParams.get('id'); // 获取查询参数中的 id

    // 如果没有提供 ID，返回 400 错误
    if (!id) {
      return NextResponse.json({
        status: 'error',
        code: 400,
        message: '必须提供小说 ID',
      }, { status: 400 });
    }

    const connection = await connectToDatabase(); // 连接数据库
    const [result] = await connection.query('DELETE FROM books WHERE id = ?', [id]); // 删除数据
    await connection.end(); // 关闭数据库连接

    // 返回删除成功的消息，状态码 200 表示请求成功
    return NextResponse.json({
      status: 'success',
      code: 200,
      message: '删除成功',
      result // 返回删除的结果
    }, { status: 200 });
  } catch (error) {
    console.error('删除小说时发生错误:', error);
    // 出现错误时返回 500 状态码并显示错误信息
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: '服务器内部错误',
      data: []  // 错误时返回空数据
    }, { status: 500 });
  }
}
