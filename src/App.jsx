import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Signup />}></Route>
     <Route path='/Signin' element={<Signin />}></Route>
    </Routes>
    </BrowserRouter>
  )
}