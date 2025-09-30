import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Maneger from './components/maneger'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>

    
      <Maneger/>
    
    

      <Footer/>

    </>
  )
}

export default App
