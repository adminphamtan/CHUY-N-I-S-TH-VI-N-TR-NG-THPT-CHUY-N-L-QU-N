
import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
      <div className="relative">
        <img src={book.coverImageUrl} alt={`Bìa sách ${book.title}`} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate text-slate-800" title={book.title}>{book.title}</h3>
        <p className="text-sm text-slate-600 italic mt-1">{book.author}</p>
        <p className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 inline-block mt-2">{book.genre}</p>
        <p className="text-sm text-slate-700 mt-3 h-20 overflow-hidden text-ellipsis">
          {book.summary}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
