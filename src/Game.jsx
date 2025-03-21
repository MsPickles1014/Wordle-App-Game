import React, { useState, useEffect } from "react";
import { WORD_LIST } from "./fiveLetterWordList";
import { Wordle, GREEN, YELLOW, BLACK } from "./index";

const getRandomWord = () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const Game = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [wordle, setWordle] = useState(new Wordle(targetWord));
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setWordle(new Wordle(targetWord));
  }, [targetWord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 5) {
      setMessage("Must be a 5-letter word");
      return;
    }
    if (!WORD_LIST.includes(input.toLowerCase())) {
      setMessage("Invalid word");
      return;
    }

    const result = wordle.checkWord(input.toLowerCase());
    setGuesses([...guesses, { word: input, result }]);
    setInput("");
    setMessage("");

    if (result.every((r) => r === GREEN)) {
      setMessage("🎉 You won! Refresh to play again.");
    }
  };

  const getColor = (status) => {
    if (status === GREEN) return "bg-green-500";
    if (status === YELLOW) return "bg-yellow-400";
    return "bg-gray-300";
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Wordle Game</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5}
          className="p-2 border text-xl"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white">
          Guess
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
      <div className="space-y-2 mt-4">
        {guesses.map((guess, idx) => (
          <div key={idx} className="flex space-x-2">
            {guess.word.split("").map((letter, i) => (
              <div
                key={i}
                className={`w-10 h-10 flex items-center justify-center text-white text-xl font-bold ${getColor(guess.result[i])}`}
              >
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
