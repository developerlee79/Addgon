"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Q5favPage: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 100;
  const router = useRouter();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setUserInput(text);
      setCharCount(text.length);
    }
  };
  
  const handleSubmit = () => {
    console.log('제출된 텍스트 :', userInput);
    localStorage.setItem("q5", userInput)

    router.push('/result');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="w-full text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-black">추천하고 싶은<br />최애 음악 3곡!</h1>
          <p className="text-gray-500 text-xl">왓 쏭 투유 리스닝 투?</p>
        </div>

        <div className="w-full">
          <textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="여기에 추천하고 싶은 노래를 적어주세요..."
            className="w-full h-64 p-5 border-b-2 border-gray-300 focus:outline-none focus:border-black resize-none text-black"
          />

          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">
              최대 {maxChars}자
            </p>
            <p className="text-gray-500">
              {charCount}자
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleSubmit}
            className="bg-black text-white font-bold py-3 px-8 rounded-full"
          >
            결과 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Q5favPage;