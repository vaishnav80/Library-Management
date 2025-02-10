import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const [booksData,setBooks] = useState([])
const auth = useSelector((select)=>select.auth)
  const addToFavorites = async(book_id) => {
    const response = await axios.post('http://127.0.0.1:8000/account/favourite/',{book_id}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });    
      console.log(response);
      
      if(response.response.status == 400){
        alert("Already exist")
      }
      else{

        navigate('/favourites')                                                                                                                                                                                                                                                                                                                                                                                                           
      }
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/account/book/', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        console.log(response.data.data);
        
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
     
      <Navbar/>

     
      <div className="relative bg-blue-500 text-white py-20 text-center">
        <h2 className="text-4xl font-bold">Discover Your Next Favorite Book 📖</h2>
        <p className="mt-3 text-lg">Explore a wide range of books and add them to your collection.</p>
        
      </div>

      <div className="container mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Featured Books</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {booksData.map((book) => (
            <div key={book.id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={`http://127.0.0.1:8000${book.image}`} alt={book.image} className="w-full h-60 object-cover rounded-lg"/>
              <h3 className="text-lg font-semibold mt-3">{book.title}</h3>
              <p className="text-gray-500 text-sm">by {book.author}</p>
              <p className="text-gray-700 font-bold mt-2">{book.price}</p>
              <button 
                onClick={() => addToFavorites(book.id)}
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Favourites
              </button>
            </div>
          ))}
        </div>
      </div>


      <Footer/>
    </div>
  );
}
export default Home;