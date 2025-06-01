"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Q3playlistPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("q3", option)

    setTimeout(() => {
      router.push('/q4new');
    }, 100);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="w-full text-center mb-16">
          <h1 className="text-black text-4xl font-bold mb-4">나의 플레이리스트<br />정리 스타일은?</h1>
          <p className="text-gray-500 text-xl">음악을 저장하고 관리하는 나의 방식</p>
        </div>

        <div className="w-full space-y-4">
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '가사' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('1')}
          >
            <span className="mr-3">🗂</span> 꼼꼼하게 분리 - 통학용, chill용 ...
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '분위기' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('2')}
          >
            <span className="mr-3">🔀</span> 하나에 때려 넣고 랜덤 재생
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '악기연주' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('3')}
          >
            <span className="mr-3">✍️</span> 제목 지을 때 고심하는 편
          </button>
          
          <button 
            className={`w-full py-4 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-black text-left text-xl font-medium flex items-center ${selectedOption === '보컬' ? 'bg-gray-300' : ''}`}
            onClick={() => handleOptionSelect('4')}
          >
            <span className="mr-3">🤷</span> 플리? 귀찮아서 안 만듦
          </button>
        </div>
      </div>
    </div>
  );
};

export default Q3playlistPage;