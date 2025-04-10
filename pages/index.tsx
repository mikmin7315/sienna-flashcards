
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const words = [
  {
    word: 'apple',
    meaning: '사과',
    example: 'I eat an apple every day.',
    image: 'https://via.placeholder.com/80?text=apple'
  },
  {
    word: 'book',
    meaning: '책',
    example: 'She reads a book before bed.',
    image: 'https://via.placeholder.com/80?text=book'
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const word = words[index] ?? null;

  useEffect(() => {
    const stored = localStorage.getItem('completedWords');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompleted(parsed);
        }
      } catch (e) {
        console.error('Error parsing localStorage data:', e);
      }
    }
    setLoading(false);
  }, []);

  const toggleFlip = () => setFlipped(!flipped);

  const goNext = () => {
    const newIndex = (index + 1) % words.length;
    setIndex(newIndex);
    setFlipped(false);
  };

  const markCompleted = () => {
    if (!word) return;
    const newCompleted = Array.from(new Set([...completed, word.word]));
    setCompleted(newCompleted);
    localStorage.setItem('completedWords', JSON.stringify(newCompleted));
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!word) return <div>단어를 불러오는 중 문제가 발생했습니다.</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <Head>
        <title>Sienna's Flashcards</title>
      </Head>

      <h1>🐰 Welcome, Sienna!</h1>
      <p>{completed.length} / {words.length} 단어 완료 ✅</p>

      <div
        onClick={toggleFlip}
        style={{
          margin: '2rem auto',
          width: '300px',
          height: '200px',
          perspective: '1000px',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s'
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              background: '#fff8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ccc',
              borderRadius: '12px'
            }}
          >
            <h2>{word.word}</h2>
          </div>

          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              background: '#e0f7fa',
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ccc',
              borderRadius: '12px'
            }}
          >
            <p><strong>{word.meaning}</strong></p>
            <p>{word.example}</p>
            <button onClick={(e) => { e.stopPropagation(); speak(word.example); }}>🎧 영어 문장 듣기</button>
            {word.image && (
              <img src={word.image} alt={word.word} style={{ width: '80px', marginTop: '1rem' }} />
            )}
          </div>
        </div>
      </div>

      <button onClick={goNext} style={{ marginRight: '1rem' }}>➡️ 다음</button>
      <button onClick={markCompleted}>✅ 학습 완료</button>
    </div>
  );
}
