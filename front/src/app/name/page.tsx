"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NamePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleNextPage = () => {
    localStorage.setItem("nickname", nickname)

    if (nickname.trim()) {
      router.push('/q1sort');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white py-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">

        <div className="w-full text-center mt-16">
          <h1 className="text-black text-4xl font-bold mb-4">당신의 이름 혹은 닉네임은?</h1>
          <p className="text-gray-500 mb-16">결과지에 표시됩니다</p>
          
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className="w-full border-b-2 text-black border-gray-300 placeholder-gray-400 py-2 px-4 text-xl focus:outline-none focus:border-black"
          />
        </div>

        <button
            onClick={handleNextPage}
            className="bg-black text-white text-xl font-bold py-4 px-12 rounded-full w-64 mt-12"
        >
          다음으로
        </button>

        <div className="mt-auto mb-16">
          <p className="text-gray-500 text-lg">영문 1~5글자</p>
          <div className="w-64 h-1 bg-gray-300 mt-2">
            <div className="w-1/5 h-1 bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamePage;