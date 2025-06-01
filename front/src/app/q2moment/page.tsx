"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Q2momentPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("q2", option)

    setTimeout(() => {
      router.push('/q3playlist');
    }, 100);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="w-full text-center mb-16">
          <h1 className="text-black text-4xl font-bold mb-4">내가 음악을<br />듣고 싶은 순간은?</h1>
          <p className="text-gray-500 text-xl">어떤 순간에 음악을 들으시나요?</p>
        </div>

        <div className="w-full space-y-4">
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '가사' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('1')}
          >
            <span className="mr-3">📚</span> 공부하거나 집중할 때 - 집중력 UP
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '분위기' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('2')}
          >
            <span className="mr-3">🏃</span> 운동하거나 걸을 때 - 동기부여!
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '악기연주' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('3')}
          >
            <span className="mr-3">🚋</span> 이동 중에 - 통학을 버티며...
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '보컬' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('4')}
          >
            <span className="mr-3">🌙</span> 잠들기 전 - 나의 릴렉스 타임
          </button>
        </div>
      </div>
    </div>
  );
};

export default Q2momentPage;