import { useState } from 'react'
import RegistrationForm from './pages/RegistrationForm.jsx'
import './App.css'
import LoginForm from './pages/LoginForm.jsx'
import { BrowserRouter as Router, Route, Routes, Link,useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProfilePage from './pages/Profile.jsx';
import Favourites from './pages/Favourites.jsx';
import MyBooksPage from './pages/MyBooks.jsx';
import { useSelector } from 'react-redux';



function App() {
  const auth = useSelector((select)=>select.auth)
  const navigate = useNavigate()
  const Authenticated = ({element})=>{
      if(auth.token){
        console.log(auth.token);
        
        return element;
      }
      else{
        return <Navigate to="/login" />;
      }
  }

  const UnAuth = ({element})=>{
    if(!auth.token){
      return element;
    }
    else{
      return <Navigate to="/" />;
    }
  }
  return (
    <>
      <Routes>
      <Route path="/register" element={<UnAuth element={<RegistrationForm/>}/>}/>
      <Route path="/login" element={<UnAuth element={<LoginForm/>}/>}/>
      <Route path="/" element={<Authenticated element={<Home/>}/>}/>
      <Route path="/profile" element={<Authenticated element={<ProfilePage/>}/>}/>
      <Route path="/favourites" element={<Authenticated element={<Favourites/>}/>}/>
      <Route path="/mybooks" element={<Authenticated element={<MyBooksPage/>}/>}/>
      </Routes> 
    </>
  )
}

export default App
