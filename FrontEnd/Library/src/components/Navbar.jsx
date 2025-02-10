import React from 'react'

function Navbar() {
  return (
    <div><nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
    <h1 className="text-xl font-bold text-gray-800">📚 BookStore</h1>
    <ul className="flex gap-6">
      <li><a href="/" className="text-gray-600 hover:text-blue-500">Home</a></li>
      <li><a href="/profile" className="text-gray-600 hover:text-blue-500">Profile</a></li>
      <li><a href="/favourites" className="text-gray-600 hover:text-blue-500">Favourites </a></li>
    </ul>
  </nav></div>
  )
}

export default Navbar