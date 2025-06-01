"use client";

import React, {useRef, useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const ResultPage: React.FC = () => {
    const router = useRouter();
    const resultCardRef = useRef<HTMLDivElement | null>(null);
    const [logoLoaded, setLogoLoaded] = useState<boolean>(false);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [cardBgColor, setCardBgColor] = useState<string>("#C7CEEA");
    const [resultData, setResultData] = useState({
        name: "",
        recommends: [
            { bandName: "", songName: "" },
            { bandName: "", songName: "" },
            { bandName: "", songName: "" }
        ],
        userAnalysis: '',
        recommendReason: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [, setFontsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.fonts.ready.then(() => {
                console.log('All fonts are loaded');
                setFontsLoaded(true);
            });
        }

        const formatCurrentDateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        setCurrentDateTime(formatCurrentDateTime());

        if (typeof window !== 'undefined') {
            const testImagePaths = ['/images/flagon.png', '/flagon.png'];
            let loadedAny = false;

            testImagePaths.forEach(path => {
                const img = new window.Image();

                img.onload = () => {
                    if (!loadedAny) {
                        loadedAny = true;
                        setLogoLoaded(true);
                    }
                };

                img.src = path;
            });

            const instaIcon = new window.Image();
            instaIcon.src = '/images/instagram_icon.png';
        }

        if (typeof window !== 'undefined') {
            const pastelColors = [
                "#FFD1DC",
                "#B5EAD7",
                "#C7CEEA",
                "#F7E1D7",
                "#DDDDFF",
                "#E2F0CB",
                "#FFDAC1",
                "#AEC6CF",
                "#B5B9FF",
                "#C8E6C9",
                "#F8BBD0",
                "#D7CCC8",
                "#FFF9C4"
            ];

            const savedIndex = localStorage.getItem('colorIndex');
            let colorIndex;

            if (savedIndex && !isNaN(parseInt(savedIndex))) {
                colorIndex = parseInt(savedIndex);
            } else {
                colorIndex = Math.floor(Math.random() * pastelColors.length);
                localStorage.setItem('colorIndex', colorIndex.toString());
            }

            setCardBgColor(pastelColors[colorIndex]);
        }

        const fetchResults = async () => {
            try {
                if (typeof window === 'undefined') {
                    setIsLoading(false);
                    return;
                }

                const requestBody = JSON.stringify({
                    one: localStorage.getItem('q1'),
                    two: localStorage.getItem('q2'),
                    three: localStorage.getItem('q3'),
                    four: localStorage.getItem('q4'),
                    five: localStorage.getItem('q5')
                });

                const response = await fetch('http://localhost:8080/recommend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: requestBody
                });
                const data = await response.json();
                setResultData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error :', error);
                setIsLoading(false);
            }
        };

        fetchResults();

        return () => {
            if (typeof window !== 'undefined') {
                const savingIndicator = document.getElementById('saving-indicator');
                const styleEl = document.getElementById('spin-style');

                if (savingIndicator && savingIndicator.parentNode) {
                    savingIndicator.parentNode.removeChild(savingIndicator);
                }

                if (styleEl && styleEl.parentNode) {
                    styleEl.parentNode.removeChild(styleEl);
                }
            }
        };
    }, []);

    const nickname = (typeof window !== "undefined" ? localStorage.getItem("nickname") : null);

    const saveImage = async () => {
        if (!resultCardRef.current || typeof window === 'undefined') return;
        if (isSaving) return;

        setIsSaving(true);

        try {
            const savingIndicator = document.createElement('div');
            savingIndicator.id = 'saving-indicator';
            savingIndicator.style.position = 'fixed';
            savingIndicator.style.top = '0';
            savingIndicator.style.left = '0';
            savingIndicator.style.width = '100%';
            savingIndicator.style.height = '100%';
            savingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            savingIndicator.style.display = 'flex';
            savingIndicator.style.flexDirection = 'column';
            savingIndicator.style.alignItems = 'center';
            savingIndicator.style.justifyContent = 'center';
            savingIndicator.style.zIndex = '9999';

            const spinner = document.createElement('div');
            spinner.style.width = '48px';
            spinner.style.height = '48px';
            spinner.style.border = '4px solid #fff';
            spinner.style.borderTopColor = 'transparent';
            spinner.style.borderRadius = '50%';
            spinner.style.animation = 'spin 1s linear infinite';

            const styleElement = document.createElement('style');
            styleElement.id = 'spin-style';
            styleElement.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';

            const text = document.createElement('div');
            text.style.color = '#fff';
            text.style.marginTop = '16px';
            text.style.fontWeight = 'bold';
            text.textContent = '이미지 저장 중...';

            savingIndicator.appendChild(spinner);
            savingIndicator.appendChild(text);

            const existingIndicator = document.getElementById('saving-indicator');
            const existingStyle = document.getElementById('spin-style');

            if (existingIndicator && existingIndicator.parentNode) {
                existingIndicator.parentNode.removeChild(existingIndicator);
            }

            if (existingStyle && existingStyle.parentNode) {
                existingStyle.parentNode.removeChild(existingStyle);
            }

            document.body.appendChild(styleElement);
            document.body.appendChild(savingIndicator);

            await new Promise(resolve => setTimeout(resolve, 1500));

            const tempCard = document.createElement('div');
            tempCard.style.backgroundColor = cardBgColor;
            tempCard.style.width = '390px';
            tempCard.style.padding = '40px 16px';
            tempCard.style.boxSizing = 'border-box';
            tempCard.style.color = 'black';
            tempCard.style.textAlign = 'center';
            tempCard.style.display = 'flex';
            tempCard.style.flexDirection = 'column';
            tempCard.style.alignItems = 'center';
            tempCard.style.position = 'fixed';
            tempCard.style.left = '-9999px';
            tempCard.style.top = '0';

            const title = document.createElement('div');
            title.style.fontFamily = 'VT323, monospace';
            title.style.fontSize = '40px';
            title.style.fontWeight = 'bold';
            title.style.marginBottom = '16px';
            title.style.width = '100%';
            title.textContent = nickname || '';
            tempCard.appendChild(title);

            const tasteHeader = document.createElement('div');
            tasteHeader.style.fontFamily = 'VT323, monospace';
            tasteHeader.style.fontSize = '24px';
            tasteHeader.style.marginBottom = '16px';
            tasteHeader.style.width = '100%';
            tasteHeader.textContent = `*** ${nickname}'s music taste ***`;
            tempCard.appendChild(tasteHeader);

            const analysis = document.createElement('div');
            analysis.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            analysis.style.fontSize = '16px';
            analysis.style.fontWeight = '600';
            analysis.style.marginBottom = '24px';
            analysis.style.paddingLeft = '8px';
            analysis.style.paddingRight = '8px';
            analysis.style.width = '100%';
            analysis.textContent = resultData.userAnalysis;
            tempCard.appendChild(analysis);

            const suggestionHeader = document.createElement('div');
            suggestionHeader.style.fontFamily = 'VT323, monospace';
            suggestionHeader.style.fontSize = '24px';
            suggestionHeader.style.marginBottom = '16px';
            suggestionHeader.style.width = '100%';
            suggestionHeader.textContent = `*** suggestion for ${nickname} ***`;
            tempCard.appendChild(suggestionHeader);

            const recommendList = document.createElement('ol');
            recommendList.style.fontFamily = 'VT323, monospace';
            recommendList.style.fontSize = '20px';
            recommendList.style.textAlign = 'left';
            recommendList.style.paddingLeft = '40px';
            recommendList.style.marginBottom = '16px';
            recommendList.style.width = 'calc(100% - 48px)';

            resultData.recommends.forEach((rec) => {
                const item = document.createElement('li');
                item.style.marginBottom = '8px';
                item.style.wordBreak = 'break-word';
                item.textContent = `${rec.bandName} - ${rec.songName}`;
                recommendList.appendChild(item);
            });

            tempCard.appendChild(recommendList);

            const recommendReason = document.createElement('div');
            recommendReason.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            recommendReason.style.fontSize = '16px';
            recommendReason.style.fontWeight = '600';
            recommendReason.style.marginTop = '16px';
            recommendReason.style.marginBottom = '24px';
            recommendReason.style.width = '100%';
            recommendReason.style.paddingLeft = '8px';
            recommendReason.style.paddingRight = '8px';
            recommendReason.textContent = resultData.recommendReason;
            tempCard.appendChild(recommendReason);

            const divider = document.createElement('div');
            divider.style.fontFamily = 'VT323, monospace';
            divider.style.fontSize = '20px';
            divider.style.marginBottom = '8px';
            divider.style.width = '100%';
            divider.textContent = '***************************';
            tempCard.appendChild(divider);

            const dateDiv = document.createElement('div');
            dateDiv.style.fontFamily = 'VT323, monospace';
            dateDiv.style.fontSize = '20px';
            dateDiv.style.marginBottom = '4px';
            dateDiv.style.width = '100%';
            dateDiv.textContent = `Date: ${currentDateTime}`;
            tempCard.appendChild(dateDiv);

            const instaDiv = document.createElement('div');
            instaDiv.style.fontFamily = 'VT323, monospace';
            instaDiv.style.fontSize = '20px';
            instaDiv.style.marginBottom = '24px';
            instaDiv.style.width = '100%';
            instaDiv.textContent = 'follow: @inha_flagon';
            tempCard.appendChild(instaDiv);

            const bottomMsg = document.createElement('div');
            bottomMsg.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            bottomMsg.style.fontSize = '16px';
            bottomMsg.style.fontWeight = '600';
            bottomMsg.style.marginBottom = '16px';
            bottomMsg.style.paddingLeft = '8px';
            bottomMsg.style.paddingRight = '8px';

            const msgLine1 = document.createElement('p');
            msgLine1.textContent = '멋진-취향을-가지고-음악을-즐기는-당신에게';
            bottomMsg.appendChild(msgLine1);

            const msgLine2 = document.createElement('p');
            msgLine2.textContent = '플라곤을-추천드립니다!';
            bottomMsg.appendChild(msgLine2);

            tempCard.appendChild(bottomMsg);

            const logoContainer = document.createElement('div');
            logoContainer.style.display = 'flex';
            logoContainer.style.justifyContent = 'center';
            logoContainer.style.alignItems = 'center';
            logoContainer.style.height = '48px';
            logoContainer.style.marginTop = '16px';

            const logoText = document.createElement('div');
            logoText.style.fontFamily = 'VT323, monospace';
            logoText.style.fontSize = '32px';
            logoText.style.fontWeight = 'bold';
            logoText.style.color = 'black';
            logoText.textContent = 'FLAGON';

            logoContainer.appendChild(logoText);
            tempCard.appendChild(logoContainer);

            document.body.appendChild(tempCard);

            try {
                const html2canvas = (await import('html2canvas')).default;

                const canvas = await html2canvas(tempCard, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: cardBgColor,
                    logging: false
                });

                const imageData = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.href = imageData;
                link.download = `${nickname || resultData.name || 'flagon'}_음악추천_${new Date().getTime()}.png`;
                document.body.appendChild(link);
                link.click();

                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }

                alert('이미지가 저장되었습니다!');
            } catch (error) {
                console.error('Error :', error);
                alert('이미지 저장 실패');
            } finally {
                if (tempCard.parentNode) {
                    tempCard.parentNode.removeChild(tempCard);
                }
            }
        } catch (error) {
            console.error('Error :', error);
            alert('이미지 저장 중 오류 발생');
        } finally {
            const loadingIndicator = document.getElementById('saving-indicator');
            const styleEl = document.getElementById('spin-style');

            if (loadingIndicator && loadingIndicator.parentNode) {
                loadingIndicator.parentNode.removeChild(loadingIndicator);
            }

            if (styleEl && styleEl.parentNode) {
                styleEl.parentNode.removeChild(styleEl);
            }

            setIsSaving(false);
        }
    };

    const openFlagonInstagram = () => {
        if (typeof window !== "undefined") {
            window.open('https://www.instagram.com/inha_flagon', '_blank');
        }
    };

    const restart = () => {
        router.push('/start');
    };

    const vtFontStyle = {
        fontFamily: 'VT323, monospace',
        fontSize: 'clamp(1.2rem, 4vw, 1.6rem)'
    };

    const vtFontLargeStyle = {
        fontFamily: 'VT323, monospace',
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)'
    };

    const vtFontMediumStyle = {
        fontFamily: 'VT323, monospace',
        fontSize: 'clamp(1.3rem, 5vw, 1.75rem)'
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white">
            <div className="w-full flex justify-between px-4 py-2 text-sm text-black font-mono">
                <div>INHA UNIV. ROCK & METAL</div>
                <div>FLAGON</div>
            </div>

            {isLoading && (
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-black font-medium text-lg">음악 취향 분석 중...</p>
                </div>
            )}

            <div className={`w-full max-w-md mx-auto px-2 pb-4 ${isLoading ? 'hidden' : 'block'}`}>
                <div
                    ref={resultCardRef}
                    data-result-card="true"
                    className="w-full flex flex-col items-center text-black text-center"
                    style={{
                        backgroundColor: cardBgColor,
                        padding: '40px 16px',
                        boxSizing: 'border-box',
                        maxWidth: '100%'
                    }}
                >
                    <div
                        className="font-bold mb-3 text-center w-full"
                        style={vtFontLargeStyle}
                    >
                        {nickname}
                    </div>

                    <div
                        className="mb-3 text-center w-full"
                        style={vtFontMediumStyle}
                    >
                        *** {nickname}&apos;s music taste ***
                    </div>

                    <div className="mb-5 text-center font-pretendard text-base font-semibold px-1 w-full">
                        {resultData.userAnalysis}
                    </div>

                    <div className="w-full mb-6 text-center">
                        <div
                            className="mb-3 text-center w-full"
                            style={vtFontMediumStyle}
                        >
                            *** suggestion for {nickname} ***
                        </div>

                        <ol
                            className="list-decimal pl-8 space-y-2 inline-block text-left"
                            style={vtFontStyle}
                        >
                            {resultData.recommends.map((rec, index) => (
                                <li key={index} className="break-words">
                                    <span className="inline-block">{rec.bandName} - {rec.songName}</span>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-4 text-center font-pretendard text-base font-semibold px-1">
                            {resultData.recommendReason}
                        </div>
                    </div>

                    <div
                        className="w-full text-center mb-3"
                        style={vtFontStyle}
                    >
                        ***************************
                    </div>

                    <div
                        className="w-full mb-1 text-center"
                        style={vtFontStyle}
                    >
                        Date: {currentDateTime || '생성 시간'}
                    </div>
                    <div
                        className="w-full mb-6 text-center"
                        style={vtFontStyle}
                    >
                        follow: @inha_flagon
                    </div>

                    <div className="text-center mb-4 font-pretendard text-base font-semibold px-1">
                        <p>멋진-취향을-가지고-음악을-즐기는-당신에게</p>
                        <p>플라곤을-추천드립니다!</p>
                    </div>

                    <div className="mt-4 mb-6 py-2">
                        <div className="logo-container flex justify-center items-center" style={{ height: '48px' }}>
                            {logoLoaded ? (
                                <Image
                                    src="/images/flagon.png"
                                    alt="Flagon Logo"
                                    width="120"
                                    height="48"
                                    style={{
                                        filter: 'brightness(0)',
                                        objectFit: 'contain',
                                        maxWidth: '100%'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    fontFamily: 'VT323, monospace',
                                    fontSize: '2.2rem',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    textTransform: 'uppercase'
                                }}>
                                    FLAGON
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-full max-w-md mx-auto px-4 grid grid-cols-3 gap-2 mb-4 ${isLoading ? 'hidden' : 'block'}`}>
                <button
                    onClick={saveImage}
                    disabled={isSaving}
                    className={`col-span-1 bg-black py-3 rounded-lg text-white font-semibold text-sm ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    결과 이미지로<br />저장하기
                </button>
                <button
                    onClick={openFlagonInstagram}
                    className="col-span-1 bg-black py-3 px-2 rounded-lg text-white font-semibold flex items-center justify-center"
                >
                    <div style={{ width: '36px', height: '36px', position: 'relative' }}>
                        <Image
                            src="/images/Instagram_icon.png"
                            alt="Instagram Icon"
                            width="36"
                            height="36"
                            style={{ objectFit: 'contain' }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML = "<span>플라곤</span>";
                                }
                            }}
                        />
                    </div>
                </button>
                <button
                    onClick={restart}
                    className="col-span-1 bg-black py-3 rounded-lg text-white font-semibold text-sm"
                >
                    테스트<br />다시하기
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
