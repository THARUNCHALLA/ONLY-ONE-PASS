import './index.css'

const LanguageFilterItem = props => {
  const {user, clickLanguage} = props
  const {language, id} = user
  onclick = () => {
    clickLanguage(id, language)
  }
  return (
    <li className="list" onClick={onclick}>
      <button type="button" className="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
