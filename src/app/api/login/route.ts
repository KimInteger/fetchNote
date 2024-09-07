import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  console.log('Received login request');

  const { email, password } = await request.json();
  console.log('Request data:', { email, password });

  try {
    // 이메일로 사용자 조회
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    console.log('Database query result:', result.rows);

    const user = result.rows[0];

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // 비밀번호 비교
    const match = await bcrypt.compare(password, user.password);
    console.log('Password match result:', match);

    if (!match) {
      console.log('Password mismatch');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // JWT 토큰 생성, admin 필드 추가
    const token = jwt.sign(
      { id: user.id, email: user.email, admin: user.admin }, // admin 필드 추가
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' },
    );
    console.log('Generated token:', token);

    return NextResponse.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
