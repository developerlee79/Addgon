"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Q4newPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("q4", option)

    setTimeout(() => {
      router.push('/q5fav');
    }, 100);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="w-full text-center mb-16">
          <h1 className="text-black text-4xl font-bold mb-4">새로운 음악을<br />찾을 때 나는?</h1>
          <p className="text-gray-500 text-xl">나는 음악을 이렇게 찾는다!</p>
        </div>

        <div className="w-full space-y-4">
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '가사' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('1')}
          >
            <span className="mr-3">🚀 </span>완전 새로운 장르도 탐험하고 싶어!
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '분위기' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('2')}
          >
            <span className="mr-3">🔎</span>비슷한 장르를 깊게 파고 싶어!
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '악기연주' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('3')}
          >
            <span className="mr-3">🎧</span>반반! 익숙한 것도, 새로운 것도 좋아
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '보컬' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('4')}
          >
            <span className="mr-3">🎲</span>몰라! 그냥 추천받는 게 좋아
          </button>
        </div>
      </div>
    </div>
  );
};

export default Q4newPage;