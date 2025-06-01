"use client";

import React from 'react';
import {useRouter} from 'next/navigation';
import Image from "next/image";

const StartPage: React.FC = () => {
    const router = useRouter();

    const handleStart = () => {
        localStorage.clear()
        router.push('/name');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white py-6 px-4">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">

          <div className="w-full mb-8 mt-4">
            <Image
              src="images/start_main.png"
              alt="음악 추천 테스트 메인 이미지"
              width={800}
              height={960}
              priority
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZmZmYiPjwvcmVjdD48L3N2Zz4="
              className="w-full h-auto"
              style={{
                maxWidth: '90%',
                height: 'auto',
                objectFit: 'contain',
                margin: '0 auto'
              }}
              unoptimized={true}
            />
          </div>

          <div className="text-center mb-16">
            <p className="text-black text-xl">AI가 당신을 위한</p>
            <p className="text-black text-xl">맞춤형 음악 추천을 제공합니다.</p>
          </div>

            <div className="mb-12">
                <button
                    onClick={handleStart}
                    className="bg-black text-white text-xl font-bold py-4 px-12 rounded-full w-64"
                >
                    시작하기
                </button>
            </div>
        </div>
    </div>
)};

export default StartPage;
