import { useState, useEffect } from "react"

const ALPHA = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function Characters({ setCharacter, link }) {
  const [characterList, setCharacterList] = useState([])
  const [currentLetter, setCurrentLetter] = useState("#")

  useEffect( () => {

    link.get("/characters", {params: {offset: characterList.length}}).then(response => 
      setCharacterList(characterList.concat(response.data.data.results.map(result => (
        {
          id: result.id,
          name: result.name,
          thumb: result.thumbnail.path + "." + result.thumbnail.extension
        }
      ))))
    ).catch(error =>
      console.log(error)
    )

    
  }, [characterList])

  return (
    <div className="panel">
      <div id="letters">
        {[...ALPHA].map((letter, i) =>
          <div key={letter} className="letter" id={`letter${i}`} onClick={() => setCurrentLetter(letter)}>{letter}</div>
        )}
      </div>
      <div id="characters">
        {characterList.filter(char => 
          currentLetter == "#" ?
          /^\d/.test(char.name) :
          char.name[0].toUpperCase() == currentLetter
        ).map(char =>
          <div key={char.id} className="charBox" onClick={() => setCharacter(char.id)}>
            <img src={char.thumb} alt={char.name} className="thumb" />
            <br/>{char.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Characters
