import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Router } from 'react-router'
import Routers from "./routers"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routers />
    </>
  )
}

export default App
