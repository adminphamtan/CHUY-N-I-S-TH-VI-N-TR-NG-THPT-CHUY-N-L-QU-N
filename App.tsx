
import React, { useState } from 'react';
import type { Book } from './types';
import Header from './components/Header';
import BookCard from './components/BookCard';
import AddBookModal from './components/AddBookModal';
import { PlusIcon } from './components/icons';

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Số Đỏ',
    author: 'Vũ Trọng Phụng',
    genre: 'Tiểu thuyết trào phúng',
    summary: 'Số Đỏ là một tiểu thuyết trào phúng của Vũ Trọng Phụng, kể về cuộc đời của Xuân Tóc Đỏ, một kẻ ma cà bông, từ chỗ bị xã hội coi khinh đã nhảy lên tầng lớp danh giá của xã hội nhờ trào lưu Âu hóa.',
    coverImageUrl: 'https://picsum.photos/id/10/400/600',
  },
  {
    id: '2',
    title: 'Dế Mèn Phiêu Lưu Ký',
    author: 'Tô Hoài',
    genre: 'Truyện thiếu nhi',
    summary: 'Tác phẩm kể về cuộc phiêu lưu của chú Dế Mèn qua thế giới muôn màu muôn vẻ của các loài vật nhỏ bé, qua đó thể hiện những bài học sâu sắc về tình bạn, lòng dũng cảm và sự khiêm tốn.',
    coverImageUrl: 'https://picsum.photos/id/24/400/600',
  },
  {
    id: '3',
    title: 'Lão Hạc',
    author: 'Nam Cao',
    genre: 'Truyện ngắn',
    summary: 'Truyện ngắn Lão Hạc của nhà văn Nam Cao là một trong những tác phẩm tiêu biểu viết về người nông dân trong xã hội cũ, thể hiện bi kịch của họ qua nhân vật Lão Hạc và con chó Vàng.',
    coverImageUrl: 'https://picsum.photos/id/42/400/600',
  },
  {
    id: '4',
    title: 'Tắt Đèn',
    author: 'Ngô Tất Tố',
    genre: 'Tiểu thuyết hiện thực',
    summary: 'Tắt đèn là một trong những tác phẩm văn học hiện thực phê phán xuất sắc nhất của Ngô Tất Tố, mô tả cuộc sống cùng khổ của người nông dân Việt Nam trước Cách mạng tháng Tám, đặc biệt là nhân vật chị Dậu.',
    coverImageUrl: 'https://picsum.photos/id/55/400/600',
  },
];

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBook = (newBook: Omit<Book, 'id' | 'coverImageUrl'>) => {
    const bookWithId: Book = {
      ...newBook,
      id: new Date().toISOString(),
      coverImageUrl: `https://picsum.photos/seed/${Math.random()}/400/600`,
    };
    setBooks(prevBooks => [bookWithId, ...prevBooks]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">Tủ sách</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Thêm sách mới</span>
          </button>
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 bg-white rounded-lg shadow">
             <h3 className="text-2xl font-semibold text-slate-600">Thư viện trống</h3>
             <p className="text-slate-500 mt-2">Hãy nhấn "Thêm sách mới" để bắt đầu số hóa thư viện của bạn.</p>
           </div>
        )}
      </main>

      {isModalOpen && (
        <AddBookModal
          onClose={() => setIsModalOpen(false)}
          onAddBook={handleAddBook}
        />
      )}
    </div>
  );
};

export default App;
