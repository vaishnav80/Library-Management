import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';

function Favourites() {
    const auth = useSelector((select)=>select.auth)
    const [favouriteBooks,setFavourite] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
              const response = await axios.get('http://127.0.0.1:8000/account/favourite', {
                headers: { Authorization: `Bearer ${auth.token}` }
              }); 
              console.log(response);
              setFavourite(response.data.data)
              
        }
        fetchData()
    },[])
    const removeFav = async(id)=>{

      const response = await axios.put('http://127.0.0.1:8000/account/favourite/',{id}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      }); 
    }
  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">❤️ Your Favourite Books</h2>

      {favouriteBooks.length === 0 ? (
          <div className="text-center">
          <p className="text-gray-600">You have no favourite books yet.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Browse Books
          </Link>
        </div>
      ) : (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {favouriteBooks.map((book) => (
              <div key={book.id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={`http://127.0.0.1:8000${book.book.image}`} alt={book.title} className="w-full h-60 object-cover rounded-lg"/>
              <h3 className="text-lg font-semibold mt-3">{book.book.title}</h3>
              <p className="text-gray-500 text-sm">by {book.book.author}</p>
              <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600" onClick={()=>removeFav(book.id)}>
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
      <Footer/>
      </>
  );
}


export default  Favourites;