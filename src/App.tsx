import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ListChecks, MousePointerClick, GamepadIcon, Calculator, MapPin } from 'lucide-react';
import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import CalculatorComponent from './components/Calculator';
import ZipCodeFinder from './components/ZipCodeFinder';

const features = [
  { name: 'Lista de Tarefas', icon: ListChecks, path: '/' },
  { name: 'Contador de Cliques', icon: MousePointerClick, path: '/contador' },
  { name: 'Jogo da Velha', icon: GamepadIcon, path: '/jogo' },
  { name: 'Calculadora', icon: Calculator, path: '/calculadora' },
  { name: 'Busca CEP', icon: MapPin, path: '/cep' },
];

function Navigation() {
  const location = useLocation();
  
  return (
    <nav>
      <ul className="flex flex-wrap justify-center gap-6 md:gap-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = location.pathname === feature.path;
          return (
            <li key={feature.name}>
              <Link
                to={feature.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-blue-600'}`} />
                <span className="font-medium">{feature.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Demonstração de Recursos React
            </h1>
            <Navigation />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/contador" element={<ClickCounter />} />
            <Route path="/jogo" element={<TicTacToe />} />
            <Route path="/calculadora" element={<CalculatorComponent />} />
            <Route path="/cep" element={<ZipCodeFinder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;