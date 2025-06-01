"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Q1SortPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("q1", option)

    setTimeout(() => {
      router.push('/q2moment');
    }, 100);
  };

  return (
      <div className="flex flex-col items-center min-h-screen bg-white py-8 px-4">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          <div className="w-full text-center mb-16">
            <h1 className="text-black text-4xl font-bold mb-4">노래를 들을 때<br/>가장 중요한 요소는?</h1>
            <p className="text-gray-500 text-xl">음악에서 가장 집중하는 부분은?</p>
          </div>

          <div className="w-full space-y-4">
            <button
                className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '가사' ? 'bg-gray-300' : ''}`}
                onClick={() => handleOptionSelect('1')}
            >
              <span className="mr-3">📝</span> 가사 - 가사의 메시지가 중요해.
            </button>

            <button
                className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '분위기' ? 'bg-gray-300' : ''}`}
                onClick={() => handleOptionSelect('2')}
            >
              <span className="mr-3">🌌</span> 분위기 - 전체적인 무드와 감성!
            </button>

            <button
                className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '악기연주' ? 'bg-gray-300' : ''}`}
                onClick={() => handleOptionSelect('3')}
            >
              <span className="mr-3">🎸</span> 악기 연주 - 연주, 사운드의 디테일
            </button>

            <button
                className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '보컬' ? 'bg-gray-300' : ''}`}
                onClick={() => handleOptionSelect('4')}
            >
              <span className="mr-3">🎤</span> 보컬 - 목소리와 창법이 핵심!
            </button>
          </div>
        </div>
      </div>
  );
};

export default Q1SortPage;