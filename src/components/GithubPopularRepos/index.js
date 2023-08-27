import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  loading: 'LOADING',
  success: 'successful',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {Data: [], initial: 'ALL', api: ''}

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({api: apiStatusConstant.loading})
    const {initial} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${initial}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const Data1 = data.popular_repos
      const updatedData = Data1.map(each => ({
        avatarUrl: each.avatar_url,
        name: each.name,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        id: each.id,
      }))
      this.setState({Data: updatedData, api: apiStatusConstant.success})
    } else if (response.ok === 401) {
      this.setState({api: apiStatusConstant.failure})
    }
  }

  clickLanguage = id => {
    this.setState({initial: id}, this.getBooks)
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failureView"
      />
    </div>
  )

  renderSuccess = () => {
    const {Data} = this.state
    return (
      <ul className="unordered2">
        {Data.map(eachItem => (
          <RepositoryItem Details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderview = () => {
    const {Data} = this.state
    return (
      <ul className="unordered2 ">
        {Data.map(eachItem => (
          <RepositoryItem Details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  Sachin = () => {
    const {api} = this.state
    switch (api) {
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.loading:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="FirstContainer">
        <h1 className="heading">Popular</h1>
        <ul className="unordered">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              user={each}
              key={each.id}
              clickLanguage={this.clickLanguage}
            />
          ))}
        </ul>
        {this.Sachin()}
      </div>
    )
  }
}

export default GithubPopularRepos
