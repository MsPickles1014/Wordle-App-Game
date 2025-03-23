import React, { useState, useEffect } from "react";
import { WORD_LIST } from "../words";
import { Wordle, GREEN, YELLOW, BLACK } from "../index";


const getRandomWord = () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const Game = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [targetWord] = useState(getRandomWord());
  const [wordle, setWordle] = useState(new Wordle(targetWord));
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setWordle(new Wordle(targetWord));
  }, [targetWord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver) return;

    const formattedInput = input.toLowerCase();

    if (formattedInput.length !== WORD_LENGTH) {
      setMessage("❗ Must be a 5-letter word");
      return;
    }

    if (!WORD_LIST.includes(formattedInput)) {
      setMessage("❌ Invalid word");
      return;
    }

    const result = wordle.checkWord(formattedInput);
    const newGuesses = [...guesses, { word: formattedInput, result }];
    setGuesses(newGuesses);
    setInput("");

    if (result.every((r) => r === GREEN)) {
      setMessage("🎉 You won! Refresh to play again.");
      setGameOver(true);
    } else if (newGuesses.length === MAX_ATTEMPTS) {
      setMessage(`💀 Out of guesses! The word was ${targetWord.toUpperCase()}`);
      setGameOver(true);
    } else {
      setMessage("");
    }
  };

  const getColor = (status) => {
    if (status === GREEN) return "bg-green-500";
    if (status === YELLOW) return "bg-yellow-400";
    if (status === BLACK) return "bg-gray-400";
    return "bg-gray-200";
  };

  return (
<div className={`${darkMode ? "dark" : ""} min-h-screen`}>
  <div className="flex flex-col items-center justify-start bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-10 px-4 transition-all duration-500">
  <button
  onClick={() => setDarkMode(!darkMode)}
  className="absolute top-4 right-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 dark:text-gray-100 dark:text-gray-100 rounded"
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>



      <h1>
      <div className="font-extrabold mb-6 tracking-wide flex text-4xl sm:text-8xl font-sans">
      <span className="text-red-500">W</span>
      <span className="text-blue-500 text-">o</span>
      <span className="text-green-500 text-">r</span>
        <span className="text-yellow-500">d</span>
        <span className="text-purple-500">l</span>
        <span className="text-pink-500">e</span>
        </div>
      </h1>
      <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/40 border border-white/20rounded-2xl shadow-xl p-6 w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 mb-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5}
          disabled={gameOver}
          placeholder="enter 5 letter word"
          className="text-2xl px-4 py-2 rounded border border-gray-300 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xl"
        />
        <button
          type="submit"
          disabled={gameOver}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-5 py-2 rounded shadow disabled:opacity-50 transition"
        >
          Guess
        </button>
      </form>

      {message && (
        <div className="text-center mb-4">
          <p className="text-lg text-red-600 font-medium">{message}</p>
          {gameOver && (
            <button
              className="mt-3 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
              onClick={() => window.location.reload()}
            >
              🔄 Play Again
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="space-y-2 mt-4">
        {[...Array(MAX_ATTEMPTS)].map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const letters = guess ? guess.word.split("") : [];
         
          return (
            <div key={rowIndex} className="flex space-x-2 justify-center">
              {[...Array(WORD_LENGTH)].map((_, i) => {
                const letter = letters[i]?.toUpperCase() || "";
                const status = guess?.result[i];

                return (
                  <div
                    key={i}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    className={`w-14 h-14 flex items-center justify-center text-white text-2xl font-bold rounded shadow transition-all duration-200 
                      ${getColor(status)} ${
                        rowIndex === guesses.length - 1 && guess ? "animate-flip" : ""
                      }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Game;
