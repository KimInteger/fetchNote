'use client';

import { useState } from 'react';

const WriteFieldSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // JWT 토큰을 localStorage에서 가져옵니다.
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    console.log('Post saved:', data);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block w-full">
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block w-full">
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none" // 'resize-none'로 크기 고정
          ></textarea>
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteFieldSection;
