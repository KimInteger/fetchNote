'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from '../loginForm';

const HeaderSection: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleCloseModal = () => {
    setIsLogin(false);
  };

  const handleLogout = () => {
    // JWT 토큰 삭제
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <header className="h-[100px] flex items-center justify-between px-4 bg-gray-100 border-b border-gray-300">
        <div className="flex-1 text-center text-2xl font-bold">패치노트</div>
        <div className="flex items-center">
          {!isAuthenticated ? (
            <>
              <a
                href="/register"
                className="ml-2 text-black underline hover:text-gray-800"
              >
                회원가입
              </a>
              <button
                className="px-4 py-2 ml-2 bg-gray-100 text-black border border-black rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleLogin}
              >
                로그인
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 ml-2 bg-red-500 text-white border border-black rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          )}
        </div>
      </header>

      {isLogin && !isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSection;
