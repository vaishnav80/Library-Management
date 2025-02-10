import React, { useEffect, useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    image: null
  });

  const auth = useSelector((state) => state.auth);

  // Fetch Books from API when the component loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/account/mybook/', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        console.log(response.data.data);
        
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [auth.token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBook(prev => ({ ...prev, image: file }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('genre', newBook.genre);
    formData.append('year', newBook.year);
    if (newBook.image) {
      formData.append('image', newBook.image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/account/book/', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setBooks(prev => [...prev, response.data]);
      setNewBook({ title: '', author: '', genre: '', year: '', image: null });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/account/book/`,{id}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Books</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Add New Book
            </button>
          </div>

          {showAddForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
              <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Genre</label>
                  <input
                    type="text"
                    value={newBook.genre}
                    onChange={(e) => setNewBook(prev => ({ ...prev, genre: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="number"
                    value={newBook.year}
                    onChange={(e) => setNewBook(prev => ({ ...prev, year: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Book Cover</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">id</th>
                  <th className="px-6 py-4 whitespace-nowrap">Title</th>
                  <th className="px-6 py-4 whitespace-nowrap">Author</th>
                  <th className="px-6 py-4 whitespace-nowrap">Genre</th>
                  <th className="px-6 py-4 whitespace-nowrap">Delete</th>
                </tr>
                {books.map(book => (
                
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{book.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDeleteBook(book.id)} className="text-red-600 hover:text-red-900 ml-4">
                        <Trash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </>
  );
};

export default MyBooksPage;
