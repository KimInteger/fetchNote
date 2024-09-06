import React, { useState, useEffect } from 'react';
import { winConditions } from './lib/winConditions';

const TicTacToeField: React.FC = () => {
  const [gameState, setGameState] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('O');
  const [clickCount, setClickCount] = useState<number>(0);
  const [clickOrder, setClickOrder] = useState<{ [key: number]: number }>({});
  const [winner, setWinner] = useState<string | null>(null);

  // 타일 클릭 핸들러
  function handleClick(index: number): void {
    if (gameState[index] || winner) return; // 이미 클릭된 타일이거나 승자가 있으면 무시

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    // 현재 타일이 몇 번째로 클릭되었는지 기록
    setClickOrder((prev) => ({
      ...prev,
      [index]: clickCount,
    }));

    // 클릭 수 업데이트 및 플레이어 전환
    setClickCount((prevCount) => prevCount + 1);
    setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
  }

  // 승리 조건을 체크하는 함수
  function checkWinner(gameState: string[]): void {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setWinner(gameState[a]);
        return;
      }
    }
  }

  // 7번째 이후 클릭된 타일을 초기화하는 함수
  function checkAndClearTiles(): void {
    setGameState((prevGameState) => {
      const newGameState = [...prevGameState];

      // 각 타일의 클릭 순서와 현재 클릭 카운트를 비교해 7번 이후의 타일 초기화
      for (let index in clickOrder) {
        const tileClickCount = clickOrder[+index];
        if (clickCount - tileClickCount >= 7) {
          newGameState[+index] = ''; // 7번째 이후의 클릭된 타일 초기화
        }
      }

      return newGameState;
    });
  }

  // 클릭 수에 따라 타일 초기화
  useEffect(() => {
    checkAndClearTiles();
  }, [clickCount]);

  // 게임 상태 변경 후 승리 조건 체크
  useEffect(() => {
    // 빈 타일이 3개 이상일 때만 승리 조건 체크
    const emptyTiles = gameState.filter((tile) => tile === '').length;
    if (emptyTiles >= 3) {
      checkWinner(gameState);
    }
  }, [gameState]);

  // 게임 리셋 함수
  function resetGame(): void {
    setGameState(Array(9).fill(''));
    setClickOrder({});
    setClickCount(0);
    setWinner(null);
    setCurrentPlayer('O');
  }

  return (
    <div className="flex flex-col items-center">
      <h2>{winner ? `${winner}의 승리입니다!` : `${currentPlayer}의 차례`}</h2>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 mt-5 bg-gray-800 p-1.5 rounded-lg">
        {gameState.map((value, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-white flex justify-center items-center text-2xl font-bold border border-black cursor-pointer hover:bg-gray-200"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {winner && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 shadow-lg text-center rounded-lg">
          <h2>{`${winner}의 승리입니다!`}</h2>
          <button
            onClick={resetGame}
            className="px-5 py-2 mt-2 text-lg cursor-pointer"
          >
            다시하기
          </button>
        </div>
      )}
    </div>
  );
};

export default TicTacToeField;
