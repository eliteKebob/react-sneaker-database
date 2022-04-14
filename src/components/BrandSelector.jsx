import axios from "axios"
import { useState } from "react"

const BrandSelector = ({ setBrand }) => {
  const [brands, setBrands] = useState(null)

  const fetchBrands = async () => {
    if (!brands) {
      try {
        const response = await axios({
          method: "GET",
          url: "https://v1-sneakers.p.rapidapi.com/v1/brands",
          headers: {
            "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          },
        })
        if (response.data) {
          setBrands(response.data)

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
      name="brand"
      className="brandSelector"
      onClick={handleClick}
      onChange={(e) => setBrand(e.target.value)}
      placeholder="Brands..."
    >
      <option value="">NO BRAND</option>
      {brands ? (
        brands.results?.map((brand, idx) => (
          <option value={brand} key={idx} brand={brand} placeholder="Brands...">
            {brand}
          </option>
        ))
      ) : (
        <option>Brands...</option>
      )}
    </select>
  )
}
export default BrandSelector
