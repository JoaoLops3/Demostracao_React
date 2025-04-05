import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contador de Cliques</h2>
      
      <div className="text-6xl font-bold text-blue-600 mb-8">
        {count}
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => setCount(count + 1)}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Clique Aqui!
        </button>
        
        <button
          onClick={() => setCount(0)}
          className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reiniciar
        </button>
      </div>
    </div>
  );
}