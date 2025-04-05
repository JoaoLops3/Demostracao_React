import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: Board): Player => {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => (
    <button
      className={`w-20 h-20 border-2 border-gray-300 text-4xl font-bold flex items-center justify-center
        ${board[index] === 'X' ? 'text-blue-600' : 'text-red-600'}
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Jogo da Velha</h2>

      <div className="mb-6 text-center">
        {winner ? (
          <p className="text-xl font-semibold text-green-600">
            Vencedor: {winner}
          </p>
        ) : isDraw ? (
          <p className="text-xl font-semibold text-gray-600">
            Empate!
          </p>
        ) : (
          <p className="text-xl font-semibold text-gray-600">
            Próximo jogador: {isXNext ? 'X' : 'O'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 max-w-xs mx-auto">
        {Array(9).fill(null).map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Reiniciar Jogo
      </button>
    </div>
  );
}