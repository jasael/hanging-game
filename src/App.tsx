import { useEffect, useState } from "react";
import "./App.css";
import { HanginImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getWord } from "./helpers/getWord";

function App() {
  const [word, setWord] = useState(getWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);

  const checkLetter = (letter: string) => {
    if (lose || win) return;

    if (!word.includes(letter.toLowerCase())) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArr = hiddenWord.split(" ");
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter.toLowerCase()) {
        hiddenWordArr[i] = letter.toLowerCase();
      }
    }
    setHiddenWord(hiddenWordArr.join(" "));
  };

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWin(true);
    }
  }, [hiddenWord, word]);

  useEffect(() => {
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts]);

  return (
    <div className="App">
      {/* Imagenes */}
      <HanginImage imageNumber={attempts} />

      {/* Palabra Oculta */}
      <h3>{hiddenWord}</h3>

      {/* Intentos */}
      <h3>Attempts: {attempts}</h3>

      {/* Reset */}
      {win ||
        (lose && (
          <button onClick={() => {
            setAttempts(0);
            setLose(false);
            setWin(false);

            const word = getWord();
            setWord(word);
            setHiddenWord("_ ".repeat(word.length));
          }}>Reset</button>
        ))}

      {/* Mensaje si perdió */}
      {lose && (
        <>
          <h3 style={{ color: "red" }}>You lose!</h3>
          <h3>The word was: {word}</h3>
        </>
      )}

      {/* Mensaje si ganó */}
      {win && (
        <>
          <h3 style={{ color: "green" }}>You won</h3>
        </>
      )}

      {/* Botones */}
      <div className="buttons">
        {letters.map((letter) => (
          <button onClick={() => checkLetter(letter)} key={letter}>
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
