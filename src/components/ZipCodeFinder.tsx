import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function ZipCodeFinder() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cep.match(/^\d{8}$/)) {
      setError('CEP deve conter 8 dígitos');
      return;
    }

    setLoading(true);
    setError('');
    setAddress(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
      } else {
        setAddress(data);
      }
    } catch (err) {
      setError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const formatCEP = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 8);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Busca CEP</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(formatCEP(e.target.value))}
            placeholder="Digite o CEP..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Buscar
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </form>

      {address && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-600">CEP</label>
            <p className="text-gray-900">{address.cep}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Logradouro</label>
            <p className="text-gray-900">{address.logradouro || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Bairro</label>
            <p className="text-gray-900">{address.bairro || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Cidade</label>
            <p className="text-gray-900">{address.localidade}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Estado</label>
            <p className="text-gray-900">{address.uf}</p>
          </div>
        </div>
      )}
    </div>
  );
}