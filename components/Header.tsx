
import React from 'react';
import { BookIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
        <BookIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Thư viện số THPT</h1>
      </div>
    </header>
  );
};

export default Header;
