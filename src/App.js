import { useState } from "react"
import axios from "axios"
import Header from "./components/Header"
import BrandSelector from "./components/BrandSelector"
import GenderSelector from "./components/GenderSelector"
import SneakerResults from "./components/SneakerResults"
import Loading from "./components/Loading"
import Footer from "./components/Footer"

function App() {
  const [brand, setBrand] = useState("")
  const [gender, setGender] = useState("")
  const [name, setName] = useState("")
  const [releaseYear, setReleaseYear] = useState("")
  const [page, setPage] = useState("")
  const [totalPage, setTotalPage] = useState([])
  const [sneakers, setSneakers] = useState(null)
  const [loading, setLoading] = useState(false)

  const formData = { brand, gender, name, releaseYear, page }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      getSneakers()
    } catch (error) {
      console.log(error)
    }
  }

  const getSneakers = async () => {
    setLoading(true)
    let newFormData = Object.keys(formData)
      .filter((k) => formData[k] !== "")
      .reduce((a, k) => ({ ...a, [k]: formData[k] }), {})

    try {
      const response = await axios({
        method: "GET",
        url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
        params: {
          limit: "16",
          ...newFormData,
        },
        headers: {
          "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
          "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
        },
      })
      if (response.data) {
        setSneakers(response.data)
        setLoading(false)
        console.log(response.data)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const totalPageNumber = () => {
    if (sneakers?.results) {
      let newTotal = []
      for (let i = 0; i < Math.ceil(parseInt(sneakers?.count) / 16); i++)
        newTotal.push(i)
      setTotalPage(newTotal)
      console.log(totalPage)
    }
    return
  }

  const handleClear = (e) => {
    e.preventDefault()
    setBrand("")
    setGender("")
    setName("")
    setReleaseYear("")
    setPage("")
    setSneakers(null)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="form-wrapper"></div>
        <Loading />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="homepage">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <BrandSelector setBrand={setBrand} setLoading={setLoading} />
              <GenderSelector setGender={setGender} setLoading={setLoading} />
              <input
                type="number"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                placeholder="Release Year..."
              />
            </div>
            <div className="input-group-text">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name..."
              />
              <button type="submit">Search</button>
              <button onClick={handleClear}>Clear All</button>
            </div>
          </form>
        </div>
        <div className="pagination">
          {sneakers?.count ? (
            <>
              <form onSubmit={handleSubmit}>
                <select
                  onClick={() => totalPageNumber()}
                  placeholder="1"
                  onChange={(e) => setPage(e.target.value)}
                >
                  {totalPage?.length > 1
                    ? totalPage?.map((num) => (
                        <option key={num} num={num} value={num}>
                          {num + 1}
                        </option>
                      ))
                    : ""}
                </select>
                {page !== "0" ? (
                  <button type="submit">
                    Visit Page {parseInt(page) + 1 || ""}
                  </button>
                ) : (
                  ""
                )}
              </form>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="results">
          {sneakers?.results ? (
            sneakers?.results.map((sneaker, idx) => (
              <SneakerResults sneaker={sneaker} key={idx} />
            ))
          ) : (
            <>
              <h1>Your search results will be here</h1>
              <a href="https://github.com/eliteKebob">My GitHub Profile</a>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
