import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Erro');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const Button = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick: () => void; className?: string }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Calculadora</h2>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-gray-500 text-sm h-6">{equation}</div>
        <div className="text-3xl font-bold text-right">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClear} className="bg-red-500 text-white hover:bg-red-600 col-span-2">
          AC
        </Button>
        <Button onClick={() => handleOperator('/')} className="bg-gray-200 hover:bg-gray-300">
          ÷
        </Button>
        <Button onClick={() => handleOperator('*')} className="bg-gray-200 hover:bg-gray-300">
          ×
        </Button>

        {[7, 8, 9].map(num => (
          <Button key={num} onClick={() => handleNumber(String(num))} className="bg-white hover:bg-gray-100">
            {num}
          </Button>
        ))}
        <Button onClick={() => handleOperator('-')} className="bg-gray-200 hover:bg-gray-300">
          -
        </Button>

        {[4, 5, 6].map(num => (
          <Button key={num} onClick={() => handleNumber(String(num))} className="bg-white hover:bg-gray-100">
            {num}
          </Button>
        ))}
        <Button onClick={() => handleOperator('+')} className="bg-gray-200 hover:bg-gray-300">
          +
        </Button>

        {[1, 2, 3].map(num => (
          <Button key={num} onClick={() => handleNumber(String(num))} className="bg-white hover:bg-gray-100">
            {num}
          </Button>
        ))}
        <Button onClick={handleEqual} className="bg-blue-500 text-white hover:bg-blue-600 row-span-2">
          =
        </Button>

        <Button onClick={() => handleNumber('0')} className="bg-white hover:bg-gray-100 col-span-2">
          0
        </Button>
        <Button onClick={() => handleNumber('.')} className="bg-white hover:bg-gray-100">
          .
        </Button>
      </div>
    </div>
  );
}