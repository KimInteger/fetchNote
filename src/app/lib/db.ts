import { Pool } from 'pg';

// PostgreSQL 연결 설정
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // SSL 인증서 검증 비활성화
  },
});

export default pool;
