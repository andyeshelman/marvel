import { useState } from "react"
import axios from "axios"

import './App.css'
import Characters from './components/Characters'
import Details from './components/Details'

const link = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    ts: 1,
    apikey: "c967831313f109c38f7e85740c49a348",
    hash: "b02221b049bddd517a76fb42d50ef32b",
    limit: 100
  }
})

function App() {
  const [character, setCharacter] = useState(null)
  return (
    <div id="app">
      <Characters link={link} setCharacter={setCharacter}/>
      <Details link={link} character={character}/>
    </div>
  )
}

export default App
