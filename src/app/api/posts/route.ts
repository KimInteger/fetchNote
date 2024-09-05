import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { title, content } = await request.json();

  // Authorization 헤더에서 JWT 토큰을 가져옵니다.
  const authorizationHeader = request.headers.get('Authorization');
  if (!authorizationHeader) {
    return NextResponse.json(
      { error: 'Unauthorized: No token provided' },
      { status: 401 },
    );
  }

  const token = authorizationHeader.split(' ')[1]; // 'Bearer <token>' 형식이므로 'Bearer '를 제거
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid token format' },
      { status: 401 },
    );
  }

  try {
    // 토큰을 검증하고 payload에서 user_id를 추출
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_jwt_secret',
    ) as jwt.JwtPayload;
    const userId = decoded.id;

    // posts 테이블에 새로운 글을 삽입
    const result = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, userId],
    );

    return NextResponse.json({
      message: 'Post created successfully',
      post: result.rows[0],
    });
  } catch (err) {
    console.error('Error during post creation:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
