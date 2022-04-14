import placeholder from "../assets/placeholder.jpg"

const SneakerResults = ({ sneaker }) => {
  return (
    <div className="singleResult">
      <img src={sneaker?.media.smallImageUrl || placeholder} alt="img" />
      <h2>{sneaker?.title}</h2>
      <h4>{sneaker?.gender}</h4>
      <h5>{sneaker?.colorway}</h5>
    </div>
  )
}
export default SneakerResults
