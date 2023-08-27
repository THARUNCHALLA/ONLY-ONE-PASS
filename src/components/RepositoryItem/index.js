import './index.css'

const RepositoryItem = props => {
  const {Details} = props
  const {avatarUrl, name, forksCount, issuesCount, starsCount} = Details
  return (
    <li className="list12">
      <img src={avatarUrl} alt={name} className="image" />
      <h1 className="heading12">{name}</h1>
      <div className="starsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="heading123">{`${starsCount}`} stars </p>
      </div>
      <div className="starsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p className="heading123">{`${forksCount} forks`} </p>
      </div>
      <div className="starsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p className="heading123">{`${issuesCount} open issues`} </p>
      </div>
    </li>
  )
}

export default RepositoryItem
