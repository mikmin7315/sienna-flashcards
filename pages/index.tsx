
import Head from 'next/head';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <Head>
        <title>Sienna's Flashcards</title>
      </Head>
      <h1>🐰 Welcome to Sienna's Flashcards!</h1>
      <p>This app will help you learn English words with fun quizzes and flashcards.</p>
      <p>More features are coming soon!</p>
    </div>
  );
}
