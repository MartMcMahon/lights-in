import { useRef, useState } from "react";
import Button from "./button";
import "./App.css";
import "./shake.css";

const initialGrid = new Array(5).fill(new Array(5).fill(false));

function App() {
  const [gridState, setGridState] = useState(initialGrid);
  const [movesCount, setMovesCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const beepSoundRef = useRef<HTMLAudioElement>(null);
  const winSoundRef = useRef<HTMLAudioElement>(null);

  const handleButtonPress = (x: number, y: number) => {
    const newGridState = gridState.map((row) => row.slice());
    newGridState[y][x] = !gridState[y][x];

    if (y - 1 >= 0) {
      newGridState[y - 1][x] = !gridState[y - 1][x];
    }
    if (y + 1 < 5) {
      newGridState[y + 1][x] = !gridState[y + 1][x];
    }
    if (x - 1 >= 0) {
      newGridState[y][x - 1] = !gridState[y][x - 1];
    }
    if (x + 1 < 5) {
      newGridState[y][x + 1] = !gridState[y][x + 1];
    }

    setGridState(newGridState);
    setMovesCount(movesCount + 1);

    if (beepSoundRef.current) {
      beepSoundRef.current.play();
    }

    // put this in a timeout to make sure the gridState has been updated
    setTimeout(() => {
      if (isGridSolved(newGridState)) {
        setIsWon(true);
        if (winSoundRef.current) {
          winSoundRef.current.play();
        }
      }
    });
  };

  const resetGrid = () => {
    setGridState(initialGrid);
    setMovesCount(0);
    setIsWon(false);
  };

  const randomizeGrid = () => {
    const newGridState = gridState.map((row) =>
      row.map(() => Math.random() < 0.5)
    );
    setGridState(newGridState);
    setMovesCount(0);
    setIsWon(false);
  };

  const isGridSolved = (gridState: Array<Array<boolean>>) => {
    return gridState.every((row: Array<boolean>) =>
      row.every((cell: boolean) => cell)
    );
  };

  return (
    <>
      <div className="main">
        <audio ref={beepSoundRef} src="./assets/beep.mp3" />
        <audio ref={winSoundRef} src="./assets/win.mp3" />
        <div className={`bod ${isWon ? "shake" : ""}`}>
          <h3>Welcome to</h3>
          <h1>
            Lights <i>In</i>
          </h1>
          <h4>
            as the oppositite of the well-known Lights Out game, your goal is to
            get all of the buttons lit.
          </h4>
          <div className="game-control-buttons">
            <button onClick={resetGrid}>Reset</button>
            <button onClick={randomizeGrid}>Random</button>
          </div>
          <div className="grid">
            {[0, 1, 2, 3, 4].map((y) =>
              [0, 1, 2, 3, 4].map((x) => (
                <Button
                  key={x + "," + y}
                  x={x}
                  y={y}
                  handleButtonPress={(x, y) => handleButtonPress(x, y)}
                  isActive={gridState[y][x]}
                  isWon={isWon}
                />
              ))
            )}
          </div>
          <div className="moves-counter">Moves: {movesCount}{isWon && " Great Job!"}</div>
        </div>
      </div>
    </>
  );
}

export default App;
