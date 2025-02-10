import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";

function ProfilePage() {
  const [user, setUser] = useState({
    "first_name" : "",
    "last_name" : "",
    "username" :"",
    "email": ""
  });
  const [lastName, setLastName] = useState("Doe");
  const [isEditing, setIsEditing] = useState(false);
  const auth = useSelector((select)=>select.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
   async function fetched (){
      const response = await axios.get('http://127.0.0.1:8000/account/profile', {
        headers: { Authorization: `Bearer ${auth.token}` }
      }); 
      console.log(response);
      setUser(response.data.data)
    }
    fetched()
  },[])
  const handleEdit = async()=>{
    console.log('sd',user);
    
    const response = await axios.post('http://127.0.0.1:8000/account/profile/',{user}, {
      headers: { Authorization: `Bearer ${auth.token}` }
    }); 
  }
  const handleLogout =async ()=>{
    const response = await axios.post('http://127.0.0.1:8000/account/logout/', 
      { refresh_token: auth.refreshToken },  
      {
          headers: {
              Authorization: `Bearer ${auth.token}`
          }
      }
    );
    if(response.status ==200){
      dispatch(logout())
      navigate('/login')
    }
  }
  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-4 px-6 max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Profile</h2>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Username</label>
          {isEditing ? (
              <input
              type="text"
              value={user.username}
              onChange={(e) => setUser(prev =>({ ...prev,username:e.target.value}))}
              className="w-full border rounded-md p-2"
              />
            ) : (
          <p className="text-gray-800 font-semibold">{user.username}</p>
        )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          {isEditing ? (
              <input
              type="text"
              value={user.email}
              onChange={(e) => setUser(prev =>({ ...prev,email:e.target.value}))}
              className="w-full border rounded-md p-2"
              />
            ) : (
          <p className="text-gray-800 font-semibold">{user.email}</p>
        )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">First Name</label>
          {isEditing ? (
              <input
              type="text"
              value={user.first_name}
              onChange={(e) => setUser(prev =>({ ...prev,first_name:e.target.value}))}
              className="w-full border rounded-md p-2"
              />
            ) : (
                <p className="text-gray-800 font-semibold">{user.first_name}</p>
            )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Last Name</label>
          {isEditing ? (
              <input
              type="text"
              value={user.last_name}
              onChange={(e) => setUser(prev =>({ ...prev,last_name:e.target.value}))}
              className="w-full border rounded-md p-2"
              />
            ) : (
                <p className="text-gray-800 font-semibold">{user.last_name}</p>
            )}
        </div>
        <div className="flex">

        <button
          onClick={() => {setIsEditing(!isEditing), handleEdit()}}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-3 "
          >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 mt-3 ml-3" onClick={handleLogout}>logout</button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link to="/favourites" className="block text-center bg-gray-200 py-2 rounded-lg hover:bg-gray-300">
          📚 My Favourite Books
        </Link>
        <Link to="/mybooks" className="block text-center bg-gray-200 py-2 rounded-lg hover:bg-gray-300">
          📖 My Books
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}


export default ProfilePage