import React from 'react'
import { Routes,Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import About from './Components/About'
import Cart from './Components/Cart'
import Login from './Components/Login'
import Page from './Components/Page'

const App = () => {
  return (
    <div>
    <Navbar />

    <Toaster position='top-right' autoClose={1000} />

    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/about" element = {<About/>}/>
      <Route path="/cart" element = {<Cart/>}/>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/products/:id" element = {<Page />} />
    </Routes>
    </div>
  )
}

export default App