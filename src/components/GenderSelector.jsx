import axios from "axios"
import { useState } from "react"

const GenderSelector = ({ setGender }) => {
  const [genders, setGenders] = useState(null)

  const fetchBrands = async () => {
    if (!genders) {
      try {
        const response = await axios({
          method: "GET",
          url: "https://v1-sneakers.p.rapidapi.com/v1/genders",
          headers: {
            "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          },
        })
        if (response.data) {
          setGenders(response.data)

          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    fetchBrands()
  }

  return (
    <select
      name="gender"
      className="genderSelector"
      onClick={handleClick}
      onChange={(e) => setGender(e.target.value)}
      placeholder="Genders..."
    >
      <option value="">NO GENDER</option>
      {genders ? (
        genders.results?.map((gender, idx) => (
          <option value={gender} key={idx} brand={gender}>
            {gender}
          </option>
        ))
      ) : (
        <option>Genders...</option>
      )}
    </select>
  )
}
export default GenderSelector
