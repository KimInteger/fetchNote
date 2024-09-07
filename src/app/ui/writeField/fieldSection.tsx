'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const WriteFieldSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated } = useAuth();

  interface CustomJwtPayload {
    admin?: boolean;
  }

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);
          setIsAdmin(decoded.admin || false);
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    console.log('Post saved:', data);
  };

  if (!isAuthenticated || !isAdmin) {
    return <p>글 작성 권한이 없습니다.</p>;
  }

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
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none"
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
