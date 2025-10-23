
import React, { useState, useCallback } from 'react';
import type { Book } from '../types';
import { generateBookSummary } from '../services/geminiService';
import { CloseIcon, SparklesIcon } from './icons';

interface AddBookModalProps {
  onClose: () => void;
  onAddBook: (book: Omit<Book, 'id' | 'coverImageUrl'>) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    if (!title || !author) {
      setError('Vui lòng nhập tên sách và tác giả trước khi tạo tóm tắt.');
      return;
    }
    setError(null);
    setIsGenerating(true);
    try {
      const generatedSummary = await generateBookSummary(title, author);
      setSummary(generatedSummary);
    } catch (e) {
      console.error(e);
      setError('Không thể tạo tóm tắt. Vui lòng thử lại.');
    } finally {
      setIsGenerating(false);
    }
  }, [title, author]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !genre || !summary) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
    }
    onAddBook({ title, author, genre, summary });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Thêm sách mới vào thư viện</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors">
            <CloseIcon className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Tên sách</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ví dụ: Số Đỏ"
                required
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-slate-700 mb-1">Tác giả</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ví dụ: Vũ Trọng Phụng"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-slate-700 mb-1">Thể loại</label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Tiểu thuyết trào phúng"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="summary" className="block text-sm font-medium text-slate-700">Tóm tắt</label>
              <button
                type="button"
                onClick={handleGenerateSummary}
                disabled={isGenerating || !title || !author}
                className="flex items-center gap-2 text-sm px-3 py-1.5 bg-violet-600 text-white rounded-md shadow-sm hover:bg-violet-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang tạo...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-4 h-4" />
                    <span>Tạo tóm tắt bằng AI</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              id="summary"
              rows={6}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tóm tắt hoặc tạo tự động bằng AI..."
              required
            />
          </div>
        </form>

        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md shadow-sm hover:bg-slate-50 transition-colors mr-3"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Thêm sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
