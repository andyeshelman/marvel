import { useState, useEffect } from "react"

function Details({ link, character }) {

  const [details, setDetails] = useState({})
  const [comicList, setComicList] = useState([])

  useEffect( () => {
    if (character) {
      link.get(`/characters/${character}`).then(response => 
        setDetails({
          name: response.data.data.results[0].name,
          description: response.data.data.results[0].description,
          thumb: response.data.data.results[0].thumbnail.path + "." + response.data.data.results[0].thumbnail.extension
        })
      ).catch(error =>
        console.log(error)
      )
      link.get(`/characters/${character}/comics`).then(response => 
        setComicList(response.data.data.results.map(result => (
          {
            id: result.id,
            title: result.title,
            thumb: result.thumbnail.path + "." + result.thumbnail.extension
          }
        )))
      ).catch(error =>
        console.log(error)
      )
    }
  }, [character])

  return (
    <div id="details" className="panel">
      <div id="header">
        <img src={details.thumb} alt={details.name} className="thumb"/>
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div id="comics">
        {comicList.map(comic =>
          <div key={comic.id} className="comBox" onClick={() => setCharacter(comic.id)}>
            <img src={comic.thumb} alt={comic.title} className="thumb" />
            <br/>{comic.title}
          </div>
        )}
      </div>
    </div>
  )
}

export default Details
