import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password, admin } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password, admin) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, admin],
    );

    return NextResponse.json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
